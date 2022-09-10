import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface InputFormProps<T extends FieldValues> extends InputProps {
	label?: string;
	name: Path<T>;
	control: Control<T>;
}

export function InputForm<T extends FieldValues>({
	label,
	control,
	name,
	...rest
}: InputFormProps<T>) {
	const {
		field,
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
			<Input {...field} {...rest} />
			{!!error && <FormErrorMessage fontWeight={"bold"}>{error.message}</FormErrorMessage>}
		</FormControl>
	);
}
