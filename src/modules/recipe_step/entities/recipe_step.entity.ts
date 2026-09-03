import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RecipeEntity } from "../../recipe/entities/recipe.entity";

@Entity("recipe_step")
export class RecipeStepEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true, comment: "步骤id" })
  @ApiProperty({ description: "id", type: String, required: false })
  id: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.steps)
  @JoinColumn({ name: "recipe_id" })
  @ApiProperty({ description: "所属食谱", type: () => RecipeEntity })
  recipe: RecipeEntity;

  @Column({ name: "step_order", type: "smallint" })
  @ApiProperty({ description: "步骤序号", type: Number })
  stepOrder: number;

  @Column({ type: "text" })
  @ApiProperty({ description: "步骤内容", type: String })
  content: string;

  @Column({ name: "time_estimate", type: "smallint", nullable: true })
  @ApiPropertyOptional({ description: "时间(分钟)", type: Number })
  timeEstimate?: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  @ApiPropertyOptional({ description: "注意事项", type: String })
  precautions?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @ApiPropertyOptional({ description: "备注", type: String })
  remark?: string;

  @Column({ name: "stepImg", type: "varchar", length: 255, nullable: true })
  @ApiPropertyOptional({ description: "步骤图片URL", type: String })
  stepImg?: string;
}
