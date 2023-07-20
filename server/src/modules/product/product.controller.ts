import { Controller, Get } from "@nestjs/common";
import { ShopClient } from "src/decorators/shop-client.decorator";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async fetchProducts(@ShopClient("rest") client) {
    console.log("fetching products");
    return this.productService.fetchProducts(client);
  }
}
