import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ListDto } from "./dto/list.dto";
import { ApiResponse } from "../../common/api-response";

@ApiTags("角色接口")
@Controller("api/role")
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post("create")
  @ApiOperation({ summary: "创建角色" })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Post("page")
  @ApiOperation({ summary: "分页查询角色列表" })
  async page(@Body() listDto: ListDto) {
    const { list, total } = await this.roleService.list(listDto);
    return ApiResponse.ok(list, "查询成功", total);
  }
}
