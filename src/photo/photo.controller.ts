import { Controller, Get } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Get('create')
    public createPhoto() {
        return this.photoService.upsertRandom();
    }

    @Get()
    public findAll() {
        return this.photoService.findAll();
    }
}
