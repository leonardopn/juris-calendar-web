export interface Memorandum {
	id: string;
	destiny: string;
	processId: string;
	returnDate: Date;
	isReturned: boolean;
	returnId?: string;
	createdAt: Date;
	updatedAt: Date;
}
