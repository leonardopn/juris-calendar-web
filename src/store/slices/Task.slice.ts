import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import update from "immutability-helper";
import { Task } from "../../@types/Task";
import { TaskError } from "../../errors/TaskError";

interface TaskState {
	isFetching: boolean;
	error: TaskError | null;
	tasks: Task[];
}

const initialState: TaskState = {
	isFetching: false,
	tasks: [],
	error: null,
};

function findIndex(collection: Task[], id: string) {
	return collection.findIndex(item => item.id === id);
}

export const TaskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Task>) => {
			if (findIndex(state.tasks, action.payload.id) === -1) {
				return update(state, { tasks: { $push: [action.payload] } });
			}
		},
		setHasError: (state, action: PayloadAction<TaskError>) =>
			update(state, { error: { $set: action.payload } }),
		setFetching: (state, action: PayloadAction<boolean>) =>
			update(state, { isFetching: { $set: action.payload } }),
	},
});

export const { addTask, setFetching, setHasError } = TaskSlice.actions;

export default TaskSlice.reducer;
