import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeasoningController } from "./seasoning.controller";
import { SeasoningService } from "./seasoning.service";
import { SeasoningEntity } from "./entities/seasoning.entity";
import { SeasoningRepository } from "./repository/seasoning.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SeasoningEntity])],
  controllers: [SeasoningController],
  providers: [SeasoningService, SeasoningRepository],
  exports: [SeasoningService, SeasoningRepository]
})
export class SeasoningModule {}
