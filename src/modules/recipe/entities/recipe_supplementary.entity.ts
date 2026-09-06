import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RecipeEntity } from "./recipe.entity";
import { SupplementaryEntity } from "../../supplementary/entities/supplementary.entity";

@Entity("recipe_supplementary")
export class RecipeSupplementaryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true, comment: "主键ID" })
  @ApiProperty({ description: "id", type: String, required: false })
  id: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.recipeSupplementarys, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "recipe_id" })
  @ApiProperty({ description: "所属食谱", type: () => RecipeEntity })
  recipe: RecipeEntity;

  @ManyToOne(() => SupplementaryEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "supplementary_id" })
  @ApiProperty({ description: "辅料", type: () => SupplementaryEntity })
  supplementary: SupplementaryEntity;

  @Column({ type: "varchar", length: 50, nullable: true, comment: "用量（如：少许、3克）" })
  @ApiPropertyOptional({ description: "用量", type: String })
  quantity?: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "备注（如：出锅前撒入）" })
  @ApiPropertyOptional({ description: "备注", type: String })
  remark?: string;
}
