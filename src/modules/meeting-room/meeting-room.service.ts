import { Injectable } from "@nestjs/common";
import { CreateMeetingRoomDto } from "./dto/create-meeting-room.dto";
import { UpdateMeetingRoomDto } from "./dto/update-meeting-room.dto";
import { MeetingRoomRepository } from "./repository/meeting-room.repository";
import { PageMeetingRoomDto } from "./dto/page-meeting-room.dto";

@Injectable()
export class MeetingRoomService {
  constructor(private readonly meetingRoomRepository: MeetingRoomRepository) {}
  create(createMeetingRoomDto: CreateMeetingRoomDto) {
    return this.meetingRoomRepository.create(createMeetingRoomDto);
  }

  page(pageMeetingRoomDto: PageMeetingRoomDto) {
    return this.meetingRoomRepository.findByPage(pageMeetingRoomDto);
  }

  update(updateMeetingRoomDto: UpdateMeetingRoomDto) {
    return this.meetingRoomRepository.update(updateMeetingRoomDto);
  }

  remove(id: string) {
    return this.meetingRoomRepository.delete(id);
  }
}
