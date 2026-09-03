import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateMeetingRoomDto {
  @ApiProperty({ description: "会议室ID", type: String })
  @IsNotEmpty({ message: "会议室ID不能为空" })
  @IsString({ message: "会议室ID必须是字符串" })
  id: string;

  @ApiPropertyOptional({ description: "会议室名称" })
  @IsOptional()
  @IsString({ message: "会议室名称必须是字符串" })
  name: string;

  @ApiPropertyOptional({ description: "会议室容量" })
  @IsOptional()
  location: string;

  @ApiPropertyOptional({ description: "会议室容量" })
  @IsOptional()
  @IsNumber({}, { message: "会议室容量必须是数字" })
  capacity: number;

  @ApiPropertyOptional({ description: "会议室设备" })
  @IsOptional()
  @IsString({ message: "会议室设备必须是字符串" })
  equipment: string;

  @ApiPropertyOptional({ description: "会议室描述" })
  @IsOptional()
  @IsString({ message: "会议室描述必须是字符串" })
  desc: string;
}
