import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	ButtonGroup,
	Container,
	Flex,
	IconButton,
	Input,
	Stack,
	VStack,
} from "@chakra-ui/react";
import { Card } from "../Card";
import { Header } from "../Header";

export function ProcessForm() {
	return (
		<Stack flex="1" padding={10}>
			<Container maxW={"4xl"}>
				<Header
					icon="ion:file-tray-stacked"
					title="Processos"
					subTitle="Cadastre um processo"
				/>
				<Card mt="5!important">
					<VStack spacing={3}>
						<Input placeholder="Número" />
						<Input placeholder="Parte" />
						<Input placeholder="Assunto" />
						<Flex justify="space-between" w="full" mt="10!important">
							<Button colorScheme={"red"}>Reset</Button>
							<ButtonGroup
								isAttached
								alignSelf="end"

								colorScheme="main">
								<Button>Criar</Button>
								<IconButton
									aria-label="adiciona mais um processo"
									icon={<AddIcon />}
								/>
							</ButtonGroup>
						</Flex>
					</VStack>
				</Card>
			</Container>
		</Stack>
	);
}
