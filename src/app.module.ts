import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Photo } from './photo/photo.entity';
import { PhotoModule } from './photo/photo.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 54320,
            username: 'root',
            password: 'password',
            database: 'mydb',
            entities: [Photo],
            synchronize: true,
        }),
        PhotoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}