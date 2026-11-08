// Upload flow check: login → upload image to a slot → verify local file + admin thumb → reset slot
import { chromium } from "playwright-core";
import { readdirSync } from "node:fs";

const base = "http://localhost:3105";
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();

await page.goto(`${base}/admin/login`, { waitUntil: "networkidle" });
await page.fill('input[name="email"]', "admin@futurechampsdigitalacademy.com");
await page.fill('input[name="password"]', "changeme123");
await page.click('button[type="submit"]');
await page.waitForURL("**/admin/enquiries", { timeout: 15000 });

await page.goto(`${base}/admin/images`, { waitUntil: "networkidle" });

// Find the About page hero slot panel and upload a real image
const panel = page.locator(".adminPanel", { hasText: "About page hero" });
await panel.locator('input[type="file"]').setInputFiles("public/assets/images/why-choose-image.jpg");
await panel.locator('button[type="submit"]').click();
await page.waitForURL("**/admin/images**", { timeout: 20000 });
await page.waitForTimeout(2000);

const uploads = readdirSync("public/uploads").filter((f) => f !== ".gitkeep");
console.log(uploads.length ? `PASS: file written to public/uploads (${uploads[uploads.length - 1]})` : "FAIL: no file in public/uploads");

const thumbSrc = await panel.locator("img").first().getAttribute("src").catch(() => null);
console.log(thumbSrc && thumbSrc.includes("/uploads/") ? `PASS: admin thumb updated (${thumbSrc})` : `FAIL: thumb src = ${thumbSrc}`);

// Public about page should now render the uploaded image in the hero frame
await page.goto(`${base}/about`, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);
const heroImg = await page.locator('main img[src*="/uploads/"]').count();
console.log(heroImg ? "PASS: about hero renders uploaded image" : "FAIL: about hero has no uploaded image");

await browser.close();
console.log("DONE");
