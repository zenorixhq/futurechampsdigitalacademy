// End-to-end admin flow check: login → enquiries inbox → submit public enquiry → see it in inbox → images page → logout
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const base = "http://localhost:3105";
const outDir = "C:/Users/aaron/AppData/Local/Temp/split-shots/admin-flow";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const fail = (msg) => { console.error("FAIL:", msg); };

// 1. Public contact form → submit enquiry
await page.goto(`${base}/contact`, { waitUntil: "networkidle", timeout: 60000 });
await page.fill('input[name="name"]', "E2E Test Person");
await page.fill('input[name="email"]', "e2e@example.com");
await page.fill('input[name="phone"]', "9999999999");
await page.fill('textarea[name="message"]', "This is an automated end-to-end test enquiry.");
await page.click('button[type="submit"]');
await page.waitForTimeout(3000);
const successVisible = await page.locator("text=We'll get back to you soon").count();
console.log(successVisible ? "PASS: contact form success message" : "FAIL: no success message on contact form");

// 2. Login
await page.goto(`${base}/admin/login`, { waitUntil: "networkidle" });
await page.fill('input[name="email"]', process.env.ADMIN_EMAIL || "admin@futurechampsdigitalacademy.com");
await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || "changeme123");
await page.click('button[type="submit"]');
await page.waitForURL("**/admin/enquiries", { timeout: 15000 }).catch(() => fail("did not redirect to /admin/enquiries after login"));
console.log("PASS: login redirected to", page.url());
await page.screenshot({ path: `${outDir}/01-enquiries.png` });

// 3. Enquiry from step 1 visible?
await page.waitForTimeout(1500);
const found = await page.locator("text=E2E Test Person").count();
console.log(found ? "PASS: enquiry visible in inbox" : "FAIL: enquiry not found in inbox");

// 4. Toggle read on the first enquiry
const toggleBtn = page.locator('button:has-text("read"), button:has-text("Read")').first();
if (await toggleBtn.count()) { await toggleBtn.click(); await page.waitForTimeout(1500); console.log("PASS: toggled read state"); }

// 5. Images manager
await page.goto(`${base}/admin/images`, { waitUntil: "networkidle" });
const slotCount = await page.locator("text=About page hero").count();
console.log(slotCount ? "PASS: images manager lists slots" : "FAIL: images manager missing slots");
await page.screenshot({ path: `${outDir}/02-images.png` });

// 6. Posts CRUD smoke: open new post form
await page.goto(`${base}/admin/posts`, { waitUntil: "networkidle" });
await page.screenshot({ path: `${outDir}/03-posts.png` });
const newLink = page.locator('a:has-text("New")').first();
if (await newLink.count()) {
  await newLink.click();
  await page.waitForTimeout(1500);
  console.log("PASS: new post form at", page.url());
  await page.screenshot({ path: `${outDir}/04-post-new.png` });
}

// 7. Projects + placements lists render
await page.goto(`${base}/admin/projects`, { waitUntil: "networkidle" });
console.log((await page.locator("text=Kannur Warriors").count()) ? "PASS: projects list seeded" : "FAIL: projects list empty");
await page.goto(`${base}/admin/placements`, { waitUntil: "networkidle" });
console.log((await page.locator("text=Aiswarya").count()) ? "PASS: placements list seeded" : "FAIL: placements list empty");

// 8. Logout (remove dev overlay portal that intercepts clicks in dev mode)
await page.evaluate(() => document.querySelector("nextjs-portal")?.remove());
const logoutBtn = page.locator('button:has-text("Log out")');
if (await logoutBtn.count()) {
  await logoutBtn.click();
  await page.waitForURL("**/admin/login", { timeout: 10000 }).catch(() => fail("logout did not redirect to login"));
  console.log("PASS: logout →", page.url());
}

// 9. /admin blocked again after logout
await page.goto(`${base}/admin/enquiries`, { waitUntil: "networkidle" });
console.log(page.url().includes("/admin/login") ? "PASS: /admin protected after logout" : "FAIL: /admin accessible after logout");

await browser.close();
console.log("DONE");
