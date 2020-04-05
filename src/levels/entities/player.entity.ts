import { IsDefined, IsInt, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from './level.entity';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(() => Level, level => level.player)
    public level!: Level;

    @Column('int')
    @IsInt()
    public stock!: number;

    @Column()
    @IsString()
    @IsDefined()
    public location!: string;
}
