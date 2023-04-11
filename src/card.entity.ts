// Tên chủ thẻ, kiểu thẻ, số thẻ, số CVC và tháng năm hết hạn
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  cardtype: string;
  @Column()
  cardNumber: string;
  @Column()
  cvcNumber: string;
  @Column()
  date: string;
}
