import { Injectable } from "@nestjs/common";
import * as MinioClient from "minio";
import { Inject } from "@nestjs/common";
import * as dayjs from "dayjs";
import * as uuid from "uuid";
import { CompleteDto } from "./dto/complete.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileEntity } from "./entities/file.entity";

@Injectable()
export class UploadService {
  @Inject("MINIO_CLIENT")
  private minioClient: MinioClient.Client;

  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>
  ) {}

  async createPresignedUrl(name: string) {
    const fileName = `/nest/${dayjs().format("YYYYMMDDHHmmss")}/${uuid.v4()}/${name}`;
    const presignedUrl = await this.minioClient.presignedPutObject("nest", fileName, 180,);
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
    return this.minioClient.presignedGetObject("nest", filePath, 3600,);
  }
}
