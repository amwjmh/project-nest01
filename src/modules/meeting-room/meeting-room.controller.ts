import { Controller, Post, Body, Delete, Query } from "@nestjs/common";
import { MeetingRoomService } from "./meeting-room.service";
import { PageMeetingRoomDto } from "./dto/page-meeting-room.dto";
import { CreateMeetingRoomDto } from "./dto/create-meeting-room.dto";
import { UpdateMeetingRoomDto } from "./dto/update-meeting-room.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@Controller("api/meeting-room")
@ApiTags("会议室")
export class MeetingRoomController {
  constructor(private readonly meetingRoomService: MeetingRoomService) {}

  @Post("create")
  @ApiOperation({ summary: "创建会议室" })
  create(@Body() createMeetingRoomDto: CreateMeetingRoomDto) {
    return this.meetingRoomService.create(createMeetingRoomDto);
  }

  @Post("page")
  @ApiOperation({ summary: "分页查询会议室" })
  page(@Body() pageMeetingRoomDto: PageMeetingRoomDto) {
    return this.meetingRoomService.page(pageMeetingRoomDto);
  }

  @Post("update")
  @ApiOperation({ summary: "更新会议室" })
  async update(@Body() updateMeetingRoomDto: UpdateMeetingRoomDto) {
    try {
      await this.meetingRoomService.update(updateMeetingRoomDto);
      return true;
    } catch (error) {
      return error;
    }
  }

  @Delete("delete")
  @ApiOperation({ summary: "删除会议室" })
  async delete(@Query("id") id: string) {
    try {
      await this.meetingRoomService.remove(id);
      return true;
    } catch (error) {
      return error;
    }
  }
}
