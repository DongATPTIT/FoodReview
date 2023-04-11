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
@Entity()
export class Comments {
  @PrimaryGeneratedColumn({name:"id"})
  id: number;
  @Column({ name:"user_id"})
  userId: number;

  @Column({ name:"post_id" })
  postId: number;

  @Column({ name:"content" })
  content: string;

  @Column({name:"parrent_id"})
  parrentId: number;

  @Column({name :"child_number" })
  childNumber: number;

  @CreateDateColumn({ type: 'timestamp',name:"created_at" })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp',name:"updated_at"})
  updatedAt: Date;
}
