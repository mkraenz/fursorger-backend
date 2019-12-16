import {
    validate,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { ILevel, LevelSchema } from './level.schema';

@ValidatorConstraint({ async: true })
export class IsSerializedLevel implements ValidatorConstraintInterface {
    public async validate(levelJson: string, _: ValidationArguments) {
        try {
            const maybeLevel: ILevel = JSON.parse(levelJson);
            const level = new LevelSchema(maybeLevel);
            const validation = await validate(level);
            return Promise.resolve(!!validation.length);
        } catch (error) {
            return Promise.resolve(false);
        }
    }
}
