import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleEntity } from "./entitys/role.entity";
import { RoleRepository } from "./repository/role.repository";

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.findByRoleCode(createRoleDto.roleCode);
    if (role) {
      throw new Error("角色代码已存在");
    }
    // await this.roleRepository.save(role);
    return "This action adds a new role";
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
