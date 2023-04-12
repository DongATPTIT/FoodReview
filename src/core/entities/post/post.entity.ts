import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name:"posts"})
export class Posts {
  @PrimaryGeneratedColumn({name:"id"})
  id: number;

  @Column({name:"content"})
  content: string;

  @Column({name:"user_id"})
  userId: number;

  @Column({name:"category_id"})
  categoryId: number;

  @Column({name:"active",comment:"0 is inactive, 1 is active"})
  active: boolean;

  @CreateDateColumn({ type: 'timestamp',name:"created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp',name:"updated_at"})
  updatedAt: Date;
}
