import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { PermissionEntity } from "../../permission/entities/permission.entity";
import * as dayjs from "dayjs";

@Entity("role")
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "id", type: String, required: false })
  id: string;

  @Column({ type: "varchar" })
  @ApiProperty({ description: "角色编码", type: String })
  roleCode: string;

  @Column({ type: "varchar" })
  @ApiProperty({ description: "名称", type: String })
  roleName: string;

  @Column({ type: "varchar" })
  @ApiProperty({ description: "描述", type: String })
  desc: string;

  @CreateDateColumn({ type: "datetime" })
  @ApiProperty({ description: "创建时间", type: Date })
  @Transform(({ value }) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"))
  createTime: Date;

  @UpdateDateColumn({ type: "datetime" })
  @ApiProperty({ description: "更新时间", type: Date })
  updateTime: Date;

  @ManyToMany(() => PermissionEntity)
  @JoinTable({ name: "role_permission_relation" })
  permissions: PermissionEntity[];
}
