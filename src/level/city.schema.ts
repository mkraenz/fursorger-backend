import { IsDefined, IsNumber, IsString, Max, Min } from 'class-validator';
import { ICity } from './level.schema';

export class CitySchema {
    @IsString()
    @IsDefined()
    public name!: string;

    @IsNumber()
    @Min(1)
    public stock!: number;

    @IsNumber()
    public production!: number;

    @IsNumber()
    @Max(2000)
    public x!: number;

    @IsNumber()
    @Min(0)
    @Max(2000)
    public y!: number;

    constructor(city: ICity) {
        this.name = city.name;
        this.production = city.production;
        this.stock = city.stock;
        this.x = city.x;
        this.y = city.y;
    }
}
