import { PartialType } from "@nestjs/swagger";
import { CreateRecipeStepDto } from "./create-recipe_step.dto";

export class UpdateRecipeStepDto extends PartialType(CreateRecipeStepDto) {}
