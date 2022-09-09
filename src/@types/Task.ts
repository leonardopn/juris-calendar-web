import { Memorandum } from "./Memorandum";
import { Process } from "./Process";

export interface Task {
	id: string;
	process: Process;
	initialDate: Date;
	finalDate: Date;
	category: TaskCategory;
	obs?: string;
	memorandums: Memorandum[];
	status: TaskStatus;
	createdAt: Date;
	updatedAt: Date;
}

export type TaskCategory =
	| "PETIÇÃO_INICIAL"
	| "PETIÇÃO_SIMPLES"
	| "CONTESTAÇÃO"
	| "RÉPLICA"
	| "RECURSO"
	| "CONTRARRAZÃO"
	| "IMPUGNAÇÃO"
	| "ENVIO_MEMORANDO"
	| "CIÊNCIA";

export type TaskStatus = "NÃO_FEITO" | "A_REVISAR" | "PROTOCOLADO";
