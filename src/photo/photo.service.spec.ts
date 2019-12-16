import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
    let service: PhotoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PhotoService,
                {
                    provide: getRepositoryToken(Photo),
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<PhotoService>(PhotoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
