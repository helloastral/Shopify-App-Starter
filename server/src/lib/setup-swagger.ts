import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { SwaggerTheme } from 'swagger-themes'

/**
 * Swagger
 *
 * You can access swagger for your nestjs app at `/tools/swagger` within the embedded app
 * This will open swagger within shopify admin ui.
 * The benefit of opening it like this is token is automatically fetched and injected into each request
 * See req.headers.Authorization = `Bearer ${window["TOKEN"]}`;
 */

// This is the JS string that gets injected into the swagger-ui page
// We use shopify app bridge(cdn) to get the session token
const SwaggerClientJs = /* js */ `
console.log("Hello from swagger-ui.js");

function loadJS(url, cb) {
  const script = document.createElement("script");
  script.onload = cb;
  script.src = url;
  document.head.appendChild(script);
}

const appBridgeUrl =
  "https://cdn.jsdelivr.net/npm/@shopify/app-bridge@3.7.7/umd/index.min.js";

loadJS(appBridgeUrl, () => {
  console.log("app-bridge-utils Script loaded and ready");
  const AppBridge = window["app-bridge"];

  const app = AppBridge.createApp({
    apiKey: window["API_KEY"],
    host: new URLSearchParams(location.search).get("host"),
    forceRedirect: true,
  });

  const getSessionToken =
    window["app-bridge"].utilities.getSessionToken || null;

  if (!getSessionToken) {
    console.log("app-bridge-utils getSessionToken not found");
    return;
  }

  async function loadToken() {
    const token = await getSessionToken(app);
    console.log("Fetched app-bridge-utils token: ", token);
    window["TOKEN"] = token;
  }

  loadToken();

  setInterval(async () => {
    loadToken();
  }, 15000);
});
`

function setupSwagger(app: NestExpressApplication, shopify: any) {
  const config = new DocumentBuilder()
    .setTitle('Invoice App API')
    .setDescription('Invoice App API description')
    .setVersion('1.0')
    .addTag('invoice')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  const theme = new SwaggerTheme('v3')

  SwaggerModule.setup('tools/swagger', app, document, {
    explorer: true,
    customCss: theme.getBuffer('feeling-blue'),
    // You can also move client side SwaggerClientJs to assets folder in the client directory if you want and access it directly using `/assets/swagger-ui.js`
    // customJs: "/assets/swagger-ui.js",
    customJsStr: /* js */ `
    window["API_KEY"] = "${shopify.api.config.apiKey}"
    window["HOST"] = "${shopify.api.config.hostName}"

    ${SwaggerClientJs}
  `,
    swaggerOptions: {
      requestInterceptor: (req) => {
        req.headers.Authorization = `Bearer ${window['TOKEN']}`
        return req
      },
    },
  })
}

export default setupSwagger
