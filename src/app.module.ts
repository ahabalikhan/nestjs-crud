import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database/config/database.config';
import { UserModule } from './user/user.module';
import { QueueModule } from './queue/queue.module';
import queueConfig from './queue/config/queue.config';

@Module({
  imports: [
    // Load configuration modules
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        queueConfig,
      ],
      envFilePath: ['.env'],
    }),
    // Configure TypeORM with async options
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    // Import application modules
    UserModule,
    QueueModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
