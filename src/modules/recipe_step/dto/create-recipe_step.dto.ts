import { IsNotEmpty, IsString, IsInt, IsOptional, MaxLength, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateRecipeStepDto {
  @ApiProperty({ description: "食谱ID" })
  @IsNotEmpty({ message: "食谱ID不能为空" })
  @Type(() => Number)
  @IsInt({ message: "食谱ID必须是整数" })
  recipeId: number;

  @ApiProperty({ description: "步骤序号" })
  @IsNotEmpty({ message: "步骤序号不能为空" })
  @Type(() => Number)
  @IsInt({ message: "步骤序号必须是整数" })
  @Min(1, { message: "步骤序号不能小于1" })
  stepOrder: number;

  @ApiProperty({ description: "步骤内容" })
  @IsNotEmpty({ message: "步骤内容不能为空" })
  @IsString({ message: "步骤内容必须是字符串" })
  content: string;

  @ApiPropertyOptional({ description: "时间(分钟)" })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "时间必须是整数" })
  timeEstimate?: number;

  @ApiPropertyOptional({ description: "注意事项" })
  @IsOptional()
  @IsString({ message: "注意事项必须是字符串" })
  @MaxLength(255, { message: "注意事项长度不能超过255" })
  precautions?: string;

  @ApiPropertyOptional({ description: "备注" })
  @IsOptional()
  @IsString({ message: "备注必须是字符串" })
  @MaxLength(255, { message: "备注长度不能超过255" })
  remark?: string;

  @ApiPropertyOptional({ description: "步骤图片URL" })
  @IsOptional()
  @IsString({ message: "步骤图片URL必须是字符串" })
  @MaxLength(255, { message: "步骤图片URL长度不能超过255" })
  stepImg?: string;
}
