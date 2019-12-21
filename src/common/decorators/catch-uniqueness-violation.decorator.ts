import { ConflictException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

// postgres specific variables
const duplicateErrorRegex = /^duplicate key value violates unique constraint/;

export const catchUniquessViolation: MethodDecorator = (
    target,
    key,
    descriptor: TypedPropertyDescriptor<any>,
) => {
    const originalMethod = descriptor.value;
    descriptor.value = new Proxy(originalMethod, {
        apply: async (targetX, thisArg, args) => {
            try {
                const result = await targetX.apply(thisArg, args);
                return result;
            } catch (e) {
                const error: Error = e;
                if (
                    error.name === QueryFailedError.name &&
                    duplicateErrorRegex.test(error.message)
                ) {
                    throw new ConflictException((error as any).detail);
                }
                throw e;
            }
        },
    });
    return descriptor;
};
