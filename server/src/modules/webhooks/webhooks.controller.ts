import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request } from "express";

@Controller("webhooks")
export class WebhooksController {
  @Post()
  async webhooks(@Res() res, @Req() req: Request) {
    console.log("post webhooks endpoint");
    try {
      // console.log("Req.body", req.body);
      // console.log("reqBody", reqBody);
      // await shopify.webhooks.process({
      //   rawBody: req.body,
      //   rawRequest: req,
      //   rawResponse: res,
      // });
      console.log(`Webhook processed, returned status code 200`);
    } catch (e) {
      console.log(`Failed to process webhook: ${e.message}`);
      if (!res.headersSent) {
        res.status(500).send(e.message);
      }
    }
  }
}
