import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateMeetingRoomDto {
  @ApiProperty({ description: "会议室名称" })
  @IsNotEmpty({ message: "会议室名称不能为空" })
  @IsString({ message: "会议室名称必须是字符串" })
  name: string;

  @ApiProperty({ description: "会议室容量" })
  @IsNotEmpty({ message: "会议室容量不能为空" })
  location: string;

  @ApiProperty({ description: "会议室容量" })
  @IsNotEmpty({ message: "会议室容量不能为空" })
  @IsNumber({}, { message: "会议室容量必须是数字" })
  capacity: number;

  @ApiProperty({ description: "会议室设备" })
  @IsNotEmpty({ message: "会议室设备不能为空" })
  @IsString({ message: "会议室设备必须是字符串" })
  equipment: string;

  @ApiProperty({ description: "会议室描述" })
  @IsNotEmpty({ message: "会议室描述不能为空" })
  @IsString({ message: "会议室描述必须是字符串" })
  desc: string;
}
