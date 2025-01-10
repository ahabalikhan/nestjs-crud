
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { AddMessageQueueDto } from './dto/add-message-queue.dto';


@Processor('message-queue')
export class MessageProcessor extends WorkerHost {

  async process(job: Job<AddMessageQueueDto>) {
    const {userId, message} = job.data;

    try {
      console.log(`Message sent to user ${userId}: ${message}`);
    } catch (error) {
      console.error(`Failed to send email`, error);
    }
  }
}
