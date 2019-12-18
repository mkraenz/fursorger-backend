import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { LevelWithMetadata } from './entities/level-with-metadata.entity';
import { Level } from './entities/level.entity';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';

@Module({
    imports: [TypeOrmModule.forFeature([LevelWithMetadata, Level, City])],
    controllers: [LevelController],
    providers: [LevelService],
})
export class LevelModule {}
