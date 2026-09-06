import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

/** 创建食谱时关联的食材项 */
export class RecipeIngredientItemDto {
  @ApiProperty({ description: "食材ID" })
  @IsNotEmpty({ message: "食材ID不能为空" })
  @Type(() => Number)
  id: number;

  @ApiPropertyOptional({ description: "用量（如：500克、2根）" })
  @IsOptional()
  @IsString({ message: "用量必须是字符串" })
  @MaxLength(50, { message: "用量长度不能超过50" })
  quantity?: string;

  @ApiPropertyOptional({ description: "备注（如：需提前泡发）" })
  @IsOptional()
  @IsString({ message: "备注必须是字符串" })
  @MaxLength(255, { message: "备注长度不能超过255" })
  remark?: string;
}

/** 创建食谱时关联的调料项 */
export class RecipeSeasoningItemDto {
  @ApiProperty({ description: "调料ID" })
  @IsNotEmpty({ message: "调料ID不能为空" })
  @Type(() => Number)
  id: number;

  @ApiPropertyOptional({ description: "用量（如：10克、1勺）" })
  @IsOptional()
  @IsString({ message: "用量必须是字符串" })
  @MaxLength(50, { message: "用量长度不能超过50" })
  quantity?: string;

  @ApiPropertyOptional({ description: "备注（如：分两次放入）" })
  @IsOptional()
  @IsString({ message: "备注必须是字符串" })
  @MaxLength(255, { message: "备注长度不能超过255" })
  remark?: string;
}

/** 创建食谱时关联的辅料项 */
export class RecipeSupplementaryItemDto {
  @ApiProperty({ description: "辅料ID" })
  @IsNotEmpty({ message: "辅料ID不能为空" })
  @Type(() => Number)
  id: number;

  @ApiPropertyOptional({ description: "用量（如：少许、3克）" })
  @IsOptional()
  @IsString({ message: "用量必须是字符串" })
  @MaxLength(50, { message: "用量长度不能超过50" })
  quantity?: string;

  @ApiPropertyOptional({ description: "备注（如：出锅前撒入）" })
  @IsOptional()
  @IsString({ message: "备注必须是字符串" })
  @MaxLength(255, { message: "备注长度不能超过255" })
  remark?: string;
}
