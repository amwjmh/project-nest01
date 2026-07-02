import { Repository, DataSource, Like } from "typeorm";
import { Injectable } from "@nestjs/common";
import { RoleEntity } from "../entitys/role.entity";
import { ListDto } from "../dto/list.dto";

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
      super(RoleEntity, dataSource.createEntityManager());
  };

  async findByRoleCode(roleCode: string) {
    return this.dataSource.manager.getRepository(RoleEntity).findOne({
      where: {
        roleCode
      }
    });
  }

  async findByPage(listDto: ListDto) {
    const where: any = {};
    if (listDto.roleName) {
      where.roleName = Like(`%${listDto.roleName}%`);
    }
    if (listDto.roleCode) {
      where.roleCode = Like(`%${listDto.roleCode}%`);
    }
    const [result, total] = await this.dataSource.manager.getRepository(RoleEntity).findAndCount({
      where,
      select: ["id", "roleCode", "roleName", "desc", "createTime", "updateTime"],
      skip: (listDto.pageNum - 1) * listDto.pageSize,
      take: listDto.pageSize,
      order: { createTime: "DESC" }
    });
    return { list: result, total };
  }
}
