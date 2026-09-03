import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class BookingMeetingRoomDto {
  userId?: string;

  @ApiProperty({ description: "会议室ID" })
  @IsNotEmpty({ message: "会议室ID不能为空" })
  meetingRoomId: string;

  @ApiProperty({ description: "开始时间", example: "YYYY-MM-DD HH:mm:ss" })
  @Type(() => Date)
  @IsDate({ message: "开始时间格式错误，格式为 YYYY-MM-DD HH:mm:ss" })
  @IsNotEmpty({ message: "开始时间不能为空" })
  startTime: Date;

  @ApiProperty({ description: "结束时间", example: "YYYY-MM-DD HH:mm:ss" })
  @Type(() => Date)
  @IsDate({ message: "结束时间格式错误，格式为 YYYY-MM-DD HH:mm:ss" })
  @IsNotEmpty({ message: "结束时间不能为空" })
  endTime: Date;
}
