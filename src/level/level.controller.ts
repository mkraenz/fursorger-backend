import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { CreateLevelDto } from './create-level.dto';
import { LevelService } from './level.service';

@Controller('level')
export class LevelController {
    constructor(private readonly levelService: LevelService) {}

    @Get()
    public findAll() {
        return this.levelService.findAll();
    }

    @Get('create-random')
    public createRandom() {
        return this.levelService.createRandomLevel();
    }

    @Post()
    public async create(@Body() level: CreateLevelDto) {
        try {
            const result = await this.levelService.create(level);
            return result;
        } catch (e) {
            const error: Error = e;
            const duplicateErrorRegex = /^duplicate key value violates unique constraint/;
            if (duplicateErrorRegex.test(error.message)) {
                throw new HttpException(
                    {
                        status: HttpStatus.FORBIDDEN,
                        error: 'Name already used',
                    },
                    HttpStatus.CONFLICT,
                );
            }
        }
    }
}
