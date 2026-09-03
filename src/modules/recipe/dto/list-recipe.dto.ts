import { IsNumber, IsInt, IsOptional, IsString, IsIn } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class ListRecipeDto {
  @ApiProperty({ description: "页码", example: 1 })
  @Type(() => Number)
  @IsNumber({}, { message: "页码必须是数字" })
  pageNum: number;

  @ApiProperty({ description: "每页条数", example: 10 })
  @Type(() => Number)
  @IsNumber({}, { message: "每页条数必须是数字" })
  pageSize: number;

  @ApiPropertyOptional({ description: "菜名" })
  @IsOptional()
  @IsString({ message: "菜名必须是字符串" })
  name?: string;

  @ApiPropertyOptional({ description: "菜系/分类" })
  @IsOptional()
  @IsString({ message: "菜系必须是字符串" })
  cuisineType?: string;

  @ApiPropertyOptional({ description: "难度 1简单 2中等 3困难" })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "难度必须是整数" })
  @IsIn([1, 2, 3], { message: "难度只能是1、2、3" })
  difficulty?: number;
}
