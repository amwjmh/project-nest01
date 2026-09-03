import { IsNumber, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class ListRecipeStepDto {
  @ApiProperty({ description: "页码", example: 1 })
  @Type(() => Number)
  @IsNumber({}, { message: "页码必须是数字" })
  pageNum: number;

  @ApiProperty({ description: "每页条数", example: 10 })
  @Type(() => Number)
  @IsNumber({}, { message: "每页条数必须是数字" })
  pageSize: number;

  @ApiPropertyOptional({ description: "食谱ID（按食谱筛选步骤）" })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "食谱ID必须是整数" })
  recipeId?: number;

  @ApiPropertyOptional({ description: "步骤内容关键字" })
  @IsOptional()
  @IsString({ message: "关键字必须是字符串" })
  content?: string;
}
