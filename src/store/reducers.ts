import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import processSlice from "./slices/Process.slice";
import taskSlice from "./slices/Task.slice";

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

const rootReducer = combineReducers({
	process: persistReducer(processReducerPersistConfig, processSlice),
	task: persistReducer(taskReducerPersistConfig, taskSlice),
});

export { rootPersistConfig, rootReducer };
