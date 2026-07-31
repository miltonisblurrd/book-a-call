import type { MetadataRoute } from "next";
import {
  getAllCaseStudies,
  getAllFaqs,
  getPublishedPosts,
} from "@/lib/content";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/services/branding",
  "/services/design",
  "/services/development",
  "/services/ongoing-support",
  "/las-vegas/branding",
  "/las-vegas/design",
  "/las-vegas/development",
  "/blog",
  "/faqs",
  "/book-a-call",
  "/terms-of-service",
  "/privacy",
  "/blurrd-studio-advantages",
  "/seo",
  "/shopify-development",
  "/webflow-development",
  "/mobile-apps-games",
  "/nfts",
  "/self-service-project-request",
  "/artists",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.blurrdstudio.com";

  const routes: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const post of getPublishedPosts()) {
    routes.push({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const faq of getAllFaqs()) {
    routes.push({
      url: `${base}/faqs/${faq.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const cs of getAllCaseStudies()) {
    routes.push({
      url: `${base}/case-studies/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return routes;
}
