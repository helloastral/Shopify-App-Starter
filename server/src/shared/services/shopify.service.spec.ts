import { Test, TestingModule } from "@nestjs/testing";
import { ShopifyService } from "./shopify.service";

describe("ShopifyService", () => {
  let service: ShopifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopifyService],
    }).compile();

    service = module.get<ShopifyService>(ShopifyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
