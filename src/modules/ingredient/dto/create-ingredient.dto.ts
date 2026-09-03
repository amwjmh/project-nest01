import { IsNotEmpty, IsString, MaxLength, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateIngredientDto {
  @ApiProperty({ description: "食材名" })
  @IsNotEmpty({ message: "食材名不能为空" })
  @IsString({ message: "食材名必须是字符串" })
  @MaxLength(50, { message: "食材名长度不能超过50" })
  name: string;

  @ApiPropertyOptional({ description: "备注" })
  @IsOptional()
  @IsString({ message: "备注必须是字符串" })
  @MaxLength(255, { message: "备注长度不能超过255" })
  remark?: string;
}
