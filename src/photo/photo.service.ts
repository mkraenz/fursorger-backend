import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
    ) {}

    findAll() {
        return this.photoRepository.find();
    }

    upsertRandom() {
        return this.photoRepository.save({
            name: 'lovely sunset',
            description: 'A lovely sunset I saw on March 21 last year.',
            filename: 'lovelysunset.jpg',
            isPublished: true,
            views: 123515,
        });
    }
}
