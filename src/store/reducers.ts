// configureStore.js
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import processSlice from "./slices/Process.slice";

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

const rootReducer = combineReducers({
	process: persistReducer(processReducerPersistConfig, processSlice),
});

export { rootPersistConfig, rootReducer };
