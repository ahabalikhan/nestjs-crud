import { IsInt, IsString, Max, Min } from "class-validator";
import { QueueConfig } from "./queue-config.type";
import validateConfig from "src/utils/validators/validate-config";
import { registerAs } from "@nestjs/config";


class EnvironmentVariablesValidator {
  @IsString()
  REDIS_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  REDIS_PORT: number;
}


export default registerAs<QueueConfig>('queue', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    redisHost: process.env.REDIS_HOST,
    redisPort: parseInt(process.env.REDIS_PORT),
  };
});