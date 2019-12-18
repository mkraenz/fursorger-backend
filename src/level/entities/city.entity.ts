import { IsDefined, IsNumber, IsString, Max, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from './level.entity';

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(() => Level, level => level.cities)
    public level!: Level;

    @IsString()
    @IsDefined()
    public name!: string;

    @Column('int')
    @IsNumber()
    @Min(1)
    public stock!: number;

    @Column('int')
    public production!: number;

    @Column('int')
    @IsNumber()
    @Max(2000)
    public x!: number;

    @Column('int')
    @IsNumber()
    @Min(0)
    @Max(2000)
    public y!: number;
}
