import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PageMeetingRoomBookingDto {
  @ApiProperty({ description: "会议室ID" })
  @IsNumber()
  @IsOptional()
  meetingRoomId: number;
  @IsDate({ message: "开始时间格式错误" })
  @IsNotEmpty({ message: "开始时间不能为空" })
  @IsOptional()
  startTime: Date;
  @IsDate({ message: "结束时间格式错误" })
  @IsNotEmpty({ message: "结束时间不能为空" })
  @IsOptional()
  endTime: Date;
  @ApiProperty({ description: "页码" })
  @IsNumber()
  pageNum: number;
  @ApiProperty({ description: "每页数量" })
  @IsNumber()
  pageSize: number;
}
