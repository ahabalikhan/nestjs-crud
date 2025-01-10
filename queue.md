# Queue and Messaging System Documentation

## Overview
The project implements an asynchronous messaging system using **BullMQ** and **Redis** for queue management. This setup is primarily used to send messages to users after certain actions.

---

## Architecture

### Components
- **QueueModule**: Main module configuring BullMQ.
- **QueueService**: Service for adding jobs to the queue.
- **MessageProcessor**: Worker that processes queued messages.

---

## Configuration

### Redis Settings
The queue system requires Redis. Configuration is loaded from environment variables.
```
REDIS_HOST=localhost
REDIS_PORT=6379
```
---

## Queue Setup
The queue is configured in **QueueModule** using **BullMQ**.

```javascript
BullModule.registerQueue({
  name: 'message-queue'
})
```

---

## Usage

### Adding Messages to Queue
Messages can be added to the queue using the **QueueService**:

```javascript
await queueService.addMessageJob({
  userId: 123,
  message: "Welcome to our platform!"
});
```