import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureNestApp } from './configure-nest-app';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    configureNestApp(app);
    await app.listen(3140);
}
// tslint:disable-next-line: no-floating-promises
bootstrap();
