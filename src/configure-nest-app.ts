import { INestApplication } from '@nestjs/common';
import * as helmet from 'helmet';
import { configuredLoggerMiddleware } from './common/middlewares/logger.middleware';
import { configuredValidationPipe } from './common/pipes/validation.pipe';

export const configureNestApp = (app: INestApplication) => {
    app.use(helmet());
    app.useGlobalPipes(configuredValidationPipe);
    app.use(configuredLoggerMiddleware);
    app.enableCors();
    app.setGlobalPrefix('prod');
};
