import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, ValidateNested } from 'class-validator';
import { CityDto } from './city.dto';
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

    @IsInt()
    public readonly playerStock!: number;
}
