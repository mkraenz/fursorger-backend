# Fursorger backend - fursorger-backend

## all-in-one setup

```bash
npm run sanity-check
```

## Installation

```bash
npm install
```

## Running the app

```bash
npm run dev
npm run start
npm run start:prod
```

## Test

```bash
npm run test
npm run test:e2e
npm run test:cov
```

## Docker

-   [PostgreSQL](https://hub.docker.com/_/postgres)

`docker-compose up -d`

## Production

`Serverless` handles the deployment to AWS.

-   [Serverless Dashboard](https://dashboard.serverless.com/tenants/prosingularity/applications/fursorger-backend/overview/service)

For all configs, see [`.env.prod`](./.env.prod) or password manager.

```bash
# NOTE: even :test uses the production database! So don't do write operations
npm run deploy:test
google-chrome localhost:3000/prod/
google-chrome localhost:3000/prod/level/

npm run deploy:prod
google-chrome <aws-provided-api>/prod/prod/
google-chrome <aws-provided-api>/prod/prod/level
```

### Migrations

-   [Example repo Nestjs with TypeORM](https://github.com/ambroiseRabier/typeorm-nestjs-migration-example)

Configuration is done in [src/ormconfig.ts](src/ormconfig.ts).

```bash
npm run typeorm:migrate:prod <description-of-migration>
# **Important**: When creating a mutation, import it to mutations/index.ts
```

Use with caution! Usually not a necessary step. Migrations are run automatically on startup due to `migrationsRun: true`. Only if set to `false`, the command needs to be run manually. The following applies migrations to the production database.

```bash
npm run typeorm:run:prod
```

#### Examples

```bash
npm run typeorm:migrate:prod initial
npm run typeorm:migrate:prod create-user
npm run typeorm:migrate:prod levelmetadata-rename-name-to-title
```

### Debugging

Serverless: For debugging logs, run the serverless command again after setting the `export SLS_DEBUG=*` environment variable.
