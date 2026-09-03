import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { instanceToPlain } from "class-transformer";
import { IngredientEntity } from "./entities/ingredient.entity";
import { IngredientRepository } from "./repository/ingredient.repository";
import { CreateIngredientDto } from "./dto/create-ingredient.dto";
import { UpdateIngredientDto } from "./dto/update-ingredient.dto";
import { ListIngredientDto } from "./dto/list-ingredient.dto";

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(IngredientEntity)
    private readonly ingredientRepository: Repository<IngredientEntity>,
    private readonly ingredientCustomRepository: IngredientRepository
  ) {}

  async create(dto: CreateIngredientDto) {
    const exist = await this.ingredientCustomRepository.findByName(dto.name);
    if (exist) {
      throw new Error("食材名已存在");
    }
    const ingredient = this.ingredientRepository.create({
      name: dto.name,
      remark: dto.remark
    });
    return await this.ingredientRepository.save(ingredient);
  }

  async findAll() {
    return await this.ingredientRepository.find({
      order: { id: "DESC" }
    });
  }

  async findOne(id: number) {
    const ingredient = await this.ingredientRepository.findOne({
      where: { id: id as any }
    });
    if (!ingredient) {
      throw new Error("食材不存在");
    }
    return ingredient;
  }

  async update(id: number, dto: UpdateIngredientDto) {
    const ingredient = await this.findOne(id);
    if (dto.name && dto.name !== ingredient.name) {
      const exist = await this.ingredientCustomRepository.findByName(dto.name);
      if (exist && String(exist.id) !== String(id)) {
        throw new Error("食材名已存在");
      }
    }
    return await this.ingredientRepository.update(id, {
      name: dto.name,
      remark: dto.remark
    });
  }

  async remove(id: number) {
    const ingredient = await this.findOne(id);
    return await this.ingredientRepository.remove(ingredient);
  }

  async list(listDto: ListIngredientDto) {
    const where: any = {};
    if (listDto.name) {
      where.name = Like(`%${listDto.name}%`);
    }
    const [result, total] = await this.ingredientRepository.findAndCount({
      where,
      skip: (listDto.pageNum - 1) * listDto.pageSize,
      take: listDto.pageSize,
      order: { id: "DESC" }
    });
    return { list: instanceToPlain(result), total };
  }
}
