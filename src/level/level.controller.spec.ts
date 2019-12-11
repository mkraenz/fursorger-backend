import { Test, TestingModule } from '@nestjs/testing';
import { LevelController } from './level.controller';

describe('Level Controller', () => {
    let controller: LevelController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LevelController],
        }).compile();

        controller = module.get<LevelController>(LevelController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
