import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecipeController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";
import { RecipeEntity } from "./entities/recipe.entity";
import { RecipeRepository } from "./repository/recipe.repository";

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity])],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
  exports: [RecipeService, RecipeRepository]
})
export class RecipeModule {}
