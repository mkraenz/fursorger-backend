import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { City } from './level/entities/city.entity';
import { LevelWithMetadata } from './level/entities/level-with-metadata.entity';
import { Level } from './level/entities/level.entity';
import { LevelModule } from './level/level.module';
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
            entities: [Photo, LevelWithMetadata, Level, City],
            synchronize: true,
        }),
        PhotoModule,
        LevelModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
