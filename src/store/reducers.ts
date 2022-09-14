import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import processSlice from "./slices/Process.slice";
import taskSlice from "./slices/Task.slice";
import memorandumSlice from "./slices/Memorandum.slice";

const rootPersistConfig = {
	key: "root",
	storage,
	keyPrefix: "redux-",
	whitelist: [],
};

const processReducerPersistConfig = {
	key: "process",
	storage,
	keyPrefix: "redux-",
};
const taskReducerPersistConfig = {
	key: "task",
	storage,
	keyPrefix: "redux-",
};
const taskMemorandumPersistConfig = {
	key: "memorandum",
	storage,
	keyPrefix: "redux-",
};

const rootReducer = combineReducers({
	process: persistReducer(processReducerPersistConfig, processSlice),
	task: persistReducer(taskReducerPersistConfig, taskSlice),
	memorandum: persistReducer(taskMemorandumPersistConfig, memorandumSlice),
});

export { rootPersistConfig, rootReducer };
