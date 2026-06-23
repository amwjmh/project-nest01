import { IsNotEmpty, IsEmail, IsString, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEmailDto {
  @ApiProperty({ description: "收件人邮箱" })
  @IsNotEmpty({ message: "收件人不能为空" })
  @IsEmail({}, { message: "收件人邮箱格式错误" })
  to: string;

  @ApiProperty({ description: "邮件主题" })
  @IsOptional()
  @IsString({ message: "邮件主题必须是字符串" })
  subject: string;

  @ApiPropertyOptional({ description: "纯文本内容（与 html 二选一）" })
  @IsOptional()
  @IsString({ message: "文本内容必须是字符串" })
  text?: string;

  @ApiPropertyOptional({ description: "HTML 内容（与 text 二选一）" })
  @IsOptional()
  @IsString({ message: "HTML 内容必须是字符串" })
  html?: string;
}
