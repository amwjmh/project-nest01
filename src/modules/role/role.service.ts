import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { instanceToPlain } from "class-transformer";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ListDto } from "./dto/list.dto";
import { RoleRepository } from "./repository/role.repository";

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.findByRoleCode(createRoleDto.roleCode);
    if (role) {
      throw new Error("角色代码已存在");
    }
    return await this.roleRepository.save(createRoleDto);
  }

  async list(listDto: ListDto) {
    const { list, total } = await this.roleRepository.findByPage(listDto);
    return { list: instanceToPlain(list), total };
  }
}
