import { Validate, validate } from 'class-validator';
import { IsSerializedLevel } from './is-serialized-level.validator';

class ValidationSchema {
    @Validate(IsSerializedLevel, {
        message: 'Deserialized levelJson is not a valid level',
    })
    public level?: string;
}

describe('IsSerializedLevel.validate()', () => {
    const serializedLevel =
        '{"cities":[{"name":"Athens","stock":6,"production":-1,"x":150,"y":100},{"name":"Bern","stock":6,"production":-1,"x":500,"y":200},{"name":"Cairo","stock":7,"production":-1,"x":150,"y":300},{"name":"Dublin","stock":8,"production":-1,"x":500,"y":400}],"travelPaths":[{"first":"Athens","second":"Bern"},{"first":"Dublin","second":"Cairo"},{"first":"Bern","second":"Cairo"},{"first":"Dublin","second":"Athens"}],"playerStock":3}';
    const validTravelPath = '{"first":"x","second":"y"}';
    const validCity =
        '{"name":"Athens","stock":6,"production":-1,"x":150,"y":100}';

    it('should resolve with errors if input is not a json', async () => {
        const maybeLevel = new ValidationSchema();
        maybeLevel.level = 'not even a json';

        const result = await validate(maybeLevel);

        expect(result).toHaveLength(1);
        expect(result[0].value).toBe('not even a json');
        expect(result[0].property).toBe('level');
        expect(result[0].constraints).toEqual({
            IsSerializedLevel: 'Deserialized levelJson is not a valid level',
        });
    });

    it('should resolve without errors if matching the level schema but everything empty', async () => {
        const maybeLevel = new ValidationSchema();
        maybeLevel.level = `{"cities":[${validCity}],"travelPaths":[${validTravelPath}],"playerStock":1}`;

        const result = await validate(maybeLevel);

        expect(result).toEqual([]);
    });

    it('should resolve without errors if matching the level schema', async () => {
        const maybeLevel = new ValidationSchema();
        maybeLevel.level = serializedLevel;

        const result = await validate(maybeLevel);

        expect(result).toEqual([]);
    });

    it('should resolve with errors if matching the level schema but cities are not valid', async () => {
        const maybeLevel = new ValidationSchema();
        maybeLevel.level = `{"cities":[{"x":"should be a number"}],"travelPaths":[${validTravelPath}],"playerStock":1}`;

        const result = await validate(maybeLevel);

        expect(result).toHaveLength(1);
        expect(result[0].value).toBe(maybeLevel.level);
        expect(result[0].property).toBe('level');
        expect(result[0].constraints).toEqual({
            IsSerializedLevel: 'Deserialized levelJson is not a valid level',
        });
    });

    it('should resolve with errors if matching the level schema but cities empty', async () => {
        const maybeLevel = new ValidationSchema();
        maybeLevel.level = `{"cities":[],"travelPaths":[${validTravelPath}],"playerStock":1}`;

        const result = await validate(maybeLevel);

        expect(result).toHaveLength(1);
        expect(result[0].value).toBe(maybeLevel.level);
        expect(result[0].property).toBe('level');
        expect(result[0].constraints).toEqual({
            IsSerializedLevel: 'Deserialized levelJson is not a valid level',
        });
    });

    it('should resolve with errors if matching the level schema but travelpaths empty', async () => {
        const maybeLevel = new ValidationSchema();
        maybeLevel.level = `{"cities":[${validCity}],"travelPaths":[],"playerStock":1}`;

        const result = await validate(maybeLevel);

        expect(result).toHaveLength(1);
        expect(result[0].value).toBe(maybeLevel.level);
        expect(result[0].property).toBe('level');
        expect(result[0].constraints).toEqual({
            IsSerializedLevel: 'Deserialized levelJson is not a valid level',
        });
    });

    it('should resolve with errors if matching the level schema but travelpaths are not valid', async () => {
        const invalidPath = '{"first":123,"second":"Athens"}';
        const maybeLevel = new ValidationSchema();
        maybeLevel.level = `{"cities":[${validCity}],"travelPaths":[${invalidPath}],"playerStock":1}`;

        const result = await validate(maybeLevel);

        expect(result).toHaveLength(1);
        expect(result[0].value).toBe(maybeLevel.level);
        expect(result[0].property).toBe('level');
        expect(result[0].constraints).toEqual({
            IsSerializedLevel: 'Deserialized levelJson is not a valid level',
        });
    });
});
