import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { RecipeStepEntity } from "../entities/recipe_step.entity";
import { ListRecipeStepDto } from "../dto/list-recipe_step.dto";

@Injectable()
export class RecipeStepRepository extends Repository<RecipeStepEntity> {
  constructor(private dataSource: DataSource) {
    super(RecipeStepEntity, dataSource.createEntityManager());
  }

  async findByRecipeId(recipeId: number) {
    return this.dataSource.manager.find(RecipeStepEntity, {
      where: { recipe: { id: recipeId as any } },
      relations: ["recipe"],
      order: { stepOrder: "ASC" }
    });
  }

  async findList(listDto: ListRecipeStepDto) {
    const qb = this.createQueryBuilder("step").leftJoinAndSelect("step.recipe", "recipe");

    if (listDto.recipeId) {
      qb.andWhere("recipe.id = :recipeId", { recipeId: listDto.recipeId });
    }
    if (listDto.content) {
      qb.andWhere("step.content LIKE :content", { content: `%${listDto.content}%` });
    }

    qb.orderBy("step.recipe_id", "DESC")
      .addOrderBy("step.step_order", "ASC")
      .skip((listDto.pageNum - 1) * listDto.pageSize)
      .take(listDto.pageSize);

    const [list, total] = await qb.getManyAndCount();
    return { list, total };
  }
}
