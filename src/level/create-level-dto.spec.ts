import { Validate, validate } from 'class-validator';
import { IsSerializedLevel } from './is-serialized-level.validator';

class ValidationSchema {
    @Validate(IsSerializedLevel, {
        message: 'Deserialized levelJson is not a valid level.',
    })
    public level?: string;
}

describe('IsSerializedLevel.validate()', () => {
    const serializedLevel =
        '{"cities":[{"name":"Athens","stock":6,"production":-1,"x":150,"y":100},{"name":"Bern","stock":6,"production":-1,"x":500,"y":200},{"name":"Cairo","stock":7,"production":-1,"x":150,"y":300},{"name":"Dublin","stock":8,"production":-1,"x":500,"y":400}],"travelPaths":[{"first":"Athens","second":"Bern"},{"first":"Dublin","second":"Cairo"},{"first":"Bern","second":"Cairo"},{"first":"Dublin","second":"Athens"}],"playerStock":3}';

    it('should resolve with errors if input is not a json', async () => {
        const maybeLevel = new ValidationSchema();
        maybeLevel.level = 'not even a json';

        const result = await validate(maybeLevel);

        expect(result).toEqual([
            {
                children: [],
                constraints: {
                    IsSerializedLevel:
                        'Deserialized levelJson is not a valid level.',
                },
                property: 'level',
                target: { level: 'not even a json' },
                value: 'not even a json',
            },
        ]);
    });

    it('should resolve without errors if matching the level schema but everything empty', async () => {
        const maybeLevel = new ValidationSchema();
        maybeLevel.level = '{"cities":[],"travelPaths":[],"playerStock":1}';

        const result = await validate(maybeLevel);

        expect(result).toEqual([]);
    });

    it('should resolve without errors if matching the level schema', async () => {
        const maybeLevel = new ValidationSchema();
        maybeLevel.level = serializedLevel;

        const result = await validate(maybeLevel);

        expect(result).toEqual([]);
    });

    it('resolves without errors if matching the level schema but cities are not cities | buggy', async () => {
        const maybeLevel = new ValidationSchema();
        maybeLevel.level =
            '{"cities":[{"anything":"is valid even if it should not"}],"travelPaths":[],"playerStock":1}';

        const result = await validate(maybeLevel);

        expect(result).toEqual([]);
    });
});
