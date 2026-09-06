import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiParam } from "@nestjs/swagger";
import { SupplementaryService } from "./supplementary.service";
import { CreateSupplementaryDto } from "./dto/create-supplementary.dto";
import { UpdateSupplementaryDto } from "./dto/update-supplementary.dto";
import { ListSupplementaryDto } from "./dto/list-supplementary.dto";
import { ApiResponse } from "../../common/api-response";

@ApiTags("辅料管理")
@Controller("supplementary")
export class SupplementaryController {
  constructor(private readonly supplementaryService: SupplementaryService) {}

  @Post("create")
  @ApiOperation({ summary: "创建辅料" })
  @ApiBody({ type: CreateSupplementaryDto })
  async create(@Body() createSupplementaryDto: CreateSupplementaryDto) {
    try {
      await this.supplementaryService.create(createSupplementaryDto);
      return ApiResponse.ok(null, "创建成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Get("findAll")
  @ApiOperation({ summary: "查询所有辅料" })
  async findAll() {
    try {
      const data = await this.supplementaryService.findAll();
      return ApiResponse.ok(data, "查询成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Get("findOne/:id")
  @ApiOperation({ summary: "查询单个辅料" })
  @ApiParam({ name: "id", description: "辅料ID" })
  async findOne(@Param("id") id: string) {
    try {
      const data = await this.supplementaryService.findOne(+id);
      return ApiResponse.ok(data, "查询成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Patch("update/:id")
  @ApiOperation({ summary: "更新辅料" })
  @ApiBody({ type: UpdateSupplementaryDto })
  async update(@Param("id") id: string, @Body() updateSupplementaryDto: UpdateSupplementaryDto) {
    try {
      await this.supplementaryService.update(+id, updateSupplementaryDto);
      return ApiResponse.ok(null, "更新成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Delete("remove/:id")
  @ApiOperation({ summary: "删除辅料" })
  @ApiParam({ name: "id", description: "辅料ID" })
  async remove(@Param("id") id: string) {
    try {
      await this.supplementaryService.remove(+id);
      return ApiResponse.ok(null, "删除成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Post("list")
  @ApiOperation({ summary: "分页查询辅料列表" })
  @ApiBody({ type: ListSupplementaryDto })
  async list(@Body() listDto: ListSupplementaryDto) {
    try {
      const { list, total } = await this.supplementaryService.list(listDto);
      return ApiResponse.ok(list, "查询成功", total);
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }
}
