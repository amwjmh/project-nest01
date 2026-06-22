import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { EmailService } from "./email.service";
import { CreateEmailDto } from "./dto/create-email.dto";
import { ApiResponse } from "../../common/api-response";
import { RequireLogin } from "../../decorators/requireLogin-decorator";

@ApiTags("邮件管理")
@Controller("api/email")
@RequireLogin()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post("send")
  @ApiOperation({ summary: "发送邮件" })
  @ApiBody({ type: CreateEmailDto })
  async send(@Body() dto: CreateEmailDto) {
    try {
      await this.emailService.send(dto);
      return ApiResponse.ok(null, "发送成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }
}
