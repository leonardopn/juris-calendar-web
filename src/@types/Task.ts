export interface Task {
	id: string;
	processId: string;
	initialDate: string; //NOTE: Data em ISO
	finalDate: string; //NOTE: Data em ISO
	category: TaskCategory;
	obs?: string;
	status: TaskStatus;
	createdAt: Date;
	updatedAt: Date;
}

export enum TaskCategory {
	"PETIÇÃO_INICIAL" = "Petição inicial",
	"PETIÇÃO_SIMPLES" = "Petição simples",
	"CONTESTAÇÃO" = "Contestação",
	"RÉPLICA" = "Réplica",
	"RECURSO" = "Recurso",
	"CONTRARRAZÃO" = "Contrarrazão",
	"IMPUGNAÇÃO" = "Impugnação",
	"ENVIO_MEMORANDO" = "Envio de memorando",
	"CIÊNCIA" = "Ciência",
}

export enum TaskStatus {
	"NÃO_FEITO" = "Não feito",
	"A_REVISAR" = "A revisar",
	"PROTOCOLADO" = "Protocolado",
	"OUTROS" = "Outros",
}
