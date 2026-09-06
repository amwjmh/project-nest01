import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RecipeEntity } from "./recipe.entity";
import { SeasoningEntity } from "../../seasoning/entities/seasoning.entity";

@Entity("recipe_seasoning")
export class RecipeSeasoningEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true, comment: "主键ID" })
  @ApiProperty({ description: "id", type: String, required: false })
  id: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.recipeSeasonings, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "recipe_id" })
  @ApiProperty({ description: "所属食谱", type: () => RecipeEntity })
  recipe: RecipeEntity;

  @ManyToOne(() => SeasoningEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "seasoning_id" })
  @ApiProperty({ description: "调料", type: () => SeasoningEntity })
  seasoning: SeasoningEntity;

  @Column({ type: "varchar", length: 50, nullable: true, comment: "用量（如：10克、1勺）" })
  @ApiPropertyOptional({ description: "用量", type: String })
  quantity?: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "备注（如：分两次放入）" })
  @ApiPropertyOptional({ description: "备注", type: String })
  remark?: string;
}
