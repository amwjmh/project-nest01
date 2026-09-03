import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiParam } from "@nestjs/swagger";
import { RecipeStepService } from "./recipe_step.service";
import { CreateRecipeStepDto } from "./dto/create-recipe_step.dto";
import { UpdateRecipeStepDto } from "./dto/update-recipe_step.dto";
import { ListRecipeStepDto } from "./dto/list-recipe_step.dto";
import { ApiResponse } from "../../common/api-response";

@ApiTags("食谱步骤管理")
@Controller("recipe-step")
export class RecipeStepController {
  constructor(private readonly recipeStepService: RecipeStepService) {}

  @Post("create")
  @ApiOperation({ summary: "创建食谱步骤" })
  @ApiBody({ type: CreateRecipeStepDto })
  async create(@Body() createRecipeStepDto: CreateRecipeStepDto) {
    try {
      await this.recipeStepService.create(createRecipeStepDto);
      return ApiResponse.ok(null, "创建成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Get("findAll")
  @ApiOperation({ summary: "查询所有步骤" })
  async findAll() {
    try {
      const data = await this.recipeStepService.findAll();
      return ApiResponse.ok(data, "查询成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Get("findOne/:id")
  @ApiOperation({ summary: "查询单个步骤" })
  @ApiParam({ name: "id", description: "步骤ID" })
  async findOne(@Param("id") id: string) {
    try {
      const data = await this.recipeStepService.findOne(+id);
      return ApiResponse.ok(data, "查询成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Get("findByRecipeId/:recipeId")
  @ApiOperation({ summary: "按食谱ID查询步骤列表" })
  @ApiParam({ name: "recipeId", description: "食谱ID" })
  async findByRecipeId(@Param("recipeId") recipeId: string) {
    try {
      const data = await this.recipeStepService.findByRecipeId(+recipeId);
      return ApiResponse.ok(data, "查询成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Patch("update/:id")
  @ApiOperation({ summary: "更新步骤" })
  @ApiBody({ type: UpdateRecipeStepDto })
  async update(@Param("id") id: string, @Body() updateRecipeStepDto: UpdateRecipeStepDto) {
    try {
      await this.recipeStepService.update(+id, updateRecipeStepDto);
      return ApiResponse.ok(null, "更新成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Delete("remove/:id")
  @ApiOperation({ summary: "删除步骤" })
  @ApiParam({ name: "id", description: "步骤ID" })
  async remove(@Param("id") id: string) {
    try {
      await this.recipeStepService.remove(+id);
      return ApiResponse.ok(null, "删除成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Post("list")
  @ApiOperation({ summary: "分页查询步骤列表" })
  @ApiBody({ type: ListRecipeStepDto })
  async list(@Body() listDto: ListRecipeStepDto) {
    try {
      const { list, total } = await this.recipeStepService.list(listDto);
      return ApiResponse.ok(list, "查询成功", total);
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }
}
