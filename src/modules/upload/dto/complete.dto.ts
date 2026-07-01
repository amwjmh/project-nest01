import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CompleteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "文件名" })
  fileName: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "文件大小" })
  fileSize: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "文件路径" })
  filePath: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "文件类型" })
  @IsNotEmpty()
  @IsString()
  fileType: string;
}
