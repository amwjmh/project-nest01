import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { MeetingRoomEntity } from "../../meeting-room/entities/meeting-room.entity";
import { UserEntity } from "../../user/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("meeting_room_bookings")
export class MeetingRoomBookingsEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "预订ID" })
  id: string;

  @JoinColumn()
  @ManyToOne(() => MeetingRoomEntity)
  @ApiProperty({ description: "预订会议室" })
  meetingRoom: MeetingRoomEntity;

  @JoinColumn()
  @ManyToOne(() => UserEntity)
  @ApiProperty({ description: "预订用户" })
  user: UserEntity;

  @Column()
  @ApiProperty({ description: "预订开始时间", type: Date })
  startTime: Date;

  @Column()
  @ApiProperty({ description: "预订结束时间", type: Date })
  endTime: Date;

  @Column()
  @ApiProperty({ description: "预订状态", type: String })
  status: string;

  @ApiProperty({ description: "创建时间", type: Date })
  @CreateDateColumn({ type: "datetime" })
  createTime?: Date;
}
