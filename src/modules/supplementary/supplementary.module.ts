import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplementaryController } from "./supplementary.controller";
import { SupplementaryService } from "./supplementary.service";
import { SupplementaryEntity } from "./entities/supplementary.entity";
import { SupplementaryRepository } from "./repository/supplementary.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SupplementaryEntity])],
  controllers: [SupplementaryController],
  providers: [SupplementaryService, SupplementaryRepository],
  exports: [SupplementaryService, SupplementaryRepository]
})
export class SupplementaryModule {}
