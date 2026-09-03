import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IngredientController } from "./ingredient.controller";
import { IngredientService } from "./ingredient.service";
import { IngredientEntity } from "./entities/ingredient.entity";
import { IngredientRepository } from "./repository/ingredient.repository";

@Module({
  imports: [TypeOrmModule.forFeature([IngredientEntity])],
  controllers: [IngredientController],
  providers: [IngredientService, IngredientRepository],
  exports: [IngredientService, IngredientRepository]
})
export class IngredientModule {}
