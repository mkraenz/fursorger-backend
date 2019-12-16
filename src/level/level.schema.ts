import { ArrayNotEmpty, IsArray, IsInt, ValidateNested } from 'class-validator';
import { CitySchema } from './city.schema';
import { TravelPathSchema } from './travel-path.schema copy';

export class LevelSchema {

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    public cities!: CitySchema[];
    
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    public travelPaths!: TravelPathSchema[];

    @IsInt()
    public playerStock!: number;
    
    constructor(level?: ILevel) {
        this.cities = level?.cities.map(city => new CitySchema(city)) as any
        this.travelPaths = level?.travelPaths.map(path => new TravelPathSchema(path)) as any
        this.playerStock = level?.playerStock as any;
    }
}

export interface ILevel {
    cities: ICity[];
    travelPaths: IPath[];
    playerStock: number;
}

export interface ICity {
    name: string;
    stock: number;
    production: number;
    x: number;
    y: number;
}

export interface IPath {
    first: string;
    second: string;
}
