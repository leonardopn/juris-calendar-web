export interface Memorandum {
	id: string;
	destiny: string;
	returnDate: string;//NOTE: Em formato ISO
	isReturned: boolean;
	returnId?: string;
	createdAt: Date;
	updatedAt: Date;
}
