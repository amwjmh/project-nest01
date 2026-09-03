import { ApiProperty } from "@nestjs/swagger";
import { Transform, Expose, Exclude, TransformInstanceToPlain } from "class-transformer";
import * as dayjs from "dayjs";
import { MeetingRoomEntity } from "../../meeting-room/entities/meeting-room.entity";
import { UserEntity } from "../../user/user.entity";

export class MeetingRoomBookingVo {
  constructor(partial: Partial<MeetingRoomBookingVo>) {
    Object.assign(this, partial);
  }
  @ApiProperty({ description: "预订ID" })
  id: string;

  // @Exclude()
  meetingRoom: MeetingRoomEntity;
  // @Exclude()
  user: UserEntity;

  @ApiProperty({ description: "会议室名称" })
  @Expose()
  get meetingRoomName() {
    return this.meetingRoom?.name || "";
  }

  @ApiProperty({ description: "预订用户名称" })
  @Expose()
  get userName() {
    return this.user?.userName || "";
  }

  @ApiProperty({ description: "预订开始时间", type: Date })
  @Transform(({ value }) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"))
  startTime: Date;

  @ApiProperty({ description: "预订结束时间", type: Date })
  @Transform(({ value }) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"))
  endTime: Date;

  @ApiProperty({ description: "预订状态" })
  status: string;

  @ApiProperty({ description: "创建时间", type: Date })
  @Transform(({ value }) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"))
  createTime: Date;
}
