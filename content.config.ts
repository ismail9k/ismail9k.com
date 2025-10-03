import { defineCollection, z } from "@nuxt/content";

export const collections = {
  blog: defineCollection({
    source: "blog/**/*.md",
    type: "page",

    schema: z.object({
      title: z.string(),
      slug: z.string(),
      date: z.date(),
      header: z.string().optional(),
      tags: z.array(z.string()).optional(),
      excerpt: z.object({
        type: z.string(),
        children: z.any(),
      }),
    }),
  }),
};
