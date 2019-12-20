import { Body, Controller, Get, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { catchUniquenessViolationOf } from '../common/decorators/catch-uniqueness-violation.decorator';
import { proxy } from '../common/decorators/proxy.decorator';
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
    @proxy(catchUniquenessViolationOf('name'))
    public async create(@Body() level: CreateLevelDto) {
        return this.service.create(level);
    }
}
