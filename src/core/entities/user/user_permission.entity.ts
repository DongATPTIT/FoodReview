import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';
import { ManyToMany, JoinTable, OneToMany } from 'typeorm';
@Entity({name:"user_permissions"})
export class UserPermission {
  @PrimaryGeneratedColumn({name:"id"})
  id: number;
  @Column({name:"user_id"})
  userId: number;
  @Column({name:"permission_id"})
  permissionId: number;
  @CreateDateColumn({ type: 'timestamp',name:"created_at" })
  create_at: Date;
  @UpdateDateColumn({ type: 'timestamp',name:"updated_at"})
  updatedAt: Date;
}
