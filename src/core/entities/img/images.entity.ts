import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';
@Entity({name:"images"})
export class Images {
  @PrimaryGeneratedColumn({name:"id"})
  id: number;
  
  @Column({name:"link"})
  link: string;

  @Column({name:"post_id"})
  postId: number;

  @CreateDateColumn({ type: 'timestamp',name:"created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp',name:"updated_at"})
  updateddAt: Date;
}
