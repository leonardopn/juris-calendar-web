import "@fontsource/roboto";
import { ChakraProvider, CircularProgress } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { AppRoutes } from "./routes";
import { persistor, store } from "./store/store";
import { theme } from "./theme/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<ChakraProvider theme={theme}>
				<PersistGate
					loading={<CircularProgress isIndeterminate color="purple.300" />}
					persistor={persistor}>
					<AppRoutes />
					<ToastContainer />
				</PersistGate>
			</ChakraProvider>
		</ReduxProvider>
	</React.StrictMode>
);
