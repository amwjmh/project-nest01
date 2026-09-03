import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import * as dayjs from "dayjs";

@Entity("meeting_room")
export class MeetingRoomEntity {
  @PrimaryGeneratedColumn("uuid", { comment: "会议室id" })
  id: string;

  @Column({ comment: "会议室名称" })
  @ApiProperty({ description: "会议室名称", type: String })
  name: string;

  @Column({ comment: "会议室容量" })
  @ApiProperty({ description: "会议室容量", type: Number })
  capacity: number;

  @Column({ comment: "会议室位置" })
  @ApiProperty({ description: "会议室位置", type: String })
  location: string;

  @Column({ comment: "会议室设备" })
  @ApiProperty({ description: "会议室设备", type: String })
  equipment: string;

  @Column({ comment: "会议室描述" })
  @ApiProperty({ description: "会议室描述", type: String })
  desc: string;

  @CreateDateColumn({ comment: "创建时间" })
  @ApiProperty({ description: "创建时间", type: Date })
  @Transform(({ value }) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"))
  createTime: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  @ApiProperty({ description: "更新时间", type: Date })
  @Transform(({ value }) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"))
  updateTime: Date;
}
