import { IsArray, IsInt } from 'class-validator';

export class LevelSchema {

    @IsArray()
    public cities!: ICity[];

    @IsArray()
    public travelPaths!: IPath;

    @IsInt()
    public playerStock!: number;
    
    constructor(level?: ILevel) {
        this.cities = level?.cities as any
        this.playerStock = level?.playerStock as any;
        this.travelPaths = level?.playerStock as any
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

interface IPath {
    first: string;
    second: string;
}
