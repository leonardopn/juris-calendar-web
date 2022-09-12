import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from "./routes";
import { store } from "./store/store";
import { theme } from "./theme/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<ChakraProvider theme={theme}>
				<AppRoutes />
				<ToastContainer />
			</ChakraProvider>
		</ReduxProvider>
	</React.StrictMode>
);
