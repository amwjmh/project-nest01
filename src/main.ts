import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { WinstonLogger } from "./common/logger/logger.service";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { HttpExceptionFilter } from "./common/filters/http.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  const winstonLogger = app.get<WinstonLogger>(WinstonLogger);
  app.useLogger(winstonLogger);
  winstonLogger.log("Nest-admin正在端口3000上运行");

  const swaggerOptions = new DocumentBuilder().setTitle("Nest-Admin").addBearerAuth({
    type: "http",
    name: "bearer",
    description: "JWT token"
  });
  const document = SwaggerModule.createDocument(app, swaggerOptions.build());
  SwaggerModule.setup("/swagger-ui", app, document);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  await app.listen(3000);

  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept();
    // @ts-ignore
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
