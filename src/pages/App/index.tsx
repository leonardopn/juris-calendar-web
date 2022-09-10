import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar";

function App() {
	return (
		<Flex>
			<NavBar />
			<Outlet />
		</Flex>
	);
}

export default App;
