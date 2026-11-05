import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { chromium } from "playwright-core";

const resumeUrl = process.env.RESUME_URL ?? "http://localhost:8008/resume";
const outputPath = resolve("public/resume/Dinesh_Shaw_Resume.pdf");
const chromePath =
  process.env.CHROMIUM_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

await mkdir(dirname(outputPath), { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath });

try {
  const page = await browser.newPage({ colorScheme: "light" });
  await page.goto(resumeUrl, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`Wrote ${outputPath}`);
} finally {
  await browser.close();
}
