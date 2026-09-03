import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";
import { AppConfigService } from "./shared/services/app-config.service";
import { SharedModule } from "./shared/shared.module";
import { DepartmentModule } from "./modules/department/department.module";
import { UploadModule } from "./modules/upload/upload.module";
import { LoggerModule } from "./common/logger/logger.module";
import { LoggingInterceptor } from "./interceptors/loging.interceptor";
import { APP_INTERCEPTOR, APP_GUARD } from "@nestjs/core";
import { RedisModule } from "./common/redis/redis.module";
import { AuthModule } from "./modules/auth/auth.module";
import { RoleModule } from "./modules/role/role.module";
import { PermissionModule } from "./modules/permission/permission.module";
import { JwtModule } from "@nestjs/jwt";
import { EmailModule } from "./modules/email/email.module";
import { TasksModule } from "./modules/tasks/tasks.module";
import { OpenaiModule } from "./modules/openai/openai.module";
import { ToolModule } from "./modules/tool/tool.module";
import { MeetingRoomModule } from "./modules/meeting-room/meeting-room.module";
import { MeetingRoomBookingsModule } from "./modules/meeting-room-bookings/meeting-room-bookings.module";
import { LoginGuard } from "./guard/login.guard";
import { RecipeModule } from "./modules/recipe/recipe.module";
import { SeasoningModule } from "./modules/seasoning/seasoning.module";
import { RecipeStepModule } from "./modules/recipe_step/recipe_step.module";
import { IngredientModule } from "./modules/ingredient/ingredient.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ".env"
    }),
    SharedModule,
    TypeOrmModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => {
        return appConfigService.typeOrmConfig;
      },
      inject: [AppConfigService]
    }),
    JwtModule.register({
      global: true,
      secret: "guang", signOptions: { expiresIn: "1d" }
    }),
    ScheduleModule.forRoot(),
    LoggerModule,
    RedisModule,
    UserModule,
    // DepartmentModule,
    // UploadModule,
    AuthModule,
    // RoleModule,
    // PermissionModule,
    EmailModule,
    // TasksModule,
    // OpenaiModule,
    // ToolModule,
    // MeetingRoomModule,
    // MeetingRoomBookingsModule,
    RecipeModule,
    IngredientModule,
    RecipeStepModule,
    SeasoningModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: LoginGuard
    }
  ]
})
export class AppModule {}
