// Hero-only screenshots: load state, mid-scroll exit, mobile
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const outDir = "C:/Users/aaron/AppData/Local/Temp/split-shots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

// Desktop
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3105/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3200);
await page.screenshot({ path: `${outDir}/hero-desktop.png` });
await page.evaluate(() => window.scrollTo({ top: 450, behavior: "instant" }));
await page.waitForTimeout(1200);
await page.screenshot({ path: `${outDir}/hero-scrolled.png` });
await page.close();

// Mobile
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto("http://localhost:3105/", { waitUntil: "networkidle", timeout: 60000 });
await mob.waitForTimeout(3200);
await mob.screenshot({ path: `${outDir}/hero-mobile.png` });
await mob.close();

await browser.close();
console.log("done");
