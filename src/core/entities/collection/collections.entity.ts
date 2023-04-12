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
@Entity({name:"collections"})
export class Collections {
  @PrimaryGeneratedColumn({name:"id"})
  id: number;

  @Column({name:'user_id'})
  userId: number;

  @Column({name:'post_id'})
  postId: number;

  @CreateDateColumn({ type: 'timestamp',name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp',name:"updated_at"})
  updatedAt: Date;
}
