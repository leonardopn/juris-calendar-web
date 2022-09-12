import {
	Link as ChakraLink,
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function NavBar() {
	return (
		<VStack p={3} w="80" bg="purple.300" h="100vh" color="white" paddingY="10">
			<Accordion allowToggle w="full">
				<AccordionItem flex="1">
					<AccordionButton fontWeight="bold">
						<ChakraLink as={Link} to="/">
							Início
						</ChakraLink>
					</AccordionButton>
				</AccordionItem>
				<AccordionItem flex="1">
					<AccordionButton>
						<Box flex="1" textAlign="left" fontWeight="bold">
							Processos
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel>
						<ChakraLink as={Link} to="process/new">
							Criar
						</ChakraLink>
					</AccordionPanel>
				</AccordionItem>
				<AccordionItem flex="1">
					<AccordionButton>
						<Box flex="1" textAlign="left" fontWeight="bold">
							Tarefas
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel>
						<ChakraLink as={Link} to="task/new">
							Criar
						</ChakraLink>
					</AccordionPanel>
				</AccordionItem>
				<AccordionItem flex="1">
					<AccordionButton>
						<Box flex="1" textAlign="left" fontWeight="bold">
							Memorandos
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel>
						<ChakraLink as={Link} to="memorandum/new">
							Criar
						</ChakraLink>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</VStack>
	);
}
