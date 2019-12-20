import { ConflictException } from '@nestjs/common';

// postgres specific variables
const duplicateErrorRegex = /^duplicate key value violates unique constraint/;
const uniquenessViolationError = 'QueryFailedError';

export function catchUniquenessViolationOf(field: string) {
    return async (
        decoratedMethod: () => Promise<unknown>,
    ): Promise<unknown> => {
        try {
            return await decoratedMethod();
        } catch (e) {
            const error: Error = e;
            if (
                error.name === uniquenessViolationError &&
                duplicateErrorRegex.test(error.message)
            ) {
                throw new ConflictException(`${field} already in use`);
            }
        }
    };
}
