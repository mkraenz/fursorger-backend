import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelsModule } from './levels/levels.module';
import * as ormconfig from './ormconfig';
import { UsersModule } from './users/users.module';

@Module({
    imports: [TypeOrmModule.forRoot(ormconfig), LevelsModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
