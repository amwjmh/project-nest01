import { IsNotEmpty, IsString, MaxLength, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateSeasoningDto {
  @ApiProperty({ description: "调料名" })
  @IsNotEmpty({ message: "调料名不能为空" })
  @IsString({ message: "调料名必须是字符串" })
  @MaxLength(50, { message: "调料名长度不能超过50" })
  name: string;

  @ApiPropertyOptional({ description: "备注" })
  @IsOptional()
  @IsString({ message: "备注必须是字符串" })
  @MaxLength(255, { message: "备注长度不能超过255" })
  remark?: string;
}
