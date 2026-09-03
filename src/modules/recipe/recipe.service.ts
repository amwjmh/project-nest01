import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { instanceToPlain } from "class-transformer";
import { RecipeEntity } from "./entities/recipe.entity";
import { RecipeRepository } from "./repository/recipe.repository";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { ListRecipeDto } from "./dto/list-recipe.dto";

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
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
    return await this.recipeRepository.save(recipe);
  }

  async findAll() {
    return await this.recipeRepository.find({
      relations: ["steps"],
      order: { id: "DESC" }
    });
  }

  async findOne(id: number) {
    const recipe = await this.recipeRepository.findOne({
      where: { id: id as any },
      relations: ["steps"]
    });
    if (!recipe) {
      throw new Error("食谱不存在");
    }
    return recipe;
  }

  async update(id: number, dto: UpdateRecipeDto) {
    await this.findOne(id);
    return await this.recipeRepository.update(id, {
      name: dto.name,
      caloriesPer100g: dto.caloriesPer100g,
      difficulty: dto.difficulty,
      cookingTime: dto.cookingTime,
      cuisineType: dto.cuisineType,
      kitchenware: dto.kitchenware,
      flavor: dto.flavor,
      effectImg: dto.effectImg
    });
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
