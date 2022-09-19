import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	ButtonGroup,
	Container,
	Flex,
	IconButton,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tooltip,
	Tr,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { MemorandumToCreate } from "../../@types/Memorandum";
import { Task, TaskCategory, TaskStatus } from "../../@types/Task";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useTheme } from "../../hooks/useTheme";
import { addMemorandum } from "../../store/slices/Memorandum.slice";
import { addTask } from "../../store/slices/Task.slice";
import { TASK_VALIDATION } from "../../utils/yup";
import { Card } from "../Card";
import { DrawerNewMemorandum } from "../DrawerNewMemorandum";
import { InputForm } from "../form/InputForm";
import { SelectForm } from "../form/SelectForm";
import { Header } from "../Header";
import { MemorandumCard } from "../MemorandumCard";

interface AddTaskFormProps
	extends Omit<Task, "id" | "processId" | "createdAt" | "updatedAt" | "category" | "status"> {
	process: { label: string; value: string } | null;
	category: { label: string; value: TaskCategory } | null;
	status: { label: string; value: TaskStatus } | null;
	memorandums: MemorandumToCreate[];
}

export function TaskForm() {
	const {
		control,
		handleSubmit,
		reset,
		setValue,
		watch,
		getValues,
		formState: { isDirty, isSubmitting },
	} = useForm<AddTaskFormProps>({
		defaultValues: {
			initialDate: "",
			finalDate: "",
			obs: "",
			process: null,
			category: null,
			status: null,
			memorandums: [],
		},
		resolver: yupResolver(TASK_VALIDATION),
	});
	const dispatch = useAppDispatch();
	const { shadow } = useTheme();
	const { process: processArray } = useAppSelector(state => state.process);
	const { memorandums } = useAppSelector(state => state.memorandum);
	const navigate = useNavigate();
	const drawerController = useDisclosure();
	const memorandumsToCreate = watch("memorandums");

	const processOptions = useMemo(() => {
		return processArray.map(process => ({
			label: `${process.number} - Parte: ${process.part}, Assunto: ${process.subject}`,
			value: process.id,
		}));
	}, [processArray]);

	const categoryOptions = useMemo(() => {
		const categories = Object.entries(TaskCategory);

		return categories.map(category => ({
			label: category[1],
			value: category[0],
		}));
	}, []);

	const statusOptions = useMemo(() => {
		const entriesStatus = Object.entries(TaskStatus);

		return entriesStatus.map(status => ({
			label: status[1],
			value: status[0],
		}));
	}, []);

	async function handleSubmitWithOutNavigate() {
		await handleSubmit(onSubmit)();
		navigate("/task/new");
	}

	const onSubmit: SubmitHandler<AddTaskFormProps> = async data => {
		async function createTask() {
			const task: Task = {
				id: v4(),
				category: data.category!.value,
				status: data.status!.value,
				finalDate: data.finalDate,
				initialDate: data.initialDate,
				processId: data.process!.value,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			data.memorandums.forEach(memorandum => {
				dispatch(addMemorandum({ ...memorandum, taskId: task.id }));
			});

			dispatch(addTask(task));
			reset();
			navigate("/");
		}

		await toast.promise(createTask, {
			pending: "Criando tarefa",
			success: "Tarefa criada com sucesso",
			error: {
				render({ data }) {
					return data.message;
				},
			},
		});
	};

	function handleAddMemorandum(value: MemorandumToCreate) {
		setValue("memorandums", [...getValues("memorandums"), value]);
	}

	function handleRemoveMemorandum(id: string) {
		const memorandums = getValues("memorandums").filter(memorandum => memorandum.id !== id);
		setValue("memorandums", memorandums);
	}

	return (
		<Stack flex="1" padding={10}>
			<Container maxW={"4xl"}>
				<Header
					icon="fluent:clipboard-task-list-rtl-24-filled"
					title="Tarefas"
					subTitle="Cadastre uma nova tarefa"
				/>
				<Card mt="5!important" as="form" onSubmit={handleSubmit(onSubmit)}>
					<VStack spacing={3}>
						<InputForm
							label="Data inicial"
							control={control}
							name="initialDate"
							type="date"
						/>
						<InputForm
							label="Data final"
							control={control}
							name="finalDate"
							type="date"
						/>
						<SelectForm
							control={control}
							name="process"
							label="Processo"
							placeholder="Processo associado"
							isClearable
							options={processOptions}
						/>
						<SelectForm
							control={control}
							name="category"
							label="Categoria"
							placeholder="Categoria da tarefa"
							isClearable
							options={categoryOptions}
						/>
						<SelectForm
							control={control}
							name="status"
							label="Status"
							placeholder="Status da tarefa"
							isClearable
							options={statusOptions}
						/>
						<Button
							leftIcon={<AddIcon />}
							colorScheme="purple"
							onClick={drawerController.onOpen}
							alignSelf="flex-start">
							Adicionar memorando
						</Button>
						<DrawerNewMemorandum
							memorandums={[...memorandumsToCreate, ...memorandums]}
							addMemorandum={handleAddMemorandum}
							drawerController={drawerController}
						/>
						<TableContainer
							bg="gray.50"
							borderRadius="md"
							w="full"
							boxShadow={shadow.intern}
							maxH="300px"
							minH="185px"
							overflowY={"auto"}>
							<Table variant="striped" colorScheme="gray">
								<Thead bg="purple.500">
									<Tr>
										<Th color="white">Número</Th>
										<Th color="white">Destino</Th>
										<Th color="white">Data</Th>
										<Th isNumeric color="white">
											Opções
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									{memorandumsToCreate.map(memorandum => (
										<MemorandumCard
											onDelete={handleRemoveMemorandum}
											id={memorandum.id}
											destiny={memorandum.destiny}
											number={memorandum.number}
											returnDate={memorandum.returnDate}
											key={memorandum.id}
										/>
									))}
								</Tbody>
							</Table>
						</TableContainer>
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
								<Tooltip label="Cria mais uma tarefa">
									<IconButton
										onClick={handleSubmitWithOutNavigate}
										isLoading={isSubmitting}
										aria-label="adiciona mais uma tarefa"
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
