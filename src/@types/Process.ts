import { Memorandum } from "./Memorandum";

export interface Process {
	id: string;
	part?: string;
	subject?: string;
	memorandums: Memorandum[];
	createdAt: Date;
	updatedAt: Date;
}
