import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../pages/App";
// import your route components too

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
			</Routes>
		</BrowserRouter>
	);
}
