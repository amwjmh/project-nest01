import { Repository, DataSource } from "typeorm";
import { MeetingRoomEntity } from "../entities/meeting-room.entity";
import { CreateMeetingRoomDto } from "../dto/create-meeting-room.dto";
import { PageMeetingRoomDto } from "../dto/page-meeting-room.dto";
import { Injectable } from "@nestjs/common";
import { UpdateMeetingRoomDto } from "../dto/update-meeting-room.dto";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class MeetingRoomRepository extends Repository<MeetingRoomEntity> {
  constructor(private dataSource: DataSource) {
    super(MeetingRoomEntity, dataSource.createEntityManager());
  }
  async findByPage(pageMeetingRoomDto: PageMeetingRoomDto) {
    const where: any = {};
    if (pageMeetingRoomDto.name) {
      where.name = `%${pageMeetingRoomDto.name}%`;
    }
    if (pageMeetingRoomDto.location) {
      where.location = `%${pageMeetingRoomDto.location}%`;
    }
    const [meetingRooms, total] = await this.dataSource.manager.getRepository(MeetingRoomEntity).findAndCount({
      where,
      skip: (pageMeetingRoomDto.pageNum - 1) * pageMeetingRoomDto.pageSize,
      take: pageMeetingRoomDto.pageSize,
      order: { createTime: "DESC" }
    });
    return { list: instanceToPlain(meetingRooms), total };
  }

  async update(updateMeetingRoomDto: UpdateMeetingRoomDto) {
    return this.dataSource.manager.getRepository(MeetingRoomEntity).update(updateMeetingRoomDto.id, updateMeetingRoomDto);
  }
}
