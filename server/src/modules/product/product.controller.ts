import { Controller, Get } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ShopSession } from "src/decorators/shop-session.decorator";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async fetchProducts(@ShopSession() session) {
    console.log("fetching products");
    return this.productService.fetchProducts(session);
  }
}
