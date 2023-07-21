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
