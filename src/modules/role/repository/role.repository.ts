import { Repository, DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "../entitys/role.entity";

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
}
