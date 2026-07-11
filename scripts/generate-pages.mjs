import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const pages = [
  { html: "index.html", route: "(site)/page.tsx" },
  { html: "about.html", route: "(site)/about/page.tsx" },
  { html: "services.html", route: "(site)/services/page.tsx" },
  { html: "services/branding.html", route: "(site)/services/branding/page.tsx" },
  { html: "services/design.html", route: "(site)/services/design/page.tsx" },
  { html: "services/development.html", route: "(site)/services/development/page.tsx" },
  { html: "services/ongoing-support.html", route: "(site)/services/ongoing-support/page.tsx" },
  { html: "learn.html", route: "(site)/learn/page.tsx" },
  { html: "terms-of-service.html", route: "(site)/terms-of-service/page.tsx" },
  { html: "blurrd-studio-advantages.html", route: "(site)/blurrd-studio-advantages/page.tsx" },
  { html: "seo.html", route: "(site)/seo/page.tsx" },
  { html: "shopify-development.html", route: "(site)/shopify-development/page.tsx" },
  { html: "webflow-development.html", route: "(site)/webflow-development/page.tsx" },
  { html: "mobile-apps-games.html", route: "(site)/mobile-apps-games/page.tsx" },
  { html: "nfts.html", route: "(site)/nfts/page.tsx" },
  { html: "self-service-project-request.html", route: "(site)/self-service-project-request/page.tsx" },
  { html: "artists.html", route: "(site)/artists/page.tsx" },
  { html: "blog.html", route: "(site)/blog/page.tsx" },
  { html: "faqs.html", route: "(site)/faqs/page.tsx" },
];

for (const page of pages) {
  const depth = page.html.includes("/") ? page.html.split("/").length - 1 : 0;
  const content = `import WebflowContent from "@/components/WebflowContent";
import { getWebflowPage } from "@/lib/get-webflow-page";
import type { Metadata } from "next";

const page = getWebflowPage("${page.html}");

export const metadata: Metadata = {
  title: page.metadata.title.replace(" | BLURRD Studio", "").replace(" — BLURRD Studio", ""),
  description: page.metadata.description,
  openGraph: page.metadata.ogImage
    ? { images: [page.metadata.ogImage] }
    : undefined,
};

export default function Page() {
  return <WebflowContent html={page.content} depth={${depth}} />;
}
`;

  const outPath = path.join(root, "src/app", page.route);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, content);
  console.log("Wrote", page.route);
}

// not-found from 404.html
const notFound = `import WebflowContent from "@/components/WebflowContent";
import { getWebflowPage } from "@/lib/get-webflow-page";

const page = getWebflowPage("404.html");

export default function NotFound() {
  return <WebflowContent html={page.content} />;
}
`;
fs.writeFileSync(path.join(root, "src/app/not-found.tsx"), notFound);
console.log("Wrote not-found.tsx");
