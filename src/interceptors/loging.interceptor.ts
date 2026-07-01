import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap, catchError, throwError } from "rxjs";
import { WinstonLogger } from "../common/logger/logger.service";
import * as dayjs from "dayjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: WinstonLogger) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const start = dayjs().unix();
    const { method, path, body, query } = request;

    const safeStringify = (obj: unknown) => {
      try { return JSON.stringify(obj); } catch { return "[non-serializable]"; }
    };

    this.logger.log(
      `Incoming Request: ${method} ${path} | Body: ${safeStringify(body)} | Query: ${safeStringify(query)}`,
      "HTTP"
    );

    return next.handle().pipe(
      tap((data) => {
        const duration = dayjs().unix() - start;
        this.logger.log(`Response: ${method} ${path} ${duration}ms | Data: ${safeStringify(data)}`, "HTTP");
      }),
      catchError((err) => {
        const duration = dayjs().unix() - start;
        this.logger.error(`Error: ${method} ${path} ${duration}ms | ${err?.message}`, err?.stack, "HTTP");
        return throwError(() => err);
      })
    );
  }
}
