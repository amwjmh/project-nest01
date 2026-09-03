import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { SeasoningEntity } from "../entities/seasoning.entity";

@Injectable()
export class SeasoningRepository extends Repository<SeasoningEntity> {
  constructor(private dataSource: DataSource) {
    super(SeasoningEntity, dataSource.createEntityManager());
  }

  async findByName(name: string) {
    return this.dataSource.manager.findOne(SeasoningEntity, {
      where: { name }
    });
  }
}
