export const skills = [
	{
		id: "python",
		name: "Python",
		category: "language",
		proficiency: "confident",
	},
	{
		id: "typescript",
		name: "TypeScript",
		category: "language",
		proficiency: "practical",
	},
	{
		id: "flask",
		name: "Flask",
		category: "backend",
		proficiency: "practical",
	},
	{
		id: "react",
		name: "React",
		category: "frontend",
		proficiency: "practical",
	},
	{
		id: "astro",
		name: "Astro",
		category: "frontend",
		proficiency: "learning",
	},
	{
		id: "tailwind",
		name: "Tailwind CSS",
		category: "frontend",
		proficiency: "learning",
	},
	{
		id: "supabase",
		name: "Supabase",
		category: "backend",
		proficiency: "practical",
	},
] as const;

export type Skill = (typeof skills)[number];
export type SkillId = Skill["id"];

export const skillsById = Object.fromEntries(
	skills.map((skill) => [skill.id, skill]),
) as Record<SkillId, Skill>;
