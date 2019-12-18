import { Type } from 'class-transformer';
import { IsString, Length, ValidateNested } from 'class-validator';
import { LevelDto } from './level.dto';

export class CreateLevelDto {
    @IsString()
    @Length(5, 70)
    public readonly name!: string;

    @ValidateNested()
    @Type(() => LevelDto)
    public readonly level!: LevelDto;
}
