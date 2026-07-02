import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ListDto {
  @IsNumber()
  @ApiProperty({ description: "页码", example: 1 })
  pageNum: number;

  @IsNumber()
  @ApiProperty({ description: "每页条数", example: 10 })
  pageSize: number;

  @ApiProperty({ description: "角色名称", required: false })
  @IsOptional()
  @IsString()
  roleName?: string;

  @ApiProperty({ description: "角色编码", required: false })
  @IsOptional()
  @IsString()
  roleCode?: string;
}
