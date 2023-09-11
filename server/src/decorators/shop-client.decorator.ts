import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import shopify from "@/lib/shopify-app";

/**
 * This decorator is used to inject the shopify rest or gql client into a controller method. There is one arguement required.
 * Use `@ShopClient('rest') restClient` or `@ShopClient('gql') gqlClient` in your controller method. The default is gql.
 * The way we use these client differ from the way we use shopify api js. Its not like `client.rest.Product.all()`.
 * See documentation here: https://github.com/Shopify/shopify-api-js/tree/main/docs/reference/clients
 */

type ApiType = "rest" | "gql";

export const ShopClient = createParamDecorator(
  async (apiType: ApiType = "gql", ctx: ExecutionContext) => {
    const http = ctx.switchToHttp();
    const response = http.getResponse();

    const session = response.locals.shopify.session;

    if (apiType === "rest") {
      return new shopify.api.clients.Rest({ session });
    }

    return new shopify.api.clients.Graphql({ session });
  },
);
