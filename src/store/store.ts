import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./reducers";
import memorandumSlice from "./slices/Memorandum.slice";

export const store = configureStore({
	reducer: persistReducer(rootPersistConfig, rootReducer),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
