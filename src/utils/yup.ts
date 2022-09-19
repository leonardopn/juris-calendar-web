import dayjs from "dayjs";
import * as yup from "yup";

interface MemorandumValidationProps {
	task?: boolean;
}

export const PROCESS_VALIDATION = yup
	.object({
		number: yup
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
				.test("isDate", "A data deve ser válida", value => {
					const dateToTest = dayjs(value);
					return dateToTest.isValid();
				}),
		})
		.required();

export const TASK_VALIDATION = yup
	.object({
		initialDate: yup
			.string()
			.required("A data inicial é obrigatória")
			.test("isDate", "A data deve ser válida", value => {
				const dateToTest = dayjs(value);
				return dateToTest.isValid();
			}),
		finalDate: yup
			.string()
			.required("A data final é obrigatória")
			.test(
				"isDate",
				"A data deve ser válida e posterior a data inicial",
				(value, context) => {
					const dateToTest = dayjs(value);
					const initialDate = dayjs(context.parent.initialDate);
					return dateToTest.isValid() && dateToTest.isAfter(initialDate);
				}
			),
		process: yup.object().nullable().required("O processo é obrigatório"),
		category: yup.object().nullable().required("A categoria é obrigatória"),
		status: yup.object().nullable().required("O status é obrigatório"),
	})
	.required();
