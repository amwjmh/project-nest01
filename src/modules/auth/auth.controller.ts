  import { Controller, Get, Body, Post, Req, HttpCode, Inject, UseGuards } from "@nestjs/common";
  import { AuthGuard } from "@nestjs/passport";
  import { AuthService } from "./auth.service";
  import { ApiOperation, ApiBody, ApiTags } from "@nestjs/swagger";
  import { LoginDto } from "./dto/login.dto";
  import { RegisterDto } from "./dto/register.dto";
  import { JwtService } from "@nestjs/jwt";
  import { ApiResponse } from "../../common/api-response";
  import { UserService } from "../user/user.service";
  import { UserEntity } from "../user/user.entity";
  import { EmailService } from "../email/email.service";
  import { CreateEmailDto } from "../email/dto/create-email.dto";
  import { LoginByEmailDto } from "./dto/login-by-email.dto";

  @ApiTags("认证")
  @Controller("api/auth")
  export class AutoController {
    constructor(private authService: AuthService, private jwtService: JwtService, private emailService: EmailService) {};

    @Inject(UserService)
    userService: UserService;

    @Post("login")
    @ApiOperation({ summary: "登录" })
    @ApiBody({ type: LoginDto })
    @UseGuards(AuthGuard("local"))
    async login(@Req() req: Request & { user: UserEntity }) {
      const user = req.user;
      const token = await this.jwtService.signAsync({
          userId: user.id,
          userName: user.userName
      }, { expiresIn: "1h" });
      const refresh_token = await this.jwtService.signAsync({
          userId: user.id,
          userName: user.userName
      }, { expiresIn: "30s" });
      await this.authService.cacheUserInfo(token, user, 30 * 60);
      return ApiResponse.ok({ token, refresh_token });
    }

    @Get("/github/login")
    @ApiOperation({ summary: "github登录" })
    @UseGuards(AuthGuard("github"))
    async githubLogin() {
    }

    @Get("callback")
    @UseGuards(AuthGuard("github"))
    async authCallback(@Req() req) {
      const user = req.user;
      const token = await this.jwtService.signAsync({
          userId: user.id,
          userName: user.userName
      }, { expiresIn: "30s" });
      const refresh_token = await this.jwtService.signAsync({
          userId: user.id,
          userName: user.userName
      }, { expiresIn: "1d" });
      await this.authService.cacheUserInfo(token, user, 30);
      return ApiResponse.ok({ token, refresh_token });
    }

    @Post("register")
    @ApiOperation({ summary: "注册" })
    @ApiBody({ type: RegisterDto })
    async register(@Body() dto: RegisterDto) {
      try {
        await this.authService.register(dto);
        return true;
      } catch (error) {
        return ApiResponse.fail(error.message);
      }
    }

    @Post("refresh")
    @ApiOperation({ summary: "刷新token" })
    async refresh(@Body() data: { refreshToken: string }) {
      try {
        const { refreshToken } = data;
        const payload = this.jwtService.verify(refreshToken);
        if (!payload) {
          return ApiResponse.fail("无效的刷新token");
        }
        if (!payload.userId) {
          return ApiResponse.fail("刷新token中未包含用户标识");
        }
        const user = await this.userService.findById(payload.userId);
        if (!user) {
          return ApiResponse.fail("刷新token中用户不存在");
        }
        const token = await this.jwtService.signAsync({
            userId: payload.userId,
            userName: payload.userName
        }, { expiresIn: "30s" });
        const refresh_token = await this.jwtService.signAsync({
            userId: payload.userId,
            userName: payload.userName
        }, { expiresIn: "30s" });
        await this.authService.cacheUserInfo(token, user, 30);
        return ApiResponse.ok({ token, refresh_token });
      } catch (error) {
        return ApiResponse.fail(error.message);
      }
    }

    @Post("email-code")
    @ApiOperation({ summary: "发送邮件验证码" })
    @ApiBody({ type: CreateEmailDto })
    async sendEmail(@Body() dto: CreateEmailDto) {
      try {
        const result = await this.authService.sendEmail(dto);
        return ApiResponse.ok(true);
      } catch (error) {
        return ApiResponse.fail(error.message);
      }
    }
    @Post("loginbyemail")
    @ApiOperation({ summary: "邮件登录" })
    @ApiBody({ type: LoginByEmailDto })
    async loginByEmail(@Body() dto: LoginByEmailDto) {
      try {
        const user = await this.authService.loginByEmail(dto);
        const token = await this.jwtService.signAsync({
            userId: user.id,
            userName: user.userName
        }, { expiresIn: "30s" });
        const refresh_token = await this.jwtService.signAsync({
            userId: user.id,
            userName: user.userName
        }, { expiresIn: "1d" });
        await this.authService.cacheUserInfo(token, user, 30);
        return ApiResponse.ok({ token, refresh_token });
      } catch (error) {
        return ApiResponse.fail(error.message);
      }
    }

    @Post("logout")
    @ApiOperation({ summary: "登出" })
    @UseGuards(AuthGuard("jwt"))
    async logout(@Req() req: Request & { headers: { authorization?: string } }) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        await this.authService.removeUserCache(token);
      }
      return ApiResponse.ok(null, "已登出");
    }
  }
