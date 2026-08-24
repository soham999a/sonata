import { chromium } from "playwright-core";

const origin = "https://sonata-seven.vercel.app";
const routes = ["/", "/entries/raga", "/search", "/compare", "/learn", "/assistant", "/contribute"];
const browser = await chromium.launch({ headless: true, executablePath: "/usr/bin/chromium", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const results = [];

try {
  for (const route of routes) {
    const response = await page.goto(`${origin}${route}`, { waitUntil: "networkidle", timeout: 45_000 });
    await page.waitForTimeout(600);
    const snapshot = await page.evaluate(() => ({
      heading: document.querySelector("h1")?.textContent?.trim() ?? "",
      interactive: document.querySelectorAll("a[href], button, input, select, textarea").length,
      renderedText: document.body.innerText.trim().length,
      loadingOnly: document.body.innerText.trim() === "Opening concept record…",
    }));
    results.push({ route, status: response?.status() ?? 0, ...snapshot });
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
const failures = results.filter(result => result.status !== 200 || !result.heading || result.interactive < 1 || result.renderedText < 80 || result.loadingOnly);
if (failures.length) process.exitCode = 1;
