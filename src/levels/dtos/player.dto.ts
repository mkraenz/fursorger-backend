import { IsDefined, IsInt, IsString } from 'class-validator';

export class PlayerDto {
    @IsString()
    @IsDefined()
    public readonly location!: string;

    @IsInt()
    public readonly stock!: number;
}
