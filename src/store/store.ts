import { configureStore } from "@reduxjs/toolkit";
import { serializableMiddleware } from "./middlewares/serializableMiddleware";
import processSlice from "./slices/Process.slice";
import memorandumSlice from "./slices/Memorandum.slice";

export const store = configureStore({
	reducer: { process: processSlice, memorandum: memorandumSlice },
	middleware: [serializableMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
