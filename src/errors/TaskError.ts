export class TaskError extends Error {
	constructor(msg: string) {
		super(msg);
		Object.setPrototypeOf(this, TaskError.prototype);
	}
}
