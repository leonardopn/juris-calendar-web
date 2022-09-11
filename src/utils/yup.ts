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
