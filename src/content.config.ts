import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const workSchema = z.object({
	title: z.string(),
	slug: z.string(),
	start: z.coerce.date(),
	end: z.coerce.date().optional(),
	description: z.string(),
	skills: z.array(z.string()),
	github: z.url().optional(),
	website: z.url().optional(),
	featured: z.boolean().default(false),
	thumbnail: z.string().optional(),
});

const experienceSchema = z.object({
	title: z.string(),
	category: z.enum(["education", "learning", "hackathon"]),
	start: z.coerce.date(),
	end: z.coerce.date().optional(),
	organization: z.string().optional(),
	skills: z.array(z.string()).default([]),
});

const works = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/works" }),
	schema: workSchema,
});

const experiences = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/experiences" }),
	schema: experienceSchema,
});

export const collections = {
	works,
	experiences,
};
