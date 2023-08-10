## Preview
- Project designed from scratch (without using any prepared boilerplates or templates)
- Using the basic features and techniques of NestJS
- Two docker-compose files for DEV and for PROD
- Project now is available in the "Production"

## Before installing

Replace .env.example file with the .env file, and put values there
```bash
$ .env.example --> .env
```

## Running the app

```bash
# run DEV docker-compose
$ make dev

# run PROD docker-compose
$ make prod

# stop Docker containers
$ make stop
```

## Migrations

```bash
# Generate a migration
$ npm run migration:generate

# Run migrations
$ npm run migration:run

# Revert last migration
$ npm run migration:revert
```

## Swagger (API docs)

> /api/docs