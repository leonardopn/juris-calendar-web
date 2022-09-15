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
import { v4 } from "uuid";
import { Memorandum } from "../../@types/Memorandum";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addMemorandum } from "../../store/slices/Memorandum.slice";
import { MEMORANDUM_VALIDATION } from "../../utils/yup";
import { Card } from "../Card";
import { InputForm } from "../form/InputForm";
import { SelectForm } from "../form/SelectForm";
import { Header } from "../Header";

interface AddMemorandumFormProps {
	numero: string;
	destiny: string;
	task: { label: string; value: string } | null;
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
			numero: "",
			destiny: "",
			task: null,
			returnDate: "",
		},
		resolver: yupResolver(MEMORANDUM_VALIDATION({ task: true })),
	});
	const dispatch = useAppDispatch();
	const { tasks: taskArray } = useAppSelector(state => state.task);
	const { memorandums } = useAppSelector(state => state.memorandum);
	const navigate = useNavigate();

	const taskOptions = useMemo(() => {
		return taskArray.map(task => ({
			label: `Tarefa: ${task.id} - Processo: ${task.processId}`,
			value: task.id,
		}));
	}, [taskArray]);

	async function handleSubmitWithOutNavigate() {
		await handleSubmit(onSubmit)();
		navigate("/memorandum/new");
	}

	const onSubmit: SubmitHandler<AddMemorandumFormProps> = async data => {
		async function createMemorandum() {
			const memorandumToCreate: Memorandum = {
				id: v4(),
				number: data.numero,
				isReturned: false,
				destiny: data.destiny,
				returnDate: data.returnDate,
				createdAt: new Date(),
				updatedAt: new Date(),
				taskId: data.task!.value,
			};

			const foundTask = taskArray.find(task => task.id === data.task?.value);

			if (foundTask) {
				const foundMemorandum = memorandums.find(
					memorandum =>
						memorandum.id === memorandumToCreate.id ||
						memorandum.number === memorandumToCreate.number
				);

				if (!foundMemorandum) {
					dispatch(addMemorandum(memorandumToCreate));
					reset();
					navigate("/");
				} else {
					throw new Error("Memorando já cadastrado");
				}
			} else {
				throw new Error("Tarefa não encontrada");
			}
		}

		await toast.promise(createMemorandum, {
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
							name="numero"
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
							name="task"
							label="Tarefa associada"
							placeholder="Tarefa"
							isClearable
							options={taskOptions}
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
