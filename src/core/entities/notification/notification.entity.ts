import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Timestamp,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'notifications' })
export class Notifications {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'post_id' })
    postId: number;

    @Column({ name: 'content' })
    content: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Timestamp;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
