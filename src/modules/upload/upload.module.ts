import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import * as MinioClient from "minio";
import { AppConfigService } from "../../shared/services/app-config.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "./entities/file.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [UploadController],
  providers: [
    UploadService,
    {
      provide: "MINIO_CLIENT",
      useFactory: (appConfigService: AppConfigService) => {
        return new MinioClient.Client(appConfigService.minioConfig);
      },
      inject: [AppConfigService]
    }
  ]
})
export class UploadModule {}
