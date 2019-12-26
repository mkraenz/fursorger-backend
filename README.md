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

## Deployment

`Serverless` handles the deployment to AWS.

-   [Serverless Dashboard](https://dashboard.serverless.com/tenants/prosingularity/applications/fursorger-backend/overview/service)

For all configs, see [`.env.prod`](./.env.prod) or password manager.

```bash
# NOTE: even :test uses the production database! So don't do write operations
npm run deploy:test
google-chrome localhost:3000/prod/
google-chrome localhost:3000/level/

npm run deploy:prod
google-chrome <aws-provided-api>/prod/prod/
google-chrome <aws-provided-api>/prod/prod/level
```

### Debugging

Serverless: For debugging logs, run the serverless command again after setting the "SLS_DEBUG=\*" environment variable.
