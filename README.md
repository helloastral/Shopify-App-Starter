> Although this works we recommend you use our remix-nest starter for new apps
> See our latest starter here: https://github.com/helloastral/Astral-App


<div align="center">
  <h1>App Starter By Storetools 🔮</h1>
  <p>
    The Fast-Track to Flawless Shopify Apps ✨
  </p>
</div>

![Shopify App Starter](https://github.com/storetools/Shopify-App-Starter/assets/29296982/b8c304fa-1894-423b-952d-190d111b6c76)

This is the template we use at Storetools to build our Shopify apps.

This is a fork of [App Starter Nest](https://github.com/storetools/App-Starter-Nest) we use but now using the `@shopify/shopify-app-express` package.

## Getting Started

1. Clone this repo

```sh
npx degit git@github.com:storetools/Shopify-App-Starter.git app-name
```

2. Copy `.env.example` to `.env` and fill in the values
3. Run `yarn`
4. Run `yarn migrate:dev`
5. Run `yarn dev`

## Notes

### Install packages

This is a yarn workspace so when you want to install a package run this:

```sh
# Client
yarn workspace client add package-name
# Or
cd client
yarn add package-name

# Server
yarn workspace server add package-name
# Or
cd server
yarn add package-name

```

## Deploying

Checkout both `nixpacks.toml` and `Dockerfile`

- nixpacks.toml: You can deploy it to Railway.app directly
- Dockerfile: Deploy to any host using Docker. Eg: Render, Heroku, etc

Look at the Dockerfile for the commands to run. You'll need to set the environment variables in your deployment environment.

## Features

### 1. Swagger

Visit `/tools/swagger` to see swagger. The API calls are authenticated automatically when used within the app embed

![image](https://github.com/storetools/Shopify-App-Starter/assets/29296982/84dda09a-f0a1-4a54-af97-e3425d0cc7d5)

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

Run development server using shopify CLI without having to update any URLs

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

## Software Used

- Shopify App CLI
- NestJS
- PrismaJS
- Tailwind CSS
- Postgres
- Swagger

## FAQ

### Can I build Shopify Extensions?

Yes, Just generate the extension using the Shopify CLI like how you would with the other templates. It will live inside an `extensions` folder created by shopify. Dev server will work out of the box.

### Does HMR work on development server?

Yes

### Typescript?

Yes

### Tests?

You can write tests as you would on Nest js: https://docs.nestjs.com/fundamentals/testing

Checkout our apps at [storetools.io](https://storetools.io)

## Important

Make sure you add in your `shopify.app.xyz.toml` the following. So the server always start first for vite proxy to work properly.

```toml
web_directories = [ "server", "client" ]
```
