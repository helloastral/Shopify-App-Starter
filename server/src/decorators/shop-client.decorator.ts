import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import shopify from "src/lib/shopify-app";

type ApiType = "rest" | "gql" | "session";

export const ShopClient = createParamDecorator(
  async (apiType: ApiType = "gql", ctx: ExecutionContext) => {
    const http = ctx.switchToHttp();
    const response = http.getResponse();

    const session = response.locals.shopify.session;

    if (apiType === "rest") {
      return new shopify.api.clients.Rest({ session });
    } else if (apiType === "session") {
      return session;
    }

    return new shopify.api.clients.Graphql({ session });
  },
);
