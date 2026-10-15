import { Controller, Get, Inject, Query, Post, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiConsumes } from "@nestjs/swagger";
import { UploadService } from "./upload.service";
import * as MinioClient from "minio";
import { CompleteDto } from "./dto/complete.dto";
import { AppConfigService } from "../../shared/services/app-config.service";

@ApiTags("文件上传")
@Controller("api/upload")
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Inject(AppConfigService)
  private appConfigService: AppConfigService;

  @Get("presignedUrl")
  @ApiOperation({ summary: "获取文件上传URL" })
  async presignedUrl(@Query("name") name: string) {
    return this.uploadService.createPresignedUrl(name);
  }

  @Post("complete")
  @ApiOperation({ summary: "保存上传文件" })
  async completeUpload(@Body() completeDto: CompleteDto) {
    return this.uploadService.completeUpload(completeDto);
  }

  @Get("list")
  @ApiOperation({ summary: "获取文件列表" })
  async getFileList() {
    return this.uploadService.getFileList();
  }

  @Get("previewUrl/:filePath")
  @ApiOperation({ summary: "获取文件预览URL" })
  async previewUrl(@Param("filePath") filePath: string) {
    return this.uploadService.previewUrl(filePath);
  }

  @Post("file")
  @ApiOperation({ summary: "上传文件" })
  @ApiConsumes("multipart/form-data")
  async uploadFile(@Body() body: { file: File }) {
    const bucketName = this.appConfigService.get("MINIO_BUCKET_NAME");
    return this.uploadService.uploadFile(bucketName, body.file);
  }
}
