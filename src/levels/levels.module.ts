import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { LevelWithMetadata } from './entities/level-with-metadata.entity';
import { Level } from './entities/level.entity';
import { TravelPath } from './entities/travel-path.entity';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';

@Module({
    imports: [TypeOrmModule.forFeature([LevelWithMetadata])],
    controllers: [LevelsController],
    providers: [LevelsService],
})
export class LevelsModule {
    public static entities = [LevelWithMetadata, Level, City, TravelPath];
}
