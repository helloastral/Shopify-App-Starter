import { Injectable } from "@nestjs/common";
import "@shopify/shopify-api/adapters/node";
import { GraphqlClient } from "@shopify/shopify-api/lib/clients/graphql/graphql_client";
import { RestClient } from "@shopify/shopify-api/lib/clients/rest/rest_client";

import shopify from "src/lib/shopify-app";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ShopifyService {
  constructor(public readonly prisma: PrismaService) {}

  getRestClient(session): RestClient {
    return new shopify.api.clients.Rest({ session });
  }

  getGQLClient(session): GraphqlClient {
    return new shopify.api.clients.Graphql({ session });
  }
}
