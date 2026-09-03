import { Module } from "@nestjs/common";
import { MeetingRoomService } from "./meeting-room.service";
import { MeetingRoomController } from "./meeting-room.controller";
import { MeetingRoomRepository } from "./repository/meeting-room.repository";

@Module({
  controllers: [MeetingRoomController],
  providers: [MeetingRoomService, MeetingRoomRepository],
  exports: [MeetingRoomService, MeetingRoomRepository]
})
export class MeetingRoomModule {}
