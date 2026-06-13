import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(["professional", "academic"]),
      order: z.number().default(0),
      summary: z.string(),
      keyInsights: z.array(z.string()).default([]),
      // Images live in src/assets and are referenced by path relative to this
      // markdown file (e.g. "../../assets/projects/foo.svg"). The image()
      // helper runs them through astro:assets for optimization/hashing.
      coverImage: image(),
      gallery: z.array(image()).default([]),
      // PDF path under /public (e.g. "/pdfs/foo.pdf"). Optional.
      fullDocsPdf: z.string().optional(),
      // True for client work that can't be published in full (e.g. JLA).
      confidential: z.boolean().default(false),
    }),
});

export const collections = { projects };
