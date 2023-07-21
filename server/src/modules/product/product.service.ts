import { Injectable } from "@nestjs/common";
import { ShopifyService } from "src/shared/services/shopify.service";

@Injectable()
export class ProductService {
  constructor(private readonly shopify: ShopifyService) {}

  fetchProducts(session: any) {
    return this.shopify.api.rest.Product.all({
      session,
    });
  }

  async fetchProductsGQL(gqlClient) {
    console.log("GQL");
    const products = await gqlClient.query({
      data: `{
          products (first: 10) {
            edges {
              node {
                id
                title
                descriptionHtml
              }
            }
          }
        }`,
    });
    return products;
  }
}
