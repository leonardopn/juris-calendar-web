export class ProcessError extends Error {
	constructor(msg: string) {
		super(msg);
		Object.setPrototypeOf(this, ProcessError.prototype);
	}
}
