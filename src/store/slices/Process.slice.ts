import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import update from "immutability-helper";
import { Process } from "../../@types/Process";
import { ProcessError } from "../../errors/ProcessError";

interface ProcessState {
	isFetching: boolean;
	error: ProcessError | null;
	process: Process[];
}

const initialState: ProcessState = {
	isFetching: false,
	process: [],
	error: null,
};

function findIndex(collection: Process[], id: string) {
	return collection.findIndex(item => item.id === id);
}

export const ProcessSlice = createSlice({
	name: "process",
	initialState,
	reducers: {
		addProcess: (state, action: PayloadAction<Process>) => {
			if (findIndex(state.process, action.payload.id) === -1) {
				return update(state, { process: { $push: [action.payload] } });
			}
		},
		setHasError: (state, action: PayloadAction<ProcessError>) =>
			update(state, { error: { $set: action.payload } }),
		setFetching: (state, action: PayloadAction<boolean>) =>
			update(state, { isFetching: { $set: action.payload } }),
	},
});

export const { addProcess, setFetching, setHasError } = ProcessSlice.actions;

export default ProcessSlice.reducer;
