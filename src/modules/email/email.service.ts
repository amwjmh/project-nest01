import { Injectable, Inject } from "@nestjs/common";
import { Transporter } from "nodemailer";
import { CreateEmailDto } from "./dto/create-email.dto";
import { AppConfigService } from "../../shared/services/app-config.service";

@Injectable()
export class EmailService {
  constructor(
    @Inject("MAIL_TRANSPORTER") private readonly transporter: Transporter,
    private readonly appConfig: AppConfigService
  ) {}

  async send(dto: CreateEmailDto) {
    const emailConfig = this.appConfig.emailConfig;
    const result = await this.transporter.sendMail({
      from: emailConfig.auth.user,
      to: dto.to,
      subject: dto.subject,
      text: dto.text,
      html: dto.html
    });
    return result;
  }
}
