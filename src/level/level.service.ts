import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateLevelDto } from './dtos/create-level.dto';
import { LevelWithMetadata } from './entities/level-with-metadata.entity';

@Injectable()
export class LevelService {
    constructor(
        @InjectRepository(LevelWithMetadata)
        private levelWithMetadataRepository: Repository<LevelWithMetadata>,
    ) {}

    public async createRandomLevel() {
        const levelDataWithMetaData = {
            level: levelData,
            name: v4(),
        };
        const enrichedLevel = plainToClass(
            LevelWithMetadata,
            levelDataWithMetaData,
        );

        return this.levelWithMetadataRepository.save(enrichedLevel);
    }

    public create(levelDto: CreateLevelDto) {
        const levelWithMetadata = plainToClass(LevelWithMetadata, levelDto);
        return this.levelWithMetadataRepository.save(levelWithMetadata);
    }

    public findAll() {
        return this.levelWithMetadataRepository.find();
    }
}

const levelData = {
    cities: [
        {
            name: 'Athens',
            stock: 6,
            production: -1,
            x: 150,
            y: 100,
        },
        { name: 'Bern', stock: 6, production: -1, x: 500, y: 200 },
        { name: 'Cairo', stock: 7, production: -1, x: 150, y: 300 },
        {
            name: 'Dublin',
            stock: 8,
            production: -1,
            x: 500,
            y: 400,
        },
    ],
    travelPaths: [
        { first: 'Athens', second: 'Bern' },
        { first: 'Dublin', second: 'Cairo' },
        { first: 'Bern', second: 'Cairo' },
        { first: 'Dublin', second: 'Athens' },
    ],
    playerStock: 3,
};
