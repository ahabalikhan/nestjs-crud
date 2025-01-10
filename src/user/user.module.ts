import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { QueueModule } from "src/queue/queue.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), QueueModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
