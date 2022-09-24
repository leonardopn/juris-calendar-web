import { VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { MemorandumToCreate } from "../../../@types/Memorandum";
import { Task, TaskCategory, TaskStatus } from "../../../@types/Task";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { TASK_VALIDATION } from "../../../utils/yup";
import { InputForm } from "../../form/InputForm";
import { SelectForm } from "../../form/SelectForm";
import { TextAreaForm } from "../../form/TextAreaForm";

interface TaskModalEditFormProps {
	task: Task;
}

interface EditTaskFormProps
	extends Omit<Task, "id" | "processId" | "createdAt" | "updatedAt" | "category" | "status"> {
	process: { label: string; value: string } | null;
	category: { label: TaskCategory; value: string } | null;
	status: { label: TaskStatus; value: string } | null;
	memorandums: MemorandumToCreate[];
}

export function TaskModalEditForm({ task }: TaskModalEditFormProps) {
	const { process: processArray } = useAppSelector(state => state.process);

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

	const defaultValues: Partial<EditTaskFormProps> = useMemo(
		() => ({
			initialDate: task.initialDate,
			finalDate: task.finalDate,
			category: categoryOptions.find(option => option.value === task.category) || null,
			obs: task.obs,
			status: statusOptions.find(option => option.value === task.status) || null,
			process: processOptions.find(option => option.value === task.processId) || null,
		}),
		[task]
	);

	const { control, reset } = useForm<EditTaskFormProps>({
		defaultValues,
		resolver: yupResolver(TASK_VALIDATION),
	});

	useEffect(() => {
		reset(defaultValues);
	}, [task]);

	return (
		<VStack spacing={3}>
			<InputForm label="Data inicial" control={control} name="initialDate" type="date" />
			<InputForm label="Data final" control={control} name="finalDate" type="date" />

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
			<TextAreaForm label="Observações" control={control} name="obs" />
		</VStack>
	);
}
