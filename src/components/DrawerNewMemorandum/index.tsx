import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Memorandum } from "../../@types/Memorandum";
import { MEMORANDUM_VALIDATION } from "../../utils/yup";
import { InputForm } from "../form/InputForm";
import { Header } from "../Header";

interface AddMemorandumFormProps {
	id: string;
	destiny: string;
	returnDate: string;
}

interface DrawerNewMemorandumProps {
	addMemorandum: (memorandum: Memorandum) => void;
	drawerController: ReturnType<typeof useDisclosure>;
}

export function DrawerNewMemorandum({ addMemorandum, drawerController }: DrawerNewMemorandumProps) {
	const { isOpen, onClose } = drawerController;

	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty, isSubmitting },
	} = useForm<AddMemorandumFormProps>({
		defaultValues: {
			id: "",
			destiny: "",
			returnDate: "",
		},
		resolver: yupResolver(MEMORANDUM_VALIDATION),
	});

	const onSubmit: SubmitHandler<AddMemorandumFormProps> = async data => {
		async function createMemorandum() {
			const memorandum: Memorandum = {
				id: data.id,
				isReturned: false,
				destiny: data.destiny,
				returnDate: data.returnDate,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			addMemorandum(memorandum);
		}

		await toast
			.promise(createMemorandum, {
				pending: "Criando Memorando",
				success: "Memorando criado com sucesso",
				error: {
					render({ data }) {
						return data.message;
					},
				},
			})
			.finally(() => {
				reset();
				onClose();
			});
	};

	function handleOnClose() {
		reset();
		onClose();
	}

	return (
		<Drawer size="xl" isOpen={isOpen} placement="right" onClose={handleOnClose}>
			<DrawerOverlay />
			<form onSubmit={handleSubmit(onSubmit)}>
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px">
						<Header
							icon="bi:envelope-paper-fill"
							title="Memorandos"
							subTitle="Cadastre um memorando"
						/>
					</DrawerHeader>
					<DrawerBody>
						<VStack spacing={3}>
							<InputForm
								label="Número do memorando"
								control={control}
								name="id"
								placeholder="1350"
							/>
							<InputForm
								label="Destino do memorando"
								control={control}
								name="destiny"
								placeholder="SMF"
							/>
							<InputForm
								label="Data de retorno"
								control={control}
								name="returnDate"
								type="date"
							/>
						</VStack>
						<DevTool control={control} />
					</DrawerBody>
					<DrawerFooter borderTopWidth="1px" justifyContent="space-between">
						<Button
							colorScheme="red"
							mr={3}
							onClick={handleOnClose}
							disabled={isSubmitting}>
							Cancelar
						</Button>
						<Box>
							<Button
								colorScheme="red"
								mr={3}
								onClick={() => reset()}
								disabled={!isDirty}
								type="reset">
								Resetar
							</Button>
							<Button colorScheme="purple" isLoading={isSubmitting} type="submit">
								Criar
							</Button>
						</Box>
					</DrawerFooter>
				</DrawerContent>
			</form>
		</Drawer>
	);
}
