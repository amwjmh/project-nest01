import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiParam } from "@nestjs/swagger";
import { SeasoningService } from "./seasoning.service";
import { CreateSeasoningDto } from "./dto/create-seasoning.dto";
import { UpdateSeasoningDto } from "./dto/update-seasoning.dto";
import { ListSeasoningDto } from "./dto/list-seasoning.dto";
import { ApiResponse } from "../../common/api-response";

@ApiTags("调料管理")
@Controller("seasoning")
export class SeasoningController {
  constructor(private readonly seasoningService: SeasoningService) {}

  @Post("create")
  @ApiOperation({ summary: "创建调料" })
  @ApiBody({ type: CreateSeasoningDto })
  async create(@Body() createSeasoningDto: CreateSeasoningDto) {
    try {
      await this.seasoningService.create(createSeasoningDto);
      return ApiResponse.ok(null, "创建成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Get("findAll")
  @ApiOperation({ summary: "查询所有调料" })
  async findAll() {
    try {
      const data = await this.seasoningService.findAll();
      return ApiResponse.ok(data, "查询成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Get("findOne/:id")
  @ApiOperation({ summary: "查询单个调料" })
  @ApiParam({ name: "id", description: "调料ID" })
  async findOne(@Param("id") id: string) {
    try {
      const data = await this.seasoningService.findOne(+id);
      return ApiResponse.ok(data, "查询成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Patch("update/:id")
  @ApiOperation({ summary: "更新调料" })
  @ApiBody({ type: UpdateSeasoningDto })
  async update(@Param("id") id: string, @Body() updateSeasoningDto: UpdateSeasoningDto) {
    try {
      await this.seasoningService.update(+id, updateSeasoningDto);
      return ApiResponse.ok(null, "更新成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Delete("remove/:id")
  @ApiOperation({ summary: "删除调料" })
  @ApiParam({ name: "id", description: "调料ID" })
  async remove(@Param("id") id: string) {
    try {
      await this.seasoningService.remove(+id);
      return ApiResponse.ok(null, "删除成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Post("list")
  @ApiOperation({ summary: "分页查询调料列表" })
  @ApiBody({ type: ListSeasoningDto })
  async list(@Body() listDto: ListSeasoningDto) {
    try {
      const { list, total } = await this.seasoningService.list(listDto);
      return ApiResponse.ok(list, "查询成功", total);
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }
}
