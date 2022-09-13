import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../pages/App";
import { MemorandumNew } from "../pages/Memorandum/MemorandumNew";
import { ProcessNew } from "../pages/Process/ProcessNew";
import { TaskNew } from "../pages/Task/TaskNew";
// import your route components too

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="process/new" element={<ProcessNew />} />
					<Route path="memorandum/new" element={<MemorandumNew />} />
					<Route path="task/new" element={<TaskNew />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
