import { IsDefined, IsString } from 'class-validator';
import { IPath } from './level.schema';

export class TravelPathSchema {
    @IsString()
    @IsDefined()
    public first!: string;

    @IsString()
    @IsDefined()
    public second!: string;

    constructor(path: IPath) {
        this.first = path.first;
        this.second = path.second;
    }
}
