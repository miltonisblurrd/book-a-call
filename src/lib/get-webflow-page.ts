import fs from "fs";
import path from "path";
import {
  extractJsonLd,
  extractMainContent,
  extractMetadata,
} from "./webflow-html";
import { normalizeJsonLd } from "./seo";

export function getWebflowPage(relativePath: string) {
  const fullPath = path.join(process.cwd(), "blurrd-studi.webflow", relativePath);
  const html = fs.readFileSync(fullPath, "utf8");
  const depth = relativePath.includes("/") ? relativePath.split("/").length - 1 : 0;
  return {
    metadata: extractMetadata(html),
    content: extractMainContent(html),
    jsonLd: normalizeJsonLd(extractJsonLd(html)),
    depth,
  };
}
