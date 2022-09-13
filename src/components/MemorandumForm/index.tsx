import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	ButtonGroup,
	Container,
	Flex,
	IconButton,
	Stack,
	Tooltip,
	VStack,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Memorandum } from "../../@types/Memorandum";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addMemorandum } from "../../store/slices/Process.slice";

import { MEMORANDUM_VALIDATION } from "../../utils/yup";
import { Card } from "../Card";
import { InputForm } from "../form/InputForm";
import { SelectForm } from "../form/SelectForm";
import { Header } from "../Header";

interface AddMemorandumFormProps {
	id: string;
	destiny: string;
	process: { label: string; value: string } | null;
	returnDate: string;
}

export function MemorandumForm() {
	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty, isSubmitting },
	} = useForm<AddMemorandumFormProps>({
		defaultValues: {
			id: "",
			destiny: "",
			process: null,
			returnDate: "",
		},
		resolver: yupResolver(MEMORANDUM_VALIDATION),
	});
	const dispatch = useAppDispatch();
	const { process: processArray } = useAppSelector(state => state.process);
	const process = useAppSelector(state => state.process.process);
	const navigate = useNavigate();

	const processOptions = useMemo(() => {
		return processArray.map(process => ({
			label: `${process.id} - Parte: ${process.part}, Assunto: ${process.subject}`,
			value: process.id,
		}));
	}, [processArray]);

	async function handleSubmitWithOutNavigate() {
		await handleSubmit(onSubmit)();
		navigate("/memorandum/new");
	}

	const onSubmit: SubmitHandler<AddMemorandumFormProps> = async data => {
		async function createProcess() {
			const memorandum: Memorandum = {
				id: data.id,
				isReturned: false,
				destiny: data.destiny,
				returnDate: data.returnDate,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			const foundProcess = process.find(process => process.id === data.process?.value);

			if (foundProcess) {
				const foundMemorandum = foundProcess.memorandums.find(
					memorandum => memorandum.id === memorandum.id
				);

				if (!foundMemorandum) {
					dispatch(addMemorandum({ memorandum, processId: foundProcess.id }));
					reset();
					navigate("/");
				} else {
					throw new Error("Memorando já cadastrado");
				}
			} else {
				throw new Error("Processo não encontrado");
			}
		}

		await toast.promise(createProcess, {
			pending: "Criando Memorando",
			success: "Memorando criado com sucesso",
			error: {
				render({ data }) {
					return data.message;
				},
			},
		});
	};

	return (
		<Stack flex="1" padding={10}>
			<Container maxW={"4xl"}>
				<Header
					icon="bi:envelope-paper-fill"
					title="Memorandos"
					subTitle="Cadastre um memorando"
				/>
				<Card mt="5!important" as="form" onSubmit={handleSubmit(onSubmit)}>
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
						<SelectForm
							control={control}
							name="process"
							label="Número do processo"
							placeholder="Número do processo"
							isClearable
							options={processOptions}
						/>
						<InputForm
							label="Data de retorno"
							control={control}
							name="returnDate"
							type="date"
						/>
						<Flex justify="space-between" w="full" mt="10!important">
							<Button
								colorScheme={"red"}
								type="reset"
								onClick={() => reset()}
								disabled={!isDirty}>
								Resetar
							</Button>
							<ButtonGroup isAttached alignSelf="end" colorScheme="main">
								<Button type="submit" isLoading={isSubmitting}>
									Criar
								</Button>
								<Tooltip label="Cria mais um memorando">
									<IconButton
										onClick={handleSubmitWithOutNavigate}
										isLoading={isSubmitting}
										aria-label="adiciona mais um memorando"
										icon={<AddIcon />}
									/>
								</Tooltip>
							</ButtonGroup>
						</Flex>
					</VStack>
				</Card>
				<DevTool control={control} />
			</Container>
		</Stack>
	);
}
