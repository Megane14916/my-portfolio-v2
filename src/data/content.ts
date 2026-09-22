import { skillsById, type SkillId } from "./skills";

export const formatDate = (date: Date) =>
	new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date);

export const formatPeriod = (start: Date, end?: Date) =>
	end ? `${formatDate(start)} – ${formatDate(end)}` : `${formatDate(start)} – 現在`;

export const getSkillName = (id: string) => skillsById[id as SkillId]?.name ?? id;
