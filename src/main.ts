import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            forbidUnknownValues: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            skipMissingProperties: false,
        }),
    );
    await app.listen(3140);
}
// tslint:disable-next-line: no-floating-promises
bootstrap();
