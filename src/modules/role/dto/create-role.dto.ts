import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ description: "角色编码" })
  @IsNotEmpty({ message: "角色编码不能为空" })
  roleCode: string;

  @ApiProperty({ description: "角色名称" })
  @IsNotEmpty({ message: "角色名称不能为空" })
  @IsString({ message: "角色名称必须是字符串" })
  roleName: string;

  @ApiProperty({ description: "角色描述" })
  @IsString({ message: "描述必须是字符串" })
  @IsNotEmpty({ message: "描述不能为空" })
  desc: string;
}
