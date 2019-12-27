import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateLevelDto } from './dtos/create-level.dto';
import { LevelWithMetadata } from './entities/level-with-metadata.entity';

@Injectable()
export class LevelsService extends TypeOrmCrudService<LevelWithMetadata> {
    constructor(
        @InjectRepository(LevelWithMetadata)
        private repository: Repository<LevelWithMetadata>,
    ) {
        super(repository);
    }

    public async like(id: number) {
        return this.increaseCounter(id, 'likes');
    }

    public async increaseDownloads(id: number) {
        return this.increaseCounter(id, 'downloads');
    }

    public create(levelDto: CreateLevelDto) {
        const levelWithMetadata = plainToClass(LevelWithMetadata, levelDto);
        return this.repository.save(levelWithMetadata);
    }

    private async increaseCounter(
        id: number,
        field: keyof LevelWithMetadata & ('likes' | 'downloads'),
    ) {
        const levelsWithMetadata = await this.repository.findByIds([id]);
        if (!levelsWithMetadata.length) {
            this.throwNotFoundException(`LevelWithMetadata with id ${id}`);
        }
        levelsWithMetadata[0][field]++;
        return this.repository.save(levelsWithMetadata[0]);
    }
}
