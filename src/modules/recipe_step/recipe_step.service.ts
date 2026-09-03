import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { instanceToPlain } from "class-transformer";
import { RecipeStepEntity } from "./entities/recipe_step.entity";
import { RecipeStepRepository } from "./repository/recipe_step.repository";
import { CreateRecipeStepDto } from "./dto/create-recipe_step.dto";
import { UpdateRecipeStepDto } from "./dto/update-recipe_step.dto";
import { ListRecipeStepDto } from "./dto/list-recipe_step.dto";

@Injectable()
export class RecipeStepService {
  constructor(
    @InjectRepository(RecipeStepEntity)
    private readonly recipeStepRepository: Repository<RecipeStepEntity>,
    private readonly recipeStepCustomRepository: RecipeStepRepository
  ) {}

  async create(dto: CreateRecipeStepDto) {
    const step = this.recipeStepRepository.create({
      stepOrder: dto.stepOrder,
      content: dto.content,
      timeEstimate: dto.timeEstimate,
      precautions: dto.precautions,
      remark: dto.remark,
      stepImg: dto.stepImg,
      recipe: { id: dto.recipeId } as any
    });
    return await this.recipeStepRepository.save(step);
  }

  async findAll() {
    return await this.recipeStepRepository.find({
      relations: ["recipe"],
      order: { id: "DESC" }
    });
  }

  async findOne(id: number) {
    const step = await this.recipeStepRepository.findOne({
      where: { id: id as any },
      relations: ["recipe"]
    });
    if (!step) {
      throw new Error("步骤不存在");
    }
    return step;
  }

  async findByRecipeId(recipeId: number) {
    return await this.recipeStepCustomRepository.findByRecipeId(recipeId);
  }

  async update(id: number, dto: UpdateRecipeStepDto) {
    await this.findOne(id);
    const updateData: any = {
      stepOrder: dto.stepOrder,
      content: dto.content,
      timeEstimate: dto.timeEstimate,
      precautions: dto.precautions,
      remark: dto.remark,
      stepImg: dto.stepImg
    };
    if (dto.recipeId) {
      updateData.recipe = { id: dto.recipeId };
    }
    return await this.recipeStepRepository.update(id, updateData);
  }

  async remove(id: number) {
    const step = await this.findOne(id);
    return await this.recipeStepRepository.remove(step);
  }

  async list(listDto: ListRecipeStepDto) {
    const { list, total } = await this.recipeStepCustomRepository.findList(listDto);
    return { list: instanceToPlain(list), total };
  }
}
