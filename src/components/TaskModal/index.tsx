import { EditIcon } from "@chakra-ui/icons";
import {
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { Task } from "../../@types/Task";

interface TaskModalProps {
	controller: ReturnType<typeof useDisclosure>;
	task: Task | null;
}

export function TaskModal({ controller, task }: TaskModalProps) {
	const { isOpen, onClose } = controller;

	if (!task) return null;

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Modal Title</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{task.category}</ModalBody>
				<ModalFooter>
					<IconButton aria-label="button-edit" colorScheme="main" mr={3} onClick={onClose}>
						<EditIcon />
					</IconButton>
					<Button colorScheme="red" mr={3} onClick={onClose}>
						Fechar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
