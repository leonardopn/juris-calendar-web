import { configureStore } from "@reduxjs/toolkit";
import { serializableMiddleware } from "./middlewares/serializableMiddleware";
import processSlice from "./slices/Process.slice";

export const store = configureStore({
	reducer: { process: processSlice },
	middleware: [serializableMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
