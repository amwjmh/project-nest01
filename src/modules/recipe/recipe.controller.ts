import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiParam } from "@nestjs/swagger";
import { RecipeService } from "./recipe.service";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { ListRecipeDto } from "./dto/list-recipe.dto";
import { ApiResponse } from "../../common/api-response";

@ApiTags("食谱管理")
@Controller("recipe")
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post("create")
  @ApiOperation({ summary: "创建食谱" })
  @ApiBody({ type: CreateRecipeDto })
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    try {
      await this.recipeService.create(createRecipeDto);
      return ApiResponse.ok(null, "创建成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Get("findAll")
  @ApiOperation({ summary: "查询所有食谱（含步骤）" })
  async findAll() {
    try {
      const data = await this.recipeService.findAll();
      return ApiResponse.ok(data, "查询成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Get("findOne/:id")
  @ApiOperation({ summary: "查询单个食谱（含步骤）" })
  @ApiParam({ name: "id", description: "食谱ID" })
  async findOne(@Param("id") id: string) {
    try {
      const data = await this.recipeService.findOne(+id);
      return ApiResponse.ok(data, "查询成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Patch("update/:id")
  @ApiOperation({ summary: "更新食谱" })
  @ApiBody({ type: UpdateRecipeDto })
  async update(@Param("id") id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    try {
      await this.recipeService.update(+id, updateRecipeDto);
      return ApiResponse.ok(null, "更新成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Delete("remove/:id")
  @ApiOperation({ summary: "删除食谱" })
  @ApiParam({ name: "id", description: "食谱ID" })
  async remove(@Param("id") id: string) {
    try {
      await this.recipeService.remove(+id);
      return ApiResponse.ok(null, "删除成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Post("list")
  @ApiOperation({ summary: "分页查询食谱列表" })
  @ApiBody({ type: ListRecipeDto })
  async list(@Body() listDto: ListRecipeDto) {
    try {
      const { list, total } = await this.recipeService.list(listDto);
      return ApiResponse.ok(list, "查询成功", total);
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }
}
