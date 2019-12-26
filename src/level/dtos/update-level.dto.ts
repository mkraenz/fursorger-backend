import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateLevelDto {
    @IsOptional()
    @IsBoolean()
    public like: boolean;

    @IsOptional()
    @IsBoolean()
    public download: boolean;
}
