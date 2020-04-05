import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsDefined,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { CityDto } from './city.dto';
import { PlayerDto } from './player.dto';
import { TravelPathDto } from './travel-path.dto';

export class LevelDto {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CityDto)
    public readonly cities!: CityDto[];

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => TravelPathDto)
    public readonly travelPaths!: TravelPathDto[];

    @IsObject()
    @IsDefined()
    @Type(() => PlayerDto)
    public readonly player!: PlayerDto;

    @IsString()
    @IsDefined()
    @IsOptional()
    public background?: string;
}
