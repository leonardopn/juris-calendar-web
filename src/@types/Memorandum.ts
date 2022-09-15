export interface Memorandum {
	id: string;
	number: string;
	destiny: string;
	taskId: string;
	returnDate: string; //NOTE: Em formato ISO
	isReturned: boolean;
	returnId?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface MemorandumToCreate extends Omit<Memorandum, "taskId"> {
	taskId?: string;
}
