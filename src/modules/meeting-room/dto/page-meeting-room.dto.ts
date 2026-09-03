import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class PageMeetingRoomDto {
  @ApiProperty({ description: "会议室名称" })
  name: string;

  @ApiProperty({ description: "会议室位置" })
  location: string;

  @ApiProperty({ description: "页码" })
  @IsNotEmpty({ message: "页码不能为空" })
  @IsNumber({}, { message: "页码必须是数字" })
  pageNum: number;

  @ApiProperty({ description: "每页数量" })
  @IsNotEmpty({ message: "每页数量不能为空" })
  @IsNumber({}, { message: "每页数量必须是数字" })
  pageSize: number;
}
