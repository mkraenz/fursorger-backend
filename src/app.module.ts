import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { numberOrFalse } from './common/utils/numberOrFalse';
import { LevelsModule } from './levels/levels.module';
import { UsersModule } from './users/users.module';

const env = process.env;
const runtime = env.RUNTIME || 'dev';
const username = env.POSTGRES_USER || 'root';
const password = env.POSTGRES_PASSWORD || 'password';
const host = env.POSTGRES_HOST || 'localhost';
const port = numberOrFalse(env.POSTGRES_PORT) || 54320;
const database = env.POSTGRES_DATABASE_NAME || 'mydb';
const synchronize = runtime === 'dev';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host,
            port,
            username,
            password,
            database,
            entities: [...LevelsModule.entities, ...UsersModule.entities],
            synchronize,
        }),
        LevelsModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
