import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["professional", "academic"]),
    order: z.number().default(0),
    summary: z.string(),
    keyInsights: z.array(z.string()).default([]),
    // Image paths live under /public (e.g. "/img/projects/foo.svg") so the
    // scaffold builds without binary assets. Swap in real images later.
    coverImage: z.string(),
    gallery: z.array(z.string()).default([]),
    // PDF path under /public (e.g. "/pdfs/foo.pdf"). Optional.
    fullDocsPdf: z.string().optional(),
    // True for client work that can't be published in full (e.g. JLA).
    confidential: z.boolean().default(false),
  }),
});

export const collections = { projects };
