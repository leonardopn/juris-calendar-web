import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Props, Select } from "chakra-react-select";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface SelectFormProps<T extends FieldValues> extends Props {
	label?: string;
	name: Path<T>;
	control: Control<T>;
}

export function SelectForm<T extends FieldValues>({
	label,
	control,
	name,
	...rest
}: SelectFormProps<T>) {
	const {
		field: { onChange, ...fieldRest },
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
			<Select onChange={newValue => onChange(newValue)} {...rest} {...fieldRest} />
			{!!error && <FormErrorMessage fontWeight={"bold"}>{error.message}</FormErrorMessage>}
		</FormControl>
	);
}
