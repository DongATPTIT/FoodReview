import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { ManyToMany, JoinTable, OneToMany } from 'typeorm';
@Entity({name:"post_detail"})
export class PostsDetail {
  @PrimaryGeneratedColumn({name:"id"})
  id: number;

  @Column({ name:"detail1" })
  detail1: string;

  @Column({ name:"detail2"})
  detail2: string;

  @Column({ name:"detail3" })
  detail3: string;

  @Column({ name:"post_id"})
  postId: number;
  
  @CreateDateColumn({ type: 'timestamp',name:"created_at" })
  createdAt: Date;
}
