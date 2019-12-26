import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateLevelDto } from './dtos/create-level.dto';
import { LevelWithMetadata } from './entities/level-with-metadata.entity';

@Injectable()
export class LevelService extends TypeOrmCrudService<LevelWithMetadata> {
    constructor(
        @InjectRepository(LevelWithMetadata)
        private levelWithMetadataRepository: Repository<LevelWithMetadata>,
    ) {
        super(levelWithMetadataRepository);
    }

    public create(levelDto: CreateLevelDto) {
        const levelWithMetadata = plainToClass(LevelWithMetadata, levelDto);
        return this.levelWithMetadataRepository.save(levelWithMetadata);
    }
}
