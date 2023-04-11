import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';
@Entity({name:"device_token"})
export class DeviceToken {

  @PrimaryGeneratedColumn({name:"id"})
  id: number;

  @Column({name:"user_id"})
  userId: number;

  @CreateDateColumn({ type: 'timestamp',name:"created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp',name:"updated_at"})
  updatedAt: Date;

}
