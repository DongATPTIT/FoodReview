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
@Entity({name:"user"})
export class User {

  @PrimaryGeneratedColumn({name:"id"})
  id: number;

  @Column({ unique: true, length: '255',name:"username" })
  username: string;
  
  @Column({name:"password"})
  password: string;

  @Column({ nullable: true,name:"name" })
  name: string;

  @Column({ nullable: true ,name:"email",unique:true})
  email: string;

  @Column({ nullable: true ,name:"phonenumber"})
  phonenumber: string;

  @Column({ nullable: true,name:"address" })
  address: string;

  @Column({ nullable: true ,name:"dob"})
  dob: Date;

  @Column({name:"sex",comment:"0 is male, 1 is female"})
  sex: number;

  @Column({name:"role",comment:"0 is user, 1 is admin"})
  role: number;

  @Column({name:"avartar"})
  avatar: string;

  @Column({name:"active",comment:"0 is inactive, 1 is active"})
  active: boolean;

  @CreateDateColumn({ type: 'timestamp',name:"created_at"})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp',name:"updated_at"})
  updatedAt: Date;

}
