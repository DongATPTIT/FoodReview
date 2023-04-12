import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'category' })
export class Category {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;
    @Column({ name: 'name' })
    name: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updateddAt: Date;
}
