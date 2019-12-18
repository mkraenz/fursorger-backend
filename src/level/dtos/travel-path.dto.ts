import { IsDefined, IsString } from 'class-validator';

export class TravelPathDto {
    @IsString()
    @IsDefined()
    public readonly first!: string;

    @IsString()
    @IsDefined()
    public readonly second!: string;
}
