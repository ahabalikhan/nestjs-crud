import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);
  
  // Use the app's container for class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  
  // Set a global prefix for all routes
  app.setGlobalPrefix(process.env.API_PREFIX ?? 'api');
  
  // Use global validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that don't have decorators
    transform: true, // Transform payloads to DTO instances
    forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
  }));
  
  // Configure Swagger for API documentation
  const options = new DocumentBuilder()
    .setTitle('NestJs CRUD API Docs (V1)')
    .setDescription('API documentation for NestJs CRUD')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // Create the Swagger document
  const document = SwaggerModule.createDocument(app, options);
  
  // Setup the Swagger module
  SwaggerModule.setup('docs', app, document);
  
  // Start the application and listen on the specified port
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
