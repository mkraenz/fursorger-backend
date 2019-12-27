import { IsDefined, IsNumber, IsString, Max, Min } from 'class-validator';

export class CityDto {
    @IsString()
    @IsDefined()
    public readonly name!: string;

    @IsNumber()
    @Min(0)
    public readonly stock!: number;

    @IsNumber()
    public readonly production!: number;

    @IsNumber()
    @Max(2000)
    public readonly x!: number;

    @IsNumber()
    @Min(0)
    @Max(2000)
    public readonly y!: number;
}
