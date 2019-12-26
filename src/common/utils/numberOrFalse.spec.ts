import { numberOrFalse } from './numberOrFalse';

describe('numberOrFalse()', () => {
    it('returns int for int string', () => {
        const val = '5';

        const result = numberOrFalse(val);

        expect(result).toEqual(5);
    });

    it('returns int for int string', () => {
        const val = '5.0';

        const result = numberOrFalse(val);

        expect(result).toEqual(5);
    });

    it('returns undefined for non-int number string', () => {
        const val = '5.12';

        const result = numberOrFalse(val);

        expect(result).toEqual(false);
    });

    it('returns undefined for non-number string', () => {
        const val = 'jesdasd';

        const result = numberOrFalse(val);

        expect(result).toEqual(false);
    });
});
