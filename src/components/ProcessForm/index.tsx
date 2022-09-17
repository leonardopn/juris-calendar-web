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
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { Process } from "../../@types/Process";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addProcess } from "../../store/slices/Process.slice";
import { PROCESS_NUMBER_MASK } from "../../utils/mask";
import { PROCESS_VALIDATION } from "../../utils/yup";
import { Card } from "../Card";
import { InputForm } from "../form/InputForm";
import { Header } from "../Header";

interface AddProcessFormProps {
	number: string;
	part: string;
	subject: string;
}

export function ProcessForm() {
	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty, isSubmitting },
	} = useForm<AddProcessFormProps>({
		defaultValues: { number: "", part: "", subject: "" },
		resolver: yupResolver(PROCESS_VALIDATION),
	});
	const dispatch = useAppDispatch();
	const { process: processArray } = useAppSelector(state => state.process);
	const navigate = useNavigate();

	async function handleSubmitWithOutNavigate() {
		await handleSubmit(onSubmit)();
		navigate("/process/new");
	}

	const onSubmit: SubmitHandler<AddProcessFormProps> = async data => {
		async function createProcess() {
			const process: Process = {
				...data,
				id: v4(),
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			const findProcess = processArray.find(p => p.number === process.number);

			if (!findProcess) {
				dispatch(addProcess(process));
				reset();
				navigate("/");
			} else {
				throw new Error("Processo já cadastrado");
			}
		}

		await toast.promise(createProcess, {
			pending: "Criando processo",
			success: "Processo criado com sucesso",
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
					icon="ion:file-tray-stacked"
					title="Processos"
					subTitle="Cadastre um processo"
				/>
				<Card mt="5!important" as="form" onSubmit={handleSubmit(onSubmit)}>
					<VStack spacing={3}>
						<InputForm
							label="Número do processo"
							control={control}
							name="number"
							placeholder={PROCESS_NUMBER_MASK.placeholder}
							mask={PROCESS_NUMBER_MASK}
						/>
						<InputForm
							label="Parte do processo"
							control={control}
							name="part"
							placeholder="Nome da parte"
						/>
						<InputForm
							label="Assunto do processo"
							control={control}
							name="subject"
							placeholder="Descontos indevidos"
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
								<Tooltip label="Cria mais um processo">
									<IconButton
										onClick={handleSubmitWithOutNavigate}
										isLoading={isSubmitting}
										aria-label="adiciona mais um processo"
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
