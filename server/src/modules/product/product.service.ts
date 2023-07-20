import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
  fetchProducts(client) {
    return client.get({
      path: "products",
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
