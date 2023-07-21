import { join } from "path";
import { readFileSync } from "fs";
import * as express from "express";
import * as serveStatic from "serve-static";

import shopify from "./lib/shopify-app.js";
import GDPRWebhookHandlers from "./lib/gdpr.js";
import bootstrap from "./nest-main.js";
import setupSwagger from "./lib/setup-swagger.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10,
);

const isProd = process.env.NODE_ENV === "production";

const STATIC_PATH = join(
  __dirname,
  "..",
  "..",
  "client",
  `${isProd ? "dist" : ""}`,
);

async function main() {
  const app = express();

  // Set up Shopify authentication and webhook handling
  app.get(shopify.config.auth.path, shopify.auth.begin());
  app.get(
    shopify.config.auth.callbackPath,
    shopify.auth.callback(),
    shopify.redirectToShopifyOrAppRoot(),
  );
  app.post(
    shopify.config.webhooks.path,
    shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers as any }),
  );

  // If you are adding routes outside of the /api path, remember to
  // also add a proxy rule for them in web/frontend/vite.config.js

  const nestApp = await bootstrap(app);

  nestApp.use("/api/*", shopify.validateAuthenticatedSession());

  nestApp.use(express.json());
  nestApp.use(shopify.cspHeaders());
  nestApp.use(serveStatic(STATIC_PATH, { index: false }));

  setupSwagger(nestApp, shopify);

  nestApp.use(async (_req, res, _next) => {
    const url = _req.originalUrl;
    if (url.startsWith("/api")) {
      console.log(`Bypassing API ${url} in static index middleware`);
      return _next();
    }

    const customNextFn = () => {
      console.log("Serving index.html");
      return res
        .status(200)
        .set("Content-Type", "text/html")
        .send(readFileSync(join(STATIC_PATH, "index.html")));
    };

    return shopify.ensureInstalledOnShop()(_req, res, customNextFn);
  });

  nestApp.listen(PORT).then(() => {
    console.log(`> BE ready on ${PORT}`);
  });
}

main();
