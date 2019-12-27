import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from './level.entity';

@Entity()
export class TravelPath {
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(() => Level, level => level.travelPaths)
    public level!: Level;

    @Column()
    public first!: string;

    @Column()
    public second!: string;
}
