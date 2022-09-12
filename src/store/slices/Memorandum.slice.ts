import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import update from "immutability-helper";
import { Memorandum } from "../../@types/Memorandum";
import { MemorandumError } from "../../errors/MemorandumError";

interface MemorandumState {
	isFetching: boolean;
	error: MemorandumError | null;
	memorandums: Memorandum[];
}

const initialState: MemorandumState = {
	isFetching: false,
	memorandums: [],
	error: null,
};

function findIndex(collection: Memorandum[], id: string) {
	return collection.findIndex(item => item.id === id);
}

export const MemorandumSlice = createSlice({
	name: "memorandum",
	initialState,
	reducers: {
		addMemorandum: (state, action: PayloadAction<Memorandum>) => {
			if (findIndex(state.memorandums, action.payload.id) === -1) {
				return update(state, { memorandums: { $push: [action.payload] } });
			}
		},
		setHasError: (state, action: PayloadAction<MemorandumError>) =>
			update(state, { error: { $set: action.payload } }),
		setFetching: (state, action: PayloadAction<boolean>) =>
			update(state, { isFetching: { $set: action.payload } }),
	},
});

export const { addMemorandum, setFetching, setHasError } = MemorandumSlice.actions;

export default MemorandumSlice.reducer;
