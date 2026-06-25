import { Controller, Post, Body, Inject } from "@nestjs/common";
import { OpenaiService } from "./openai.service";
import { ChatOpenAI } from "@langchain/openai";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";

@ApiTags("OpenAI")
@Controller("/api/openai")
export class OpenaiController {
  constructor(
    private readonly openaiService: OpenaiService,
    @Inject("OPENAI_CHAT_MODEL") private readonly chatModel: ChatOpenAI
  ) {
  }
  @Post("/chat")
  @ApiOperation({ summary: "与OpenAI模型对话" })
  @ApiBody({ schema: { properties: { message: { type: "string" } }, type: "object" } })
  async chat(@Body() body: { message: string }) {
    return await this.chatModel.invoke(body.message);
  }
}
