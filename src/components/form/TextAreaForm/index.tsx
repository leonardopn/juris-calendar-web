import { FormControl, FormErrorMessage, FormLabel, Textarea, TextareaProps } from "@chakra-ui/react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface TextAreaFormProps<T extends FieldValues> extends TextareaProps {
	label?: string;
	name: Path<T>;
	control: Control<T>;
}

export function TextAreaForm<T extends FieldValues>({
	label,
	control,
	name,
	...rest
}: TextAreaFormProps<T>) {
	const {
		field: { ref, onChange, ...fieldRest },
		fieldState: { error },
	} = useController({ control, name });

	return (
		<FormControl isInvalid={!!error}>
			{label && (
				<FormLabel
					fontWeight={error ? "bold" : "normal"}
					color={error ? "red.500" : "inherit"}>
					{label}
				</FormLabel>
			)}
			<Textarea {...rest} {...fieldRest} ref={ref} onChange={onChange} />
			{!!error && <FormErrorMessage fontWeight={"bold"}>{error.message}</FormErrorMessage>}
		</FormControl>
	);
}
