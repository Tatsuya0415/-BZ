import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const paths = [
  "/",
  "/diagnosis",
  "/self-guide",
  "/self-guide/checklist",
  "/self-guide/documents",
  "/progress",
  "/expert-referral",
  "/legal/tokushoho",
  "/legal/terms",
  "/legal/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
  }));
}
