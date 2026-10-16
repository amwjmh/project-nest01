import { Injectable } from "@nestjs/common";
import * as MinioClient from "minio";
import { Inject } from "@nestjs/common";
import * as dayjs from "dayjs";
import * as crypto from "crypto";
import { CompleteDto } from "./dto/complete.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileEntity } from "./entities/file.entity";

@Injectable()
export class UploadService {
  @Inject("MINIO_CLIENT")
  private minioClient: MinioClient.Client;

  @Inject("MINIO_PUBLIC_CLIENT")
  private minioPublicClient: MinioClient.Client;

  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>
  ) {}

  async createPresignedUrl(name: string) {
    const fileName = `/nest/${dayjs().format("YYYYMMDDHHmmss")}/${crypto.randomUUID()}/${name}`;
    const presignedUrl = await this.minioPublicClient.presignedPutObject("nest", fileName, 180);
    return { presignedUrl, filePath: fileName };
  }

  async completeUpload(completeDto: CompleteDto) {
    try {
      await this.minioClient.statObject("nest", completeDto.filePath);
      await this.fileRepository.save(completeDto);
    } catch (error) {
      throw new Error("文件路径错误或服务异常");
    }
  }
   async getFileList() {
    return this.fileRepository.find();
  }
  async previewUrl(filePath: string) {
    return this.minioPublicClient.presignedGetObject("nest", filePath, 3600);
  }

  async uploadFile(bucketName: string, file: File) {
    // 主动连接并校验，失败则抛错，阻止应用启动
    const ok = await this.minioClient.bucketExists(bucketName);
    if (!ok) {
      await this.minioClient.makeBucket(bucketName);
    }
    const fileName = `/${dayjs().format("YYYYMMDDHHmm")}/${crypto.randomUUID()}/${file.name}`;
    // await this.minioClient.putObject(bucketName, fileName, file.arrayBuffer());
    return fileName;
  }
}
