import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { instanceToPlain } from "class-transformer";
import { SupplementaryEntity } from "./entities/supplementary.entity";
import { SupplementaryRepository } from "./repository/supplementary.repository";
import { CreateSupplementaryDto } from "./dto/create-supplementary.dto";
import { UpdateSupplementaryDto } from "./dto/update-supplementary.dto";
import { ListSupplementaryDto } from "./dto/list-supplementary.dto";

@Injectable()
export class SupplementaryService {
  constructor(
    @InjectRepository(SupplementaryEntity)
    private readonly supplementaryRepository: Repository<SupplementaryEntity>,
    private readonly supplementaryCustomRepository: SupplementaryRepository
  ) {}

  async create(dto: CreateSupplementaryDto) {
    const exist = await this.supplementaryCustomRepository.findByName(dto.name);
    if (exist) {
      throw new Error("辅料名已存在");
    }
    const supplementary = this.supplementaryRepository.create({
      name: dto.name,
      remark: dto.remark
    });
    return await this.supplementaryRepository.save(supplementary);
  }

  async findAll() {
    return await this.supplementaryRepository.find({
      order: { id: "DESC" }
    });
  }

  async findOne(id: number) {
    const supplementary = await this.supplementaryRepository.findOne({
      where: { id: id as any }
    });
    if (!supplementary) {
      throw new Error("辅料不存在");
    }
    return supplementary;
  }

  async update(id: number, dto: UpdateSupplementaryDto) {
    const supplementary = await this.findOne(id);
    if (dto.name && dto.name !== supplementary.name) {
      const exist = await this.supplementaryCustomRepository.findByName(dto.name);
      if (exist && String(exist.id) !== String(id)) {
        throw new Error("辅料名已存在");
      }
    }
    return await this.supplementaryRepository.update(id, {
      name: dto.name,
      remark: dto.remark
    });
  }

  async remove(id: number) {
    const supplementary = await this.findOne(id);
    return await this.supplementaryRepository.remove(supplementary);
  }

  async list(listDto: ListSupplementaryDto) {
    const where: any = {};
    if (listDto.name) {
      where.name = Like(`%${listDto.name}%`);
    }
    const [result, total] = await this.supplementaryRepository.findAndCount({
      where,
      skip: (listDto.pageNum - 1) * listDto.pageSize,
      take: listDto.pageSize,
      order: { id: "DESC" }
    });
    return { list: instanceToPlain(result), total };
  }
}
