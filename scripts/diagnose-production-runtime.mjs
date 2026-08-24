import { chromium } from "playwright-core";

const browser = await chromium.launch({ headless: true, executablePath: "/usr/bin/chromium", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const consoleMessages = [];
const pageErrors = [];
const requestFailures = [];
page.on("console", message => consoleMessages.push({ type: message.type(), text: message.text() }));
page.on("pageerror", error => pageErrors.push({ message: error.message, stack: error.stack }));
page.on("requestfailed", request => requestFailures.push({ url: request.url(), failure: request.failure()?.errorText ?? "unknown" }));

try {
  const response = await page.goto("https://sonata-seven.vercel.app/", { waitUntil: "networkidle", timeout: 45_000 });
  await page.waitForTimeout(2_000);
  console.log(JSON.stringify({ status: response?.status(), consoleMessages, pageErrors, requestFailures, bodyText: await page.locator("body").innerText() }, null, 2));
} finally {
  await browser.close();
}
