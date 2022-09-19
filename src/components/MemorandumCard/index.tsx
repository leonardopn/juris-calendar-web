import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Td, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";

interface MemorandumCardProps {
	id: string;
	number: string;
	destiny: string;
	returnDate: string;
	onDelete: (id: string) => void;
}

export function MemorandumCard({ id, onDelete, destiny, number, returnDate }: MemorandumCardProps) {
	return (
		<Tr>
			<Td>{number}</Td>
			<Td>{destiny}</Td>
			<Td>{dayjs(returnDate).format("DD/MM/YYYY")}</Td>
			<Td isNumeric>
				<IconButton
					onClick={() => onDelete(id)}
					colorScheme="purple"
					aria-label="Search database"
					icon={<DeleteIcon />}
				/>
			</Td>
		</Tr>
	);
}
