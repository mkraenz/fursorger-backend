import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelWithMetadata } from './entities/level-with-metadata.entity';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';

@Module({
    imports: [TypeOrmModule.forFeature([LevelWithMetadata])],
    controllers: [LevelsController],
    providers: [LevelsService],
})
export class LevelsModule {}
