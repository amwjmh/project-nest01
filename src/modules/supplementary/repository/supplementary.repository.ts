import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { SupplementaryEntity } from "../entities/supplementary.entity";

@Injectable()
export class SupplementaryRepository extends Repository<SupplementaryEntity> {
  constructor(private dataSource: DataSource) {
    super(SupplementaryEntity, dataSource.createEntityManager());
  }

  async findByName(name: string) {
    return this.dataSource.manager.findOne(SupplementaryEntity, {
      where: { name }
    });
  }
}
