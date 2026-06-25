import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { WinstonLogger } from "../../common/logger/logger.service";

@Injectable()
export class TestTask {
  constructor(private readonly logger: WinstonLogger) {}

  @Cron(CronExpression.EVERY_MINUTE, { name: "test-task-cron" })
  handle() {
    this.logger.log("=======》每分钟执行一次", "TestTask");
  }
}
