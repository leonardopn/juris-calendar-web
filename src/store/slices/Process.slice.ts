import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Process } from "../../@types/Process";
import { ProcessError } from "../../errors/ProcessError";
import update from "immutability-helper";
import { Memorandum } from "../../@types/Memorandum";

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
		addMemorandum: (
			state,
			action: PayloadAction<{ memorandum: Memorandum; processId: string }>
		) => {
			const processIndex = findIndex(state.process, action.payload.processId);
			if (processIndex !== -1) {
				const updatedProcess = update(state, {
					process: {
						[processIndex]: { memorandums: { $push: [action.payload.memorandum] } },
					},
				});
				return update(updatedProcess, {
					process: {
						[processIndex]: { updatedAt: { $set: new Date() } },
					},
				});
			}
		},
		setHasError: (state, action: PayloadAction<ProcessError>) =>
			update(state, { error: { $set: action.payload } }),
		setFetching: (state, action: PayloadAction<boolean>) =>
			update(state, { isFetching: { $set: action.payload } }),
	},
});

export const { addProcess, addMemorandum, setFetching, setHasError } = ProcessSlice.actions;

export default ProcessSlice.reducer;
