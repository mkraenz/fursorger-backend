import {
    Body,
    Controller,
    HttpException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { catchUniquessViolation } from '../common/decorators/catch-uniqueness-violation.decorator';
import { logInput } from '../common/decorators/log-input.decorator';
import { logOutput } from '../common/decorators/log-output.decorator';
import { CreateLevelDto } from './dtos/create-level.dto';
import { UpdateLevelDto } from './dtos/update-level.dto';
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

    @Post()
    @catchUniquessViolation
    @logInput
    @logOutput
    public async create(@Body() level: CreateLevelDto) {
        return this.service.create(level);
    }

    @Patch(':id')
    @catchUniquessViolation
    @logInput
    public async update(@Param('id') id: number, @Body() body: UpdateLevelDto) {
        let result: LevelWithMetadata;
        if (body.like) {
            result = await this.service.like(id);
        }
        if (body.download) {
            result = await this.service.increaseDownloads(id);
        }
        if (!result) {
            return new HttpException(
                'Did not specify a supported updated. Specify some of "download" or "like".',
                501,
            );
        }
        return result;
    }
}
