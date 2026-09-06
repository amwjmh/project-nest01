import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { RecipeEntity } from "../entities/recipe.entity";
import { ListRecipeDto } from "../dto/list-recipe.dto";

@Injectable()
export class RecipeRepository extends Repository<RecipeEntity> {
  constructor(private dataSource: DataSource) {
    super(RecipeEntity, dataSource.createEntityManager());
  }

  async findByName(name: string) {
    return this.dataSource.manager.find(RecipeEntity, {
      where: { name }
    });
  }

  async findByCuisineType(cuisineType: string) {
    return this.dataSource.manager.find(RecipeEntity, {
      where: { cuisineType }
    });
  }

  async findByFlavor(flavor: string) {
    return this.dataSource.manager.find(RecipeEntity, {
      where: { flavor }
    });
  }

  async findList(listDto: ListRecipeDto) {
    const qb = this.createQueryBuilder("recipe")
      .leftJoinAndSelect("recipe.steps", "steps")
      .leftJoinAndSelect("recipe.recipeIngredients", "recipeIngredients")
      .leftJoinAndSelect("recipeIngredients.ingredient", "ingredient")
      .leftJoinAndSelect("recipe.recipeSeasonings", "recipeSeasonings")
      .leftJoinAndSelect("recipeSeasonings.seasoning", "seasoning")
      .leftJoinAndSelect("recipe.recipeSupplementarys", "recipeSupplementarys")
      .leftJoinAndSelect("recipeSupplementarys.supplementary", "supplementary");

    if (listDto.name) {
      qb.andWhere("recipe.name LIKE :name", { name: `%${listDto.name}%` });
    }
    if (listDto.cuisineType) {
      qb.andWhere("recipe.cuisineType = :cuisineType", { cuisineType: listDto.cuisineType });
    }
    if (listDto.difficulty) {
      qb.andWhere("recipe.difficulty = :difficulty", { difficulty: listDto.difficulty });
    }

    qb.orderBy("recipe.id", "DESC");
    qb.skip((listDto.pageNum - 1) * listDto.pageSize).take(listDto.pageSize);

    const [list, total] = await qb.getManyAndCount();
    return { list, total };
  }
}
