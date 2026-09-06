import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RecipeEntity } from "./recipe.entity";
import { IngredientEntity } from "../../ingredient/entities/ingredient.entity";

@Entity("recipe_ingredient")
export class RecipeIngredientEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true, comment: "主键ID" })
  @ApiProperty({ description: "id", type: String, required: false })
  id: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.recipeIngredients, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "recipe_id" })
  @ApiProperty({ description: "所属食谱", type: () => RecipeEntity })
  recipe: RecipeEntity;

  @ManyToOne(() => IngredientEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "ingredient_id" })
  @ApiProperty({ description: "食材", type: () => IngredientEntity })
  ingredient: IngredientEntity;

  @Column({ type: "varchar", length: 50, nullable: true, comment: "用量（如：500克、2根）" })
  @ApiPropertyOptional({ description: "用量", type: String })
  quantity?: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "备注（如：需提前泡发）" })
  @ApiPropertyOptional({ description: "备注", type: String })
  remark?: string;
}
