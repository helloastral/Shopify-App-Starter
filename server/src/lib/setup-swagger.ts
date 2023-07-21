import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { SwaggerTheme } from "swagger-themes";

function setupSwagger(app: NestExpressApplication, shopify: any) {
  const config = new DocumentBuilder()
    .setTitle("Invoice App API")
    .setDescription("Invoice App API description")
    .setVersion("1.0")
    .addTag("invoice")
    .addBearerAuth()
    .addSecurityRequirements("bearer")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const theme = new SwaggerTheme("v3");

  SwaggerModule.setup("tools/swagger", app, document, {
    explorer: true,
    customCss: theme.getBuffer("feeling-blue"),
    customJs: "/assets/swagger-ui.js",
    customJsStr: /* js */ `
    window["API_KEY"] = "${shopify.api.config.apiKey}"
    window["HOST"] = "${shopify.api.config.hostName}",
  `,
    swaggerOptions: {
      requestInterceptor: (req) => {
        req.headers.Authorization = `Bearer ${window["TOKEN"]}`;
        return req;
      },
    },
  });
}

export default setupSwagger;
