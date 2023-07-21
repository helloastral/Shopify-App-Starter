# Shopify App Starter by Storetools

This is a fork of [App Starter Nest](https://github.com/storetools/App-Starter-Nest) using the `@shopify/shopify-app-express` package. This cleans up the code significantly.
But we loose some functionality like being able to plug into the auth check functions to add our own logic.

## Getting Started

1. Clone this repo
2. Copy `.env.example` to `.env` and fill in the values
3. Run `yarn`
4. Run `yarn migrate:dev`
5. Run `yarn dev`

## Deploying

Look at the Dockerfile for the commands to run. You'll need to set the environment variables in your deployment environment.

## Software Used

- Shopify App CLI
- NestJS
- PrismaJS
- Postgres
- Swagger
