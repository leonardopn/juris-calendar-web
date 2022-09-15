import dayjs from "dayjs";
import * as yup from "yup";

interface MemorandumValidationProps {
	task?: boolean;
}

export const PROCESS_VALIDATION = yup
	.object({
		id: yup
			.string()
			.required("O número é obrigatório")
			.test("is-id", "O número deve conter 20 dígitos", value => {
				return value?.replaceAll(/[^\d]/gm, "").length === 20;
			}),

		part: yup.string().optional(),
		subject: yup.string().optional(),
	})
	.required();

export const MEMORANDUM_VALIDATION = (options?: MemorandumValidationProps) =>
	yup
		.object({
			numero: yup.string().required("O número é obrigatório"),
			destiny: yup.string().required("O destino é obrigatório"),
			task: options?.task
				? yup.string().nullable().required("A tarefa é obrigatória")
				: yup.string().nullable().optional(),
			returnDate: yup
				.string()
				.required("A data de retorno é obrigatória")
				.test("isDate", "A data deve ser válida e posterior à hoje", value => {
					const dateToTest = dayjs(value);
					return dateToTest.isValid();
				}),
		})
		.required();
