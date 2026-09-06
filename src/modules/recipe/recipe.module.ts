import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecipeController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";
import { RecipeEntity } from "./entities/recipe.entity";
import { RecipeIngredientEntity } from "./entities/recipe_ingredient.entity";
import { RecipeSeasoningEntity } from "./entities/recipe_seasoning.entity";
import { RecipeSupplementaryEntity } from "./entities/recipe_supplementary.entity";
import { RecipeRepository } from "./repository/recipe.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecipeEntity,
      RecipeIngredientEntity,
      RecipeSeasoningEntity,
      RecipeSupplementaryEntity
    ])
  ],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
  exports: [RecipeService, RecipeRepository]
})
export class RecipeModule {}
