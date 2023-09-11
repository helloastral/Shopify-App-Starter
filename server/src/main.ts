import { join } from "path";
import { readFileSync } from "fs";
import * as express from "express";
import * as serveStatic from "serve-static";

import shopify from "@/lib/shopify-app.js";
import bootstrap from "./nest-main.js";
import setupSwagger from "@/lib/setup-swagger.js";

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

/**
 * Utility function to bypass middleware for a specific path
 * @param path
 * @param middleware
 * @returns
 */

const unless = function (path, middleware) {
  return function (req, res, next) {
    if (path === req.originalUrl) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

async function main() {
  const app = express();

  // Set up Shopify authentication and webhook handling
  app.get(shopify.config.auth.path, shopify.auth.begin());
  app.get(
    shopify.config.auth.callbackPath,
    shopify.auth.callback(),
    shopify.redirectToShopifyOrAppRoot(),
  );

  // For webhooks, see webhook.controller.ts

  // If you are adding routes outside of the /api path, remember to
  // also add a proxy rule for them in web/frontend/vite.config.js

  const nestApp = await bootstrap(app);

  nestApp.use(
    "/api/*",
    unless("/api/webhooks", shopify.validateAuthenticatedSession()),
  );

  nestApp
    .use("/api/webhooks", express.text({ type: "*/*" }))
    .use(express.json({ limit: "50mb" }));

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
