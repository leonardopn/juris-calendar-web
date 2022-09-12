import { createSerializableStateInvariantMiddleware, isPlain } from "@reduxjs/toolkit";
import { isCollection } from "immutable";
import { isDate } from "lodash";

export function isPlainObject(val: any) {
	return (
		typeof val === "undefined" ||
		val === null ||
		typeof val === "string" ||
		typeof val === "boolean" ||
		typeof val === "number" ||
		isDate(val) ||
		Array.isArray(val) ||
		isPlain(val)
	);
}

const isSerializable = (value: any) => isCollection(value) || isPlainObject(value);

const getEntries = (value: any) =>
	isCollection(value) ? Object.entries(value.entries()) : Object.entries(value);

export const serializableMiddleware = createSerializableStateInvariantMiddleware({
	isSerializable,
	getEntries,
});
