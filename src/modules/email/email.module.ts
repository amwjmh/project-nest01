import { Module } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { EmailService } from "./email.service";
import { EmailController } from "./email.controller";
import { AppConfigService } from "../../shared/services/app-config.service";

@Module({
  controllers: [EmailController],
  providers: [
    EmailService,
    {
      provide: "MAIL_TRANSPORTER",
      useFactory: (config: AppConfigService) => {
        const emailConfig = config.emailConfig;
        return nodemailer.createTransport({
          host: emailConfig.host,
          port: emailConfig.port,
          secure: emailConfig.secure,
          auth: {
            user: emailConfig.auth.user,
            pass: emailConfig.auth.pass
          }
        });
      },
      inject: [AppConfigService]
    }
  ],
  exports: [EmailService]
})
export class EmailModule {}
