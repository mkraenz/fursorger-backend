import { ValidationPipe } from '@nestjs/common';

export const configuredValidationPipe = new ValidationPipe({
    transform: true,
    forbidUnknownValues: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    skipMissingProperties: false,
    validationError: {
        target: false,
        value: false,
    },
});
