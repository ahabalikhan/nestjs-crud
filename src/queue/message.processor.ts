import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { AddMessageQueueDto } from './dto/add-message-queue.dto';

// Define a processor for the 'message-queue'
@Processor('message-queue')
export class MessageProcessor extends WorkerHost {

  // Process the job from the queue
  async process(job: Job<AddMessageQueueDto>) {
    const {userId, message} = job.data;

    try {
      // Log the message sent to the user
      console.log(`Message sent to user ${userId}: ${message}`);
    } catch (error) {
      // Log an error if message sending fails
      console.error(`Failed to send email`, error);
    }
  }
}
