import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RecipeStepEntity } from "../../recipe_step/entities/recipe_step.entity";

@Entity("recipe")
export class RecipeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true, comment: "菜id" })
  @ApiProperty({ description: "id", type: String, required: false })
  id: string;

  @Column({ type: "varchar", length: 100 })
  @ApiProperty({ description: "菜名", type: String })
  name: string;

  @Column({ name: "calories_per_100g", type: "decimal", precision: 6, scale: 2, default: 0 })
  @ApiPropertyOptional({ description: "100g多少大卡", type: Number })
  caloriesPer100g?: number;

  @Column({ type: "tinyint", default: 1 })
  @ApiPropertyOptional({ description: "难度 1简单 2中等 3困难", type: Number })
  difficulty?: number;

  @Column({ name: "cooking_time", type: "smallint" })
  @ApiProperty({ description: "耗时(分钟)", type: Number })
  cookingTime: number;

  @Column({ name: "cuisine_type", type: "varchar", length: 50, nullable: true })
  @ApiPropertyOptional({ description: "菜系/分类", type: String })
  cuisineType?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  @ApiPropertyOptional({ description: "厨具", type: String })
  kitchenware?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  @ApiPropertyOptional({ description: "口味", type: String })
  flavor?: string;

  @Column({ name: "effectImg", type: "varchar", length: 255, nullable: true })
  @ApiPropertyOptional({ description: "效果图片URL", type: String })
  effectImg?: string;

  @OneToMany(() => RecipeStepEntity, (step) => step.recipe)
  @ApiPropertyOptional({ description: "步骤列表", type: () => RecipeStepEntity, isArray: true })
  steps?: RecipeStepEntity[];
}
