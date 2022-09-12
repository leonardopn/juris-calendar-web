import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../pages/App";
import { MemorandumNew } from "../pages/Memorandum/MemorandumNew";
import { ProcessNew } from "../pages/Process/ProcessNew";
// import your route components too

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="process/new" element={<ProcessNew />} />
					<Route path="memorandum/new" element={<MemorandumNew />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
