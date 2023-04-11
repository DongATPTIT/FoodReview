import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { ManyToMany, JoinTable, OneToMany } from 'typeorm';
@Entity()
export class Permissions {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name:"name" })
  name: string;
  
  @CreateDateColumn({ type: 'timestamp',name:"created_at"})
  createdAt: Date;
}
