import { Type } from 'class-transformer';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { LevelWithMetadata } from './level-with-metadata.entity';
import { TravelPath } from './travel-path.entity';

@Entity()
export class Level {
    @PrimaryGeneratedColumn()
    public id!: number;

    @OneToMany(() => City, city => city.level, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    @Type(() => City)
    public cities!: City[];

    @OneToMany(() => TravelPath, path => path.level, {
        cascade: true,
        eager: true,
    })
    @Type(() => TravelPath)
    public travelPaths!: TravelPath[];

    @Column('int')
    public playerStock!: number;

    @OneToOne(() => LevelWithMetadata, metadata => metadata.level)
    public metadata!: LevelWithMetadata;
}
