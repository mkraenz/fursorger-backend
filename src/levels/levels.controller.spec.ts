import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelWithMetadata } from './entities/level-with-metadata.entity';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';

describe('Level Controller', () => {
    let controller: LevelsController;
    const mockRepository: Partial<Repository<LevelWithMetadata>> = {
        save: () => Promise.resolve([]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LevelsController],
            providers: [
                LevelsService,
                {
                    provide: getRepositoryToken(LevelWithMetadata),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        controller = module.get<LevelsController>(LevelsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create()', () => {
        it('should save to database and return database result', async () => {
            const dbResult = {
                name: 'my-name-from-db',
                id: 123,
                levelJson: 'my-level-json-from-db',
                likes: 5678,
                downloads: 999,
                created: new Date('2016'),
                lastUpdate: new Date('2017'),
                version: 1,
            };
            const spy = jest
                .spyOn(mockRepository, 'save')
                .mockImplementation(() => Promise.resolve(dbResult));

            const result = await controller.create({
                levelJson: 'my-level-json',
                name: 'my-name',
            });

            expect(result).toEqual(dbResult);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0].name).toBe('my-name');
            expect(spy.mock.calls[0][0].levelJson).toBe('my-level-json');
        });

        it('should should return a HTTP error with name-already-in-use on duplicate key error', async () => {
            jest.spyOn(mockRepository, 'save').mockImplementation(() =>
                Promise.reject(
                    new Error('duplicate key value violates unique constraint'),
                ),
            );

            const resultFn = () =>
                controller.create({
                    levelJson: 'my-level-json',
                    name: 'my-name',
                });

            try {
                await resultFn();
            } catch (error) {
                expect(error.message).toEqual({
                    error: 'Name already used',
                    status: 403,
                });
                return;
            }
            fail(); // should return from try catch
        });
    });
});
