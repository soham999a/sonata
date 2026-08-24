import { chromium } from "playwright-core";

const origin = "http://localhost:3000";
const routes = ["/search", "/compare", "/learn", "/assistant", "/contribute"];
const browser = await chromium.launch({ headless: true, executablePath: "/usr/bin/chromium", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const results = [];

try {
  for (const route of routes) {
    await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded", timeout: 20_000 });
    await page.waitForTimeout(500);
    const interactiveCount = await page.locator("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])").count();
    let focusVisible = false;
    const focusedTags = [];
    for (let index = 0; index < Math.min(interactiveCount + 2, 18); index += 1) {
      await page.keyboard.press("Tab");
      const snapshot = await page.evaluate(() => {
        const active = document.activeElement;
        if (!(active instanceof HTMLElement)) return { tag: "none", visible: false };
        const style = getComputedStyle(active);
        return {
          tag: active.tagName.toLowerCase(),
          visible: style.outlineStyle !== "none" && style.outlineWidth !== "0px",
        };
      });
      focusedTags.push(snapshot.tag);
      focusVisible ||= snapshot.visible;
    }
    const hasRouteEscape = await page.locator('a[href="/"], a[href="/search"], a[href="/compare"], a[href="/learn"]').count() > 0;
    results.push({ route, interactiveCount, focusVisible, focusedTags: Array.from(new Set(focusedTags)), hasRouteEscape });
  }
} finally {
  await browser.close();
}

const failures = results.filter(result => result.interactiveCount < 1 || !result.focusVisible || !result.hasRouteEscape);
console.log(JSON.stringify(results, null, 2));
if (failures.length) process.exitCode = 1;
