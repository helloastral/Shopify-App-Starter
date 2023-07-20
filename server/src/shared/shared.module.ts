import { Module, Global } from "@nestjs/common";
import { ShopifyService } from "./services/shopify.service";
import { PrismaService } from "./services/prisma.service";
import { ConfigService } from "./services/config.service";

@Global()
@Module({
  providers: [ShopifyService, PrismaService, ConfigService],
  exports: [PrismaService, ConfigService],
})
export class SharedModule {}
