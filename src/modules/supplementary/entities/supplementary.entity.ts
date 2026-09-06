import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity("supplementary")
export class SupplementaryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true, comment: "辅料id" })
  @ApiProperty({ description: "id", type: String, required: false })
  id: string;

  @Column({ type: "varchar", length: 50 })
  @ApiProperty({ description: "辅料名", type: String })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @ApiPropertyOptional({ description: "备注", type: String })
  remark?: string;
}
