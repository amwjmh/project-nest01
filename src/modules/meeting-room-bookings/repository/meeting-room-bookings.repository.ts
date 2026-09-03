import { Repository, DataSource, MoreThan, LessThan } from "typeorm";
import { Injectable } from "@nestjs/common";
import { MeetingRoomBookingsEntity } from "../entities/meeting-room-bookings.entity";
import { PageMeetingRoomBookingDto } from "../dto/page-meeting-room-booking.dto";
import { MeetingRoomBookingVo } from "../vo/meeting-room-booking.vo";
import { plainToInstance } from "class-transformer";

@Injectable()
export class MeetingRoomBookingsRepository extends Repository<MeetingRoomBookingsEntity> {
  constructor(private dataSource: DataSource) {
    super(MeetingRoomBookingsEntity, dataSource.createEntityManager());
  };
  async findByPage(dto: PageMeetingRoomBookingDto) {
    const where: any = {};
    if (dto.meetingRoomId) {
      where.meetingRoom = { id: dto.meetingRoomId };
    }
    if (dto.startTime) {
      where.startTime = MoreThan(dto.startTime);
    }
    if (dto.endTime) {
      where.endTime = LessThan(dto.endTime);
    }
    const [list, total] = await this.dataSource.manager.getRepository(MeetingRoomBookingsEntity).findAndCount({
      where,
      relations: ["meetingRoom", "user"],
      skip: (dto.pageNum - 1) * dto.pageSize,
      take: dto.pageSize
    });
    return {
      list: plainToInstance(MeetingRoomBookingVo, list),
      total
    };
  }
}
