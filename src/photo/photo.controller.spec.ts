import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

describe('Photo Controller', () => {
    let controller: PhotoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PhotoController],
            providers: [
                PhotoService,
                {
                    provide: getRepositoryToken(Photo),
                    useValue: {},
                },
            ],
        }).compile();

        controller = module.get<PhotoController>(PhotoController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
