import { Controller, Get } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Get('create')
    createPhoto() {
        return this.photoService.upsertRandom();
    }

    @Get()
    findAll() {
        return this.photoService.findAll();
    }
}
