import { Type } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import { Level } from './level.entity';

@Entity()
export class LevelWithMetadata {
    @Column({ unique: true })
    public name!: string;

    @OneToOne(() => Level, level => level.metadata, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    @Type(() => Level)
    public level!: Level;

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column('int', { default: 0 })
    public likes!: number;

    @Column('int', { default: 0 })
    public downloads!: number;

    @CreateDateColumn()
    public created!: Date;

    @UpdateDateColumn()
    public lastUpdate!: Date;

    @VersionColumn()
    public version!: number;

    @Column({ nullable: true })
    public uploadedUser?: string;
}
