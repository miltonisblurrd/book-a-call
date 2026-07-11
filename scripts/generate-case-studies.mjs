import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const caseDir = path.join(root, "blurrd-studi.webflow/case-studies");
const outDir = path.join(root, "content/case-studies");

function extractMeta(html) {
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.replace(/&amp;/g, "&") || "";
  const description =
    html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1]?.replace(/&amp;/g, "&") || "";
  return { title, description };
}

function extractMain(html) {
  const mainMatch = html.match(
    /<main[^>]*class="[^"]*body-wrapper[^"]*"[^>]*>([\s\S]*?)<\/main>/i
  );
  if (!mainMatch) return "";
  let content = mainMatch[1];
  content = content.replace(/<footer[\s\S]*$/i, "");
  content = content.replace(/<div class="glow-test">[\s\S]*$/i, "");
  return content.trim();
}

fs.mkdirSync(outDir, { recursive: true });

for (const file of fs.readdirSync(caseDir).filter((f) => f.endsWith(".html"))) {
  const slug = file.replace(".html", "");
  const html = fs.readFileSync(path.join(caseDir, file), "utf8");
  const { title, description } = extractMeta(html);
  const body = extractMain(html);

  const md = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
client: "${slug}"
---

${body}
`;

  fs.writeFileSync(path.join(outDir, `${slug}.md`), md);
  console.log("Wrote case study", slug);
}
