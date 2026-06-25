import { Module } from "@nestjs/common";
import { ToolService } from "./tool.service";
import { ToolController } from "./tool.controller";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000
    })
  ],
  controllers: [ToolController],
  providers: [ToolService]
})
export class ToolModule {}
