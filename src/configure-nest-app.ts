import { INestApplication } from '@nestjs/common';
import { configuredLoggerMiddleware } from './common/middlewares/logger.middleware';
import { configuredValidationPipe } from './common/pipes/validation.pipe';

export const configureNestApp = (app: INestApplication) => {
    app.useGlobalPipes(configuredValidationPipe);
    app.use(configuredLoggerMiddleware);
    app.setGlobalPrefix('prod');
};
