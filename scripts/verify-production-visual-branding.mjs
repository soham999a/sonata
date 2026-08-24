import { chromium } from "playwright-core";

const browser = await chromium.launch({ headless: true, executablePath: "/usr/bin/chromium", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });

try {
  await page.goto("https://sonata-seven.vercel.app/", { waitUntil: "networkidle", timeout: 45_000 });
  await page.waitForTimeout(800);
  const visual = await page.evaluate(() => {
    const hero = document.querySelector(".hero-shell__image");
    const mark = document.querySelector(".sonata-mark");
    const word = document.querySelector(".sonata-mark__word");
    const heroStyle = hero ? getComputedStyle(hero) : null;
    const wordStyle = word ? getComputedStyle(word) : null;
    return {
      heroBackground: heroStyle?.backgroundImage ?? "",
      heroOpacity: heroStyle?.opacity ?? "",
      wordText: word?.textContent?.trim() ?? "",
      wordBackground: wordStyle?.backgroundImage ?? "",
      accessibleName: mark?.getAttribute("aria-label") ?? "",
    };
  });
  await page.screenshot({ path: "/home/ubuntu/screenshots/sonata-vercel-visual-branding.png", fullPage: false });
  console.log(JSON.stringify(visual, null, 2));
  if (!visual.heroBackground.includes("wZlRqynDqVJoQoER.jpg") || visual.wordText !== "Sonata" || !visual.wordBackground.includes("gradient") || visual.accessibleName !== "Sonata home") process.exitCode = 1;
} finally {
  await browser.close();
}
