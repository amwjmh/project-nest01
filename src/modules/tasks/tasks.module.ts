import { Module } from "@nestjs/common";
import { TestTask } from "./test.task";

@Module({
  providers: [TestTask]
})
export class TasksModule {}
