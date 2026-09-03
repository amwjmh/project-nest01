import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { instanceToPlain } from "class-transformer";
import { SeasoningEntity } from "./entities/seasoning.entity";
import { SeasoningRepository } from "./repository/seasoning.repository";
import { CreateSeasoningDto } from "./dto/create-seasoning.dto";
import { UpdateSeasoningDto } from "./dto/update-seasoning.dto";
import { ListSeasoningDto } from "./dto/list-seasoning.dto";

@Injectable()
export class SeasoningService {
  constructor(
    @InjectRepository(SeasoningEntity)
    private readonly seasoningRepository: Repository<SeasoningEntity>,
    private readonly seasoningCustomRepository: SeasoningRepository
  ) {}

  async create(dto: CreateSeasoningDto) {
    const exist = await this.seasoningCustomRepository.findByName(dto.name);
    if (exist) {
      throw new Error("调料名已存在");
    }
    const seasoning = this.seasoningRepository.create({
      name: dto.name,
      remark: dto.remark
    });
    return await this.seasoningRepository.save(seasoning);
  }

  async findAll() {
    return await this.seasoningRepository.find({
      order: { id: "DESC" }
    });
  }

  async findOne(id: number) {
    const seasoning = await this.seasoningRepository.findOne({
      where: { id: id as any }
    });
    if (!seasoning) {
      throw new Error("调料不存在");
    }
    return seasoning;
  }

  async update(id: number, dto: UpdateSeasoningDto) {
    const seasoning = await this.findOne(id);
    if (dto.name && dto.name !== seasoning.name) {
      const exist = await this.seasoningCustomRepository.findByName(dto.name);
      if (exist && String(exist.id) !== String(id)) {
        throw new Error("调料名已存在");
      }
    }
    return await this.seasoningRepository.update(id, {
      name: dto.name,
      remark: dto.remark
    });
  }

  async remove(id: number) {
    const seasoning = await this.findOne(id);
    return await this.seasoningRepository.remove(seasoning);
  }

  async list(listDto: ListSeasoningDto) {
    const where: any = {};
    if (listDto.name) {
      where.name = Like(`%${listDto.name}%`);
    }
    const [result, total] = await this.seasoningRepository.findAndCount({
      where,
      skip: (listDto.pageNum - 1) * listDto.pageSize,
      take: listDto.pageSize,
      order: { id: "DESC" }
    });
    return { list: instanceToPlain(result), total };
  }
}
