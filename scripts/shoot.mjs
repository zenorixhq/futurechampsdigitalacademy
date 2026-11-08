// Screenshot harness — captures the homepage hero + every <section> in <main>
// Usage: node scripts/shoot.mjs [url] [outDir]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const url = process.argv[2] || "http://localhost:3105/";
const outDir = process.argv[3] || "C:/Users/aaron/AppData/Local/Temp/split-shots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3000); // fonts + load-in animations

// 1. Hero as seen on load
await page.screenshot({ path: `${outDir}/00-hero.png` });

// 2. Every section inside <main>, scrolled into view, animations settled
const sections = await page.$$eval("main section", (els) =>
  els.map((el, i) => ({
    i,
    id: el.id || el.className.split(" ")[0] || `section-${i}`,
  }))
);

for (const { i, id } of sections) {
  await page.evaluate((idx) => {
    const el = document.querySelectorAll("main section")[idx];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top: y, behavior: "instant" });
  }, i);
  await page.waitForTimeout(2200); // let scroll reveals finish
  await page.screenshot({ path: `${outDir}/${String(i + 1).padStart(2, "0")}-${id.replace(/[^a-z0-9_-]/gi, "_").slice(0, 40)}.png` });
}

// 3. Page metrics for diagnosing hidden content
const metrics = await page.evaluate(() => ({
  scrollHeight: document.documentElement.scrollHeight,
  sections: [...document.querySelectorAll("main section")].map((el) => {
    const r = el.getBoundingClientRect();
    return { id: el.id || el.className.split(" ")[0], height: Math.round(r.height) };
  }),
}));
console.log(JSON.stringify(metrics, null, 2));

await browser.close();
console.log("done ->", outDir);
