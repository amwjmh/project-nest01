import { Controller, Post, Body, Req } from "@nestjs/common";
import { MeetingRoomBookingsService } from "./meeting-room-bookings.service";
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { BookingMeetingRoomDto } from "./dto/booking.meeting-room.dto";
import { RedisService } from "../../common/redis/redis.service";
import { RequireLogin } from "../../decorators/requireLogin-decorator";
import { ApiResponse } from "../../common/api-response";
import { PageMeetingRoomBookingDto } from "./dto/page-meeting-room-booking.dto";

@Controller("api/meeting-room-bookings")
@ApiTags("会议室预订")
@RequireLogin()
export class MeetingRoomBookingsController {
  constructor(
    private readonly meetingRoomBookingsService: MeetingRoomBookingsService,
    private readonly redisService: RedisService
  ) {}

  @Post("booking")
  @ApiOperation({ summary: "会议室预订" })
  @ApiBearerAuth()
  async booking(
    @Body() bookingMeetingRoomDto: BookingMeetingRoomDto,
    @Req() req: Request & { headers: { authorization?: string } }
  ) {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const cached = await this.redisService.getObject<{ userId: string }>(`token:${token}`);
        if (cached) {
          bookingMeetingRoomDto.userId = cached.userId;
        }
      }
      await this.meetingRoomBookingsService.booking(bookingMeetingRoomDto);
      return ApiResponse.ok("预订成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Post("page")
  @ApiOperation({ summary: "会议室预订分页查询" })
  @ApiBody({ type: PageMeetingRoomBookingDto })
  @ApiBearerAuth()
  async page(@Body() pageMeetingRoomBookingDto: PageMeetingRoomBookingDto) {
    const { list, total } = await this.meetingRoomBookingsService.page(pageMeetingRoomBookingDto);
    return ApiResponse.ok({ list, total });
  }
}
