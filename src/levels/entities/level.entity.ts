import { Type } from 'class-transformer';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    RelationOptions,
} from 'typeorm';
import { City } from './city.entity';
import { LevelWithMetadata } from './level-with-metadata.entity';
import { Player } from './player.entity';
import { TravelPath } from './travel-path.entity';

const options: Readonly<RelationOptions> = Object.freeze({
    cascade: true,
    eager: true,
});
const pickLevel = (x: { level: Level }) => x.level;

@Entity()
export class Level {
    @PrimaryGeneratedColumn()
    public id!: number;

    @OneToMany(() => City, pickLevel, options)
    @JoinColumn()
    @Type(() => City)
    public cities!: City[];

    @OneToMany(() => TravelPath, pickLevel, options)
    @Type(() => TravelPath)
    public travelPaths!: TravelPath[];

    @OneToOne(() => Player, pickLevel, options)
    @Type(() => Player)
    public player!: Player;

    @Column({ default: 'default-background' })
    public background!: string;

    @OneToOne(() => LevelWithMetadata, pickLevel)
    public metadata!: LevelWithMetadata;
}
