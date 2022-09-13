import dayjs from "dayjs";
import * as yup from "yup";

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

export const MEMORANDUM_VALIDATION = yup
	.object({
		id: yup.string().required("O número é obrigatório"),
		destiny: yup.string().required("O destino é obrigatório"),
		process: yup
			.object({
				value: yup.string(),
				label: yup.string(),
			})
			.required("O processo é obrigatório")
			.nullable(true),
		returnDate: yup
			.string()
			.required("A data de retorno é obrigatória")
			.test("isDate", "A data deve ser válida e posterior à hoje", value => {
				const dateToTest = dayjs(value);
				return dateToTest.isValid();
			}),
	})
	.required();
