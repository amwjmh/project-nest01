import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginByEmailDto {
  @ApiProperty({ description: "邮箱" })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty({ description: "验证码" })
  @MinLength(6, { message: "验证码长度必须为6位" })
  @MaxLength(6, { message: "验证码长度必须为6位" })
  @IsNotEmpty()
  @IsString()
  code: string;
}
