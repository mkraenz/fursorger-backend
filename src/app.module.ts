import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelModule } from './level/level.module';
import { PhotoModule } from './photo/photo.module';
import { UsersModule } from './users/users.module';

const username = process.env.POSTGRES_USER || 'root';
const password = process.env.POSTGRES_PASSWORD || 'password';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 54320,
            username,
            password,
            database: 'mydb',
            entities: ['**/*.entity.js'],
            synchronize: true,
        }),
        PhotoModule,
        LevelModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
