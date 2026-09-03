import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MeetingRoomBookingsController } from "./meeting-room-bookings.controller";
import { MeetingRoomBookingsService } from "./meeting-room-bookings.service";
import { MeetingRoomBookingsEntity } from "./entities/meeting-room-bookings.entity";
import { MeetingRoomBookingsRepository } from "./repository/meeting-room-bookings.repository";

@Module({
  imports: [TypeOrmModule.forFeature([MeetingRoomBookingsEntity])],
  controllers: [MeetingRoomBookingsController],
  providers: [MeetingRoomBookingsService, MeetingRoomBookingsRepository],
  exports: [MeetingRoomBookingsService]
})
export class MeetingRoomBookingsModule {}

