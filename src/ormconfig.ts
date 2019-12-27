// You can load you .env file here synchronously using dotenv package (not installed here),
import { ConnectionOptions } from 'typeorm';
import { numberOrFalse } from './common/utils/numberOrFalse';
// WARNING: DO NOT REMOVE THIS LINE! Needed so that serverless-typescript-plugin includes the migrations in output dir
import * as migrations from './migrations'; // DO NOT REMOVE!

const env = process.env;
const runtime = env.RUNTIME || 'dev';
const username = env.POSTGRES_USER || 'root';
const password = env.POSTGRES_PASSWORD || 'password';
const host = env.POSTGRES_HOST || 'localhost';
const port = numberOrFalse(env.POSTGRES_PORT) || 5432;
const database = env.POSTGRES_DATABASE_NAME || 'mydb';

console.log(`>>>>>>>>>>>>>>>> Running on runtime: ${runtime} <<<<<<<<<<<<<<<<`);

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    // We are using migrations, synchronize should be set to false.
    synchronize: false,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: true,
    // allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    cli: {
        migrationsDir: 'src/migrations',
    },
};

export = config;
