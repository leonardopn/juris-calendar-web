export class MemorandumError extends Error {
	constructor(msg: string) {
		super(msg);
		Object.setPrototypeOf(this, MemorandumError.prototype);
	}
}
