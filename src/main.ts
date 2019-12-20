import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuredLoggerMiddleware } from './middlewares/logger.middleware';
import { configuredValidationPipe } from './middlewares/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(configuredValidationPipe);
    app.use(configuredLoggerMiddleware);
    await app.listen(3140);
}
// tslint:disable-next-line: no-floating-promises
bootstrap();
