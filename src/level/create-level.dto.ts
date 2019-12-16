import { IsString, Length, Validate } from 'class-validator';
import { IsSerializedLevel } from './is-serialized-level.validator';

export class CreateLevelDto {
    @IsString()
    @Length(5, 70)
    public readonly name!: string;

    @IsString()
    @Length(20, 10000)
    @Validate(IsSerializedLevel, {
        message: 'Deserialized levelJson is not a valid level.',
    })
    public readonly levelJson!: string;
}
