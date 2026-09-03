import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { IngredientEntity } from "../entities/ingredient.entity";

@Injectable()
export class IngredientRepository extends Repository<IngredientEntity> {
  constructor(private dataSource: DataSource) {
    super(IngredientEntity, dataSource.createEntityManager());
  }

  async findByName(name: string) {
    return this.dataSource.manager.findOne(IngredientEntity, {
      where: { name }
    });
  }
}
