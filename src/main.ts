import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuredLoggerMiddleware } from './common/middlewares/logger.middleware';
import { configuredValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(configuredValidationPipe);
    app.use(configuredLoggerMiddleware);
    app.setGlobalPrefix('prod');
    await app.listen(3000);
}
// tslint:disable-next-line: no-floating-promises
bootstrap();
