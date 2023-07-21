import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request } from "express";
import { ShopifyService } from "src/shared/services/shopify.service";

/**
 * Make sure this path is what you provide in server/src/lib/shopify-app.ts
 * POST api/webhoooks
 * You can test webhooks by using shopify cli. Try running this after changing url
 * yarn shopify webhook trigger --topic app/uninstalled --address=https://like-initiative-performance-calvin.trycloudflare.com/api/webhooks
 * To find the cloudflare url(shopify cli doesn't show this anymore), inspect your app iframe and look for the url in the src attribute
 */

@Controller("webhooks")
export class WebhooksController {
  constructor(private readonly shopify: ShopifyService) {}

  @Post()
  async webhooks(@Res() res, @Req() req: Request) {
    try {
      const data = await this.shopify.api.webhooks.validate({
        rawBody: req.body,
        rawRequest: req,
        rawResponse: res,
      });

      console.log("Webhooks validates data ", data);

      // The shape of this data is not very typescript friendly
      // {
      //   valid: true,
      //   apiVersion: "2023-10",
      //   domain: "shop.myshopify.com",
      //   hmac: "WFOccQ1OZlOQXBk3ub//KHtrmm7pVGc5H32GQNiw0XM=",
      //   topic: "APP_UNINSTALLED",
      //   webhookId: "462e63cd-0402-4e89-bdbd-f7331d1c4f81",
      // };
      // or
      //  { valid: false, reason: 'missing_body' }

      await this.shopify.api.webhooks.process({
        rawBody: req.body,
        rawRequest: req,
        rawResponse: res,
      });

      console.log(`Webhook processed, returned status code 200`);
    } catch (e) {
      console.log(`Failed to process webhook: ${e.message}`);
      if (!res.headersSent) {
        res.status(400).send(e.message);
      }
    }
  }
}
