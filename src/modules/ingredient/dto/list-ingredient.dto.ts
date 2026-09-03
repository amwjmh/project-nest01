import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ListIngredientDto {
  @ApiProperty({ description: "页码", example: 1 })
  @IsNumber({}, { message: "页码必须是数字" })
  pageNum: number;

  @ApiProperty({ description: "每页条数", example: 10 })
  @IsNumber({}, { message: "每页条数必须是数字" })
  pageSize: number;

  @ApiPropertyOptional({ description: "食材名" })
  @IsOptional()
  @IsString({ message: "食材名必须是字符串" })
  name?: string;
}
