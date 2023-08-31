# Shopify App Starter by Storetools

![Frame 5](https://github.com/storetools/shopify-app-starter/assets/29296982/ff753124-10b2-4748-b7f2-03b030c3699d)


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
- Tailwind CSS
- Postgres
- Swagger

## Features

### 1. Swagger

Visit `/tools/swagger` to see swagger. The API calls are authenticated automatically when used within the app embed

<img width="1511" alt="image" src="https://github.com/storetools/shopify-app-starter/assets/29296982/d82f1efd-048a-4ec1-9de4-5844e160e93b">

### 2. Tailwind

Tailwind CSS works out of the box

```html
<h1
  className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-red-600 mb-5"
>
  Products
</h1>
```

### 3. Shopify CLI

Run development server using shopify CLI without having to update any URLS

```sh
yarn dev
```

### 4. useApi hook

Use the `useApi` hook to fetch data which sends authenticated requests to the nest js BE

```ts
const api = useApi();

const { data } = useQuery(["products"], () => {
  return api.get(`/products`);
});
```

### 5. @ShopSession() and @ShopClient() Nest Decorators

Use the `@ShopSession()` to fetch the session from the the request
Use `ShopClient(type) client` to get a rest or a graphql client in the controller

```ts
@Get()
async fetchProducts(@ShopSession() session) {
  const products = await this.productService.fetchProducts(session);
  return products?.data || [];
}

@Get()
async fetchProducts(@ShopClient('gql') gqlClient) {
  // use client to fetch
}
```
