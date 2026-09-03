import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecipeStepController } from "./recipe_step.controller";
import { RecipeStepService } from "./recipe_step.service";
import { RecipeStepEntity } from "./entities/recipe_step.entity";
import { RecipeStepRepository } from "./repository/recipe_step.repository";

@Module({
  imports: [TypeOrmModule.forFeature([RecipeStepEntity])],
  controllers: [RecipeStepController],
  providers: [RecipeStepService, RecipeStepRepository],
  exports: [RecipeStepService, RecipeStepRepository]
})
export class RecipeStepModule {}
