import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  IsOptional,
  MaxLength,
  Min,
  IsIn,
  IsArray,
  ValidateNested
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  RecipeIngredientItemDto,
  RecipeSeasoningItemDto,
  RecipeSupplementaryItemDto
} from "./recipe-association.dto";

export class CreateRecipeDto {
  @ApiProperty({ description: "菜名" })
  @IsNotEmpty({ message: "菜名不能为空" })
  @IsString({ message: "菜名必须是字符串" })
  @MaxLength(100, { message: "菜名长度不能超过100" })
  name: string;

  @ApiPropertyOptional({ description: "100g多少大卡", example: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "热量必须是数字" })
  @Min(0, { message: "热量不能小于0" })
  caloriesPer100g?: number;

  @ApiPropertyOptional({ description: "难度 1简单 2中等 3困难", example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "难度必须是整数" })
  @IsIn([1, 2, 3], { message: "难度只能是1、2、3" })
  difficulty?: number;

  @ApiProperty({ description: "耗时(分钟)" })
  @IsNotEmpty({ message: "耗时不能为空" })
  @Type(() => Number)
  @IsInt({ message: "耗时必须是整数" })
  @Min(1, { message: "耗时不能小于1" })
  cookingTime: number;

  @ApiPropertyOptional({ description: "菜系/分类" })
  @IsOptional()
  @IsString({ message: "菜系必须是字符串" })
  @MaxLength(50, { message: "菜系长度不能超过50" })
  cuisineType?: string;

  @ApiPropertyOptional({ description: "厨具" })
  @IsOptional()
  @IsString({ message: "厨具必须是字符串" })
  @MaxLength(100, { message: "厨具长度不能超过100" })
  kitchenware?: string;

  @ApiPropertyOptional({ description: "口味" })
  @IsOptional()
  @IsString({ message: "口味必须是字符串" })
  @MaxLength(50, { message: "口味长度不能超过50" })
  flavor?: string;

  @ApiPropertyOptional({ description: "效果图片URL" })
  @IsOptional()
  @IsString({ message: "效果图片URL必须是字符串" })
  @MaxLength(255, { message: "效果图片URL长度不能超过255" })
  effectImg?: string;

  @ApiPropertyOptional({
    description: "关联的食材列表",
    type: () => RecipeIngredientItemDto,
    isArray: true
  })
  @IsOptional()
  @IsArray({ message: "食材列表必须是数组" })
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientItemDto)
  ingredients?: RecipeIngredientItemDto[];

  @ApiPropertyOptional({
    description: "关联的调料列表",
    type: () => RecipeSeasoningItemDto,
    isArray: true
  })
  @IsOptional()
  @IsArray({ message: "调料列表必须是数组" })
  @ValidateNested({ each: true })
  @Type(() => RecipeSeasoningItemDto)
  seasonings?: RecipeSeasoningItemDto[];

  @ApiPropertyOptional({
    description: "关联的辅料列表",
    type: () => RecipeSupplementaryItemDto,
    isArray: true
  })
  @IsOptional()
  @IsArray({ message: "辅料列表必须是数组" })
  @ValidateNested({ each: true })
  @Type(() => RecipeSupplementaryItemDto)
  supplementarys?: RecipeSupplementaryItemDto[];
}
