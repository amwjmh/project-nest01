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
      useFactory: async (appConfigService: AppConfigService) => {
        const client = new MinioClient.Client(appConfigService.minioConfig);
        // 主动连接并校验，失败则抛错，阻止应用启动
        const ok = await client.bucketExists("nest");
        if (!ok) {
          throw new Error("MinIO 连接失败或桶 nest 不存在");
        }
        return client;
      },
      inject: [AppConfigService]
    }
  ]
})
export class UploadModule {}
