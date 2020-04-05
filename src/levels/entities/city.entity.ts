import { IsDefined, IsInt, IsString, Max, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from './level.entity';

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(() => Level, level => level.cities)
    public level!: Level;

    @Column()
    @IsString()
    @IsDefined()
    public name!: string;

    @Column('int')
    @IsInt()
    @Min(1)
    public stock!: number;

    @Column('int')
    public production!: number;

    @Column('int')
    @IsInt()
    @Max(2000)
    public x!: number;

    @Column('int')
    @IsInt()
    @Min(0)
    @Max(2000)
    public y!: number;
}
