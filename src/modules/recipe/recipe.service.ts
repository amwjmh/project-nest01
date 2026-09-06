import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { instanceToPlain } from "class-transformer";
import { RecipeEntity } from "./entities/recipe.entity";
import { RecipeIngredientEntity } from "./entities/recipe_ingredient.entity";
import { RecipeSeasoningEntity } from "./entities/recipe_seasoning.entity";
import { RecipeSupplementaryEntity } from "./entities/recipe_supplementary.entity";
import { IngredientEntity } from "../ingredient/entities/ingredient.entity";
import { SeasoningEntity } from "../seasoning/entities/seasoning.entity";
import { SupplementaryEntity } from "../supplementary/entities/supplementary.entity";
import { RecipeRepository } from "./repository/recipe.repository";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { ListRecipeDto } from "./dto/list-recipe.dto";

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(RecipeIngredientEntity)
    private readonly recipeIngredientRepository: Repository<RecipeIngredientEntity>,
    @InjectRepository(RecipeSeasoningEntity)
    private readonly recipeSeasoningRepository: Repository<RecipeSeasoningEntity>,
    @InjectRepository(RecipeSupplementaryEntity)
    private readonly recipeSupplementaryRepository: Repository<RecipeSupplementaryEntity>,
    private readonly recipeCustomRepository: RecipeRepository
  ) {}

  async create(dto: CreateRecipeDto) {
    const recipe = this.recipeRepository.create({
      name: dto.name,
      caloriesPer100g: dto.caloriesPer100g ?? 0,
      difficulty: dto.difficulty ?? 1,
      cookingTime: dto.cookingTime,
      cuisineType: dto.cuisineType,
      kitchenware: dto.kitchenware,
      flavor: dto.flavor,
      effectImg: dto.effectImg
    });
    const savedRecipe = await this.recipeRepository.save(recipe);

    if (dto.ingredients?.length) {
      const items = dto.ingredients.map((item) =>
        this.recipeIngredientRepository.create({
          recipe: savedRecipe,
          ingredient: { id: item.id } as unknown as IngredientEntity,
          quantity: item.quantity,
          remark: item.remark
        })
      );
      await this.recipeIngredientRepository.save(items);
    }

    if (dto.seasonings?.length) {
      const items = dto.seasonings.map((item) =>
        this.recipeSeasoningRepository.create({
          recipe: savedRecipe,
          seasoning: { id: item.id } as unknown as SeasoningEntity,
          quantity: item.quantity,
          remark: item.remark
        })
      );
      await this.recipeSeasoningRepository.save(items);
    }

    if (dto.supplementarys?.length) {
      const items = dto.supplementarys.map((item) =>
        this.recipeSupplementaryRepository.create({
          recipe: savedRecipe,
          supplementary: { id: item.id } as unknown as SupplementaryEntity,
          quantity: item.quantity,
          remark: item.remark
        })
      );
      await this.recipeSupplementaryRepository.save(items);
    }

    return savedRecipe;
  }

  async findAll() {
    return await this.recipeRepository.find({
      relations: [
        "steps",
        "recipeIngredients.ingredient",
        "recipeSeasonings.seasoning",
        "recipeSupplementarys.supplementary"
      ],
      order: { id: "DESC" }
    });
  }

  async findOne(id: number) {
    const recipe = await this.recipeRepository.findOne({
      where: { id: id as any },
      relations: [
        "steps",
        "recipeIngredients.ingredient",
        "recipeSeasonings.seasoning",
        "recipeSupplementarys.supplementary"
      ]
    });
    if (!recipe) {
      throw new Error("食谱不存在");
    }
    return recipe;
  }

  async update(id: number, dto: UpdateRecipeDto) {
    await this.findOne(id);
    await this.recipeRepository.update(id, {
      name: dto.name,
      caloriesPer100g: dto.caloriesPer100g,
      difficulty: dto.difficulty,
      cookingTime: dto.cookingTime,
      cuisineType: dto.cuisineType,
      kitchenware: dto.kitchenware,
      flavor: dto.flavor,
      effectImg: dto.effectImg
    });

    if (dto.ingredients !== undefined) {
      await this.recipeIngredientRepository
        .createQueryBuilder()
        .delete()
        .where("recipe_id = :recipeId", { recipeId: id })
        .execute();
      if (dto.ingredients.length) {
        const items = dto.ingredients.map((item) =>
          this.recipeIngredientRepository.create({
            recipe: { id: id as any } as unknown as RecipeEntity,
            ingredient: { id: item.id } as unknown as IngredientEntity,
            quantity: item.quantity,
            remark: item.remark
          })
        );
        await this.recipeIngredientRepository.save(items);
      }
    }

    if (dto.seasonings !== undefined) {
      await this.recipeSeasoningRepository
        .createQueryBuilder()
        .delete()
        .where("recipe_id = :recipeId", { recipeId: id })
        .execute();
      if (dto.seasonings.length) {
        const items = dto.seasonings.map((item) =>
          this.recipeSeasoningRepository.create({
            recipe: { id: id as any } as unknown as RecipeEntity,
            seasoning: { id: item.id } as unknown as SeasoningEntity,
            quantity: item.quantity,
            remark: item.remark
          })
        );
        await this.recipeSeasoningRepository.save(items);
      }
    }

    if (dto.supplementarys !== undefined) {
      await this.recipeSupplementaryRepository
        .createQueryBuilder()
        .delete()
        .where("recipe_id = :recipeId", { recipeId: id })
        .execute();
      if (dto.supplementarys.length) {
        const items = dto.supplementarys.map((item) =>
          this.recipeSupplementaryRepository.create({
            recipe: { id: id as any } as unknown as RecipeEntity,
            supplementary: { id: item.id } as unknown as SupplementaryEntity,
            quantity: item.quantity,
            remark: item.remark
          })
        );
        await this.recipeSupplementaryRepository.save(items);
      }
    }
  }

  async remove(id: number) {
    const recipe = await this.findOne(id);
    return await this.recipeRepository.remove(recipe);
  }

  async list(listDto: ListRecipeDto) {
    const { list, total } = await this.recipeCustomRepository.findList(listDto);
    return { list: instanceToPlain(list), total };
  }
}
