import { Module } from "@nestjs/common";
import { OpenaiService } from "./openai.service";
import { ChatOpenAI } from "@langchain/openai";
import { OpenaiController } from "./openai.controller";

@Module({
  controllers: [OpenaiController],
  providers: [
    OpenaiService,
    {
      provide: "OPENAI_CHAT_MODEL",
      useFactory: () => {
        return new ChatOpenAI({
          modelName: "deepseek-v4-pro",
          apiKey: "sk-2f43dd613ccb4d3aa60cfbcf97902036",
          configuration: {
            baseURL: "https://api.deepseek.com"
          }
        });
      }
    }
  ],
  exports: [OpenaiService]
})
export class OpenaiModule {}
