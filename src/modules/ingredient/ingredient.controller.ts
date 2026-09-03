import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiParam } from "@nestjs/swagger";
import { IngredientService } from "./ingredient.service";
import { CreateIngredientDto } from "./dto/create-ingredient.dto";
import { UpdateIngredientDto } from "./dto/update-ingredient.dto";
import { ListIngredientDto } from "./dto/list-ingredient.dto";
import { ApiResponse } from "../../common/api-response";

@ApiTags("食材管理")
@Controller("ingredient")
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post("create")
  @ApiOperation({ summary: "创建食材" })
  @ApiBody({ type: CreateIngredientDto })
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    try {
      await this.ingredientService.create(createIngredientDto);
      return ApiResponse.ok(null, "创建成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Get("findAll")
  @ApiOperation({ summary: "查询所有食材" })
  async findAll() {
    try {
      const data = await this.ingredientService.findAll();
      return ApiResponse.ok(data, "查询成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Get("findOne/:id")
  @ApiOperation({ summary: "查询单个食材" })
  @ApiParam({ name: "id", description: "食材ID" })
  async findOne(@Param("id") id: string) {
    try {
      const data = await this.ingredientService.findOne(+id);
      return ApiResponse.ok(data, "查询成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Patch("update/:id")
  @ApiOperation({ summary: "更新食材" })
  @ApiBody({ type: UpdateIngredientDto })
  async update(@Param("id") id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    try {
      await this.ingredientService.update(+id, updateIngredientDto);
      return ApiResponse.ok(null, "更新成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Delete("remove/:id")
  @ApiOperation({ summary: "删除食材" })
  @ApiParam({ name: "id", description: "食材ID" })
  async remove(@Param("id") id: string) {
    try {
      await this.ingredientService.remove(+id);
      return ApiResponse.ok(null, "删除成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Post("list")
  @ApiOperation({ summary: "分页查询食材列表" })
  @ApiBody({ type: ListIngredientDto })
  async list(@Body() listDto: ListIngredientDto) {
    try {
      const { list, total } = await this.ingredientService.list(listDto);
      return ApiResponse.ok(list, "查询成功", total);
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }
}
