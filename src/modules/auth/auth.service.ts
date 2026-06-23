import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserRepository } from "../user/repository/user.repository";
import { EmailService } from "../email/email.service";
import { CreateEmailDto } from "../email/dto/create-email.dto";
import { WinstonLogger } from "../../common/logger/logger.service";
import { RedisService } from "../../common/redis/redis.service";
import { LoginByEmailDto } from "./dto/login-by-email.dto";
import * as crypto from "crypto";

function getEmailCode(code: string) {
  return `
        <div style="max-width:480px;margin:40px auto;background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,.08);overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
          <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:32px 24px;text-align:center">
            <h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:1px">邮箱验证码</h1>
          </div>
          <div style="padding:32px 24px;text-align:center">
            <p style="margin:0 0 8px;color:#666;font-size:14px">您正在请求邮箱验证，验证码如下：</p>
            <div style="margin:24px 0;letter-spacing:10px;font-size:36px;font-weight:700;color:#333;background:#f5f7ff;border-radius:8px;padding:16px 0;text-align:center">${code}</div>
            <p style="margin:0;color:#999;font-size:12px">验证码 5 分钟内有效，请勿泄露给他人</p>
          </div>
          <div style="border-top:1px solid #eee;padding:16px 24px;text-align:center">
            <p style="margin:0;color:#bbb;font-size:12px">此为系统自动发送邮件，请勿回复</p>
          </div>
        </div>`;
}

function md5(str: string) {
  const hash = crypto.createHash("md5");
  hash.update(str);
  return hash.digest("hex");
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: WinstonLogger,
    private readonly emailService: EmailService,
    private readonly redisService: RedisService
  ) {};

  async register (dto: RegisterDto) {
    const user = await this.userRepository.findByUsername(dto.userName);
    if (user) {
      this.logger.error(`用户 ${JSON.stringify(user)} 已注册`, "AuthService");
      throw new Error("该用户名已注册");
    }
    const password = md5(dto.password);
    const newUser = await this.userRepository.create({
      userName: dto.userName,
      password
    });
    await this.userRepository.save(newUser);
    this.logger.log(`新用户 ${newUser.email} 注册成功`, "AuthService");
    return newUser;
  };

  async login(dto: LoginDto) {
    const user = await this.userRepository.findByUsernameWithPassword(dto.userName);
    if (!user) {
      this.logger.error(`用户 ${dto.userName} 不存在`, "AuthService");
      throw new UnauthorizedException("用户不存在");
    }
    if (md5(dto.password) !== user.password) {
      this.logger.error(`用户 ${dto.userName} 登录失败`, "AuthService");
      throw new UnauthorizedException("密码错误");
    }
    return user;
  }
  async loginByEmail(dto: LoginByEmailDto) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (user) {
      const code = await this.redisService.get(dto.email);
      if (!code) {
        this.logger.error(`用户邮箱 ${dto.email} 未发送验证码或验证码已过期`, "AuthService");
        throw new UnauthorizedException("验证码失效");
      }
      if (code === dto.code) {
        this.redisService.del(dto.email);
        this.logger.log(`用户邮箱 ${dto.email} 登录成功`, "AuthService");
        return user;
      } else {
        this.logger.error(`用户邮箱 ${dto.email} 登录失败`, "AuthService");
        throw new UnauthorizedException("验证码错误");
      }
    } else {
      this.logger.error(`用户邮箱 ${dto.email} 不存在`, "AuthService");
      throw new UnauthorizedException("邮箱不存在");
    }
  }

  async sendEmail(dto: CreateEmailDto) {
    dto.subject = "注册验证码";
    const code = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    dto.html = getEmailCode(code);
    const redisCode = await this.redisService.get(dto.to);
    if (redisCode) {
      console.log(redisCode);
      this.logger.error(`用户邮箱 ${dto.to} 已发送验证码`, "AuthService");
      throw new Error("该用户已发送验证码");
    } else {
      const user = await this.userRepository.findByEmail(dto.to);
      if (!user) {
        this.logger.error(`邮箱 ${dto.to} 不存在`, "AuthService");
        throw new Error("该邮箱不存在");
      }
      const result = await await this.emailService.send(dto);
      this.redisService.set(dto.to, code, 30);
      this.logger.log(`用户邮箱 ${dto.to} 发送验证码成功`, "AuthService");
      return result;
    }
  }
}
