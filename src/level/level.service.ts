import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLevelDto } from './create-level.dto';
import { Level } from './level.entity';

@Injectable()
export class LevelService {
    constructor(
        @InjectRepository(Level)
        private levelRepository: Repository<Level>,
    ) {}

    public createRandomLevel() {
        const minifiedLevel = JSON.stringify(JSON.parse(levelData));
        return this.levelRepository.save({
            levelJson: minifiedLevel,
            name: 'Basic 4 Cities',
        });
    }

    public create(level: CreateLevelDto) {
        return this.levelRepository.save({
            levelJson: level.levelJson,
            name: level.name,
        });
    }

    public findAll() {
        return this.levelRepository.find();
    }
}

const levelData = JSON.stringify(
    {
        cities: [
            { name: 'Athens', stock: 6, production: -1, x: 150, y: 100 },
            { name: 'Bern', stock: 6, production: -1, x: 500, y: 200 },
            { name: 'Cairo', stock: 7, production: -1, x: 150, y: 300 },
            { name: 'Dublin', stock: 8, production: -1, x: 500, y: 400 },
        ],
        travelPaths: [
            { first: 'Athens', second: 'Bern' },
            { first: 'Dublin', second: 'Cairo' },
            { first: 'Bern', second: 'Cairo' },
            { first: 'Dublin', second: 'Athens' },
        ],
        playerStock: 3,
    },
    null,
    4,
);
