import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateLevelDto } from './dtos/create-level.dto';
import { LevelWithMetadata } from './entities/level-with-metadata.entity';
import { LevelService } from './level.service';

@Crud({
    model: { type: LevelWithMetadata },
    routes: {
        exclude: [
            'createManyBase',
            'createOneBase',
            'replaceOneBase',
            'updateOneBase',
        ],
    },
    query: {
        maxLimit: 25,
        join: {
            // must match the fields of level with metadata entity
            level: { eager: true },
            // must match the fields of level entity
            'level.cities': { eager: true },
            'level.travelPaths': { eager: true },
        },
    },
})
@Controller('level')
export class LevelController implements CrudController<LevelWithMetadata> {
    constructor(public readonly service: LevelService) {}

    @Get('create-random')
    public createRandom() {
        return this.service.createRandomLevel();
    }

    @Post()
    public async create(@Body() level: CreateLevelDto) {
        try {
            const result = await this.service.create(level);
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
