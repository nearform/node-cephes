import { test, before, after } from "node:test";
import assert from "assert";
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import serveHandler from "serve-handler";
import cephes from "../index.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let browser;
let page;
let server;
let browserModuleUrl;

before(async () => {
  server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    serveHandler(req, res, { public: path.join(__dirname, "..") });
  });

  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  browserModuleUrl = `http://localhost:${port}/index.mjs`;

  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();

  page.on("console", (msg) =>
    console.log(`[Browser ${msg.type()}] ${msg.text()}`),
  );
  page.on("pageerror", (err) => console.error("[Browser pageerror]", err));
});

after(async () => {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
});

test("zeta function works in browser", async () => {
  const html = `
    <!DOCTYPE html>
    <html>
      <body>
        <p id="msg"></p>
        <script type="module">
          import cephes from "${browserModuleUrl}";
          await cephes.compiled
          document.getElementById('msg').textContent = cephes.zeta(2, 1);
        </script>
      </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: "domcontentloaded" });

  const msg = await page.$eval("#msg", (el) => el.textContent);

  assert.strictEqual(msg, String(cephes.zeta(2, 1)));
});
