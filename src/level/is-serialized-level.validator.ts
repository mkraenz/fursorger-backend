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
            const validationErrors = await validate(level);
            // TODO up to here we have perfect error messages for everything. Consider sending the errors instead
            const result = validationErrors.length === 0 ? true : false;
            return Promise.resolve(result);
        } catch (error) {
            return Promise.resolve(false);
        }
    }
}
