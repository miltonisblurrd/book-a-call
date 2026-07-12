import { getWebflowPage } from "@/lib/get-webflow-page";
import {
  buildPageMetadata,
  decodeHtmlEntities,
  serviceSchema,
} from "@/lib/seo";
import type { Metadata } from "next";

type WebflowSeoOptions = {
  serviceType?: string;
};

export function getWebflowPageSeo(
  relativePath: string,
  canonicalPath: string,
  options?: WebflowSeoOptions
) {
  const page = getWebflowPage(relativePath);
  const title = decodeHtmlEntities(page.metadata.title);
  const description = decodeHtmlEntities(page.metadata.description);

  const jsonLd =
    page.jsonLd.length > 0
      ? page.jsonLd
      : options?.serviceType
        ? [
            serviceSchema({
              name: title,
              description,
              path: canonicalPath,
              serviceType: options.serviceType,
            }),
          ]
        : [];

  return {
    page,
    metadata: buildPageMetadata({
      title: page.metadata.title,
      description: page.metadata.description,
      path: canonicalPath,
      ogImage: page.metadata.ogImage,
    }) satisfies Metadata,
    jsonLd,
  };
}
