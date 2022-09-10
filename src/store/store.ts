import { configureStore } from "@reduxjs/toolkit";
import processSlice from "./slices/Process.slice";

export const store = configureStore({
	reducer: { process: processSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
