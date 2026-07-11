import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const csvPath =
  process.argv[2] ||
  path.join(root, "blurrd-studi - FAQs - 6955b5cf30d64dcf49f2fd6e.csv");
const outDir = path.join(root, "content/faqs");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === ",") {
      row.push(field);
      field = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  if (field.length || row.length) {
    row.push(field);
    if (row.some((cell) => cell.trim())) rows.push(row);
  }

  return rows;
}

function htmlToMarkdown(html) {
  return html
    .replace(/<\/p>\s*<p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?p>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .trim();
}

function yamlEscape(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ");
}

function formatCategory(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const raw = fs.readFileSync(csvPath, "utf8");
const rows = parseCsv(raw);
const headers = rows[0];
const dataRows = rows.slice(1);

const idx = Object.fromEntries(headers.map((h, i) => [h, i]));

fs.mkdirSync(outDir, { recursive: true });

for (const file of fs.readdirSync(outDir)) {
  if (file.endsWith(".md")) fs.unlinkSync(path.join(outDir, file));
}

let count = 0;
for (const row of dataRows) {
  const name = row[idx.Name];
  const slug = row[idx.Slug];
  const answer = row[idx["FAQ Answer"]];
  const summary = row[idx["FAQ Answer Short Summary"]];
  const category = row[idx["FAQ Category"]];
  const titleTag = row[idx["Title Tag"]];
  const metaDescription = row[idx["Meta Description"]];

  if (!slug || !name) continue;

  const body = htmlToMarkdown(answer);
  const md = `---
title: "${yamlEscape(name)}"
description: "${yamlEscape(summary || metaDescription)}"
category: "${yamlEscape(formatCategory(category))}"
categorySlug: "${yamlEscape(category)}"
titleTag: "${yamlEscape(titleTag || name)}"
metaDescription: "${yamlEscape(metaDescription || summary)}"
---

${body}
`;

  fs.writeFileSync(path.join(outDir, `${slug}.md`), md);
  count++;
}

console.log(`Imported ${count} FAQs to content/faqs/`);
