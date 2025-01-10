import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';
import { MessageProcessor } from './message.processor';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.getOrThrow<string>('REDIS_HOST'),
          port: configService.getOrThrow<number>('REDIS_PORT'),
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [QueueService, MessageProcessor],
  exports: [QueueService]
})
export class QueueModule {

}
