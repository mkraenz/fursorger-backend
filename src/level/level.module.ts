import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelController } from './level.controller';
import { Level } from './level.entity';
import { LevelService } from './level.service';

@Module({
    imports: [TypeOrmModule.forFeature([Level])],
    controllers: [LevelController],
    providers: [LevelService],
})
export class LevelModule {}
