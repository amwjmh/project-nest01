import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity("ingredient")
export class IngredientEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true, comment: "食材id" })
  @ApiProperty({ description: "id", type: String, required: false })
  id: string;

  @Column({ type: "varchar", length: 50 })
  @ApiProperty({ description: "食材名", type: String })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @ApiPropertyOptional({ description: "备注", type: String })
  remark?: string;
}
