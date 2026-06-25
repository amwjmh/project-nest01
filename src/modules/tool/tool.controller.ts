import { Controller, Inject, Get, Param } from "@nestjs/common";
import { ToolService } from "./tool.service";
import { HttpService } from "@nestjs/axios";
import pinyin from "pinyin";
import { firstValueFrom } from "rxjs";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("工具")
@Controller("api/tool")
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Inject(HttpService)
  private readonly httpService: HttpService;

  @Get("weather/:city")
  @ApiOperation({ summary: "获取天气" })
  async getWeather(@Param("city") city: string) {
    const pinyinCity = pinyin(city, { style: "normal" }).join("");
    const response = await firstValueFrom(
      this.httpService.get(`https://nw3fbwudqe.re.qweatherapi.com/v7/weather/now?location=${pinyinCity}`,
        { headers: { "X-QW-Api-Key": "8f3068cb7e2244c3b128cf93ec21cf10" } }));
    return response.data;
  }
}
