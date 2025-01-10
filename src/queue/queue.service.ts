import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { AddMessageQueueDto } from './dto/add-message-queue.dto';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('message-queue') private readonly mailQueue: Queue) {}

  async addMessageJob(emailData: AddMessageQueueDto): Promise<void> {
    await this.mailQueue.add('send-message', emailData);
  }
}
