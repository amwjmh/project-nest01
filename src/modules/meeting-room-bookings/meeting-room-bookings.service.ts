import { Injectable } from "@nestjs/common";
import { BookingMeetingRoomDto } from "./dto/booking.meeting-room.dto";
import { MeetingRoomBookingsRepository } from "./repository/meeting-room-bookings.repository";
import { LessThan, MoreThan } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PageMeetingRoomBookingDto } from "./dto/page-meeting-room-booking.dto";
import { MeetingRoomBookingVo } from "./vo/meeting-room-booking.vo";

@Injectable()
export class MeetingRoomBookingsService {
  constructor(
    private readonly meetingRoomBookingsRepository: MeetingRoomBookingsRepository
  ) {}

  async booking(dto: BookingMeetingRoomDto) {
    // 判断该会议室在请求的时间段内是否已被预订
    const conflict = await this.meetingRoomBookingsRepository.findOne({
      where: {
        meetingRoom: { id: dto.meetingRoomId },
        startTime: LessThan(dto.endTime),
        endTime: MoreThan(dto.startTime)
      }
    });

    if (conflict) {
      throw new HttpException("该时间段已被预订", HttpStatus.BAD_REQUEST);
    }

    const booking = this.meetingRoomBookingsRepository.create({
      meetingRoom: { id: dto.meetingRoomId },
      user: { id: dto.userId },
      startTime: dto.startTime,
      endTime: dto.endTime,
      status: "booked"
    });

    return this.meetingRoomBookingsRepository.save(booking);
  }
  async page(dto: PageMeetingRoomBookingDto) {
    const { list, total } = await this.meetingRoomBookingsRepository.findByPage(dto);
    return { list, total };
  }
}
