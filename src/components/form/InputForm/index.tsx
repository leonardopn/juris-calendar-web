import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { NumberFormatValues } from "react-number-format/types/types";

interface InputFormProps<T extends FieldValues> extends InputProps {
	label?: string;
	name: Path<T>;
	control: Control<T>;
	mask?: Omit<PatternFormatProps, keyof InputProps>;
}

export function InputForm<T extends FieldValues>({
	label,
	control,
	name,
	mask,
	...rest
}: InputFormProps<T>) {
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
			{mask ? (
				<Input
					as={PatternFormat}
					{...mask}
					{...rest}
					{...fieldRest}
					getInputRef={ref}
					onValueChange={(e: NumberFormatValues) => onChange(e.formattedValue)}
				/>
			) : (
				<Input {...fieldRest} {...fieldRest} ref={ref} onChange={onChange} />
			)}
			{!!error && <FormErrorMessage fontWeight={"bold"}>{error.message}</FormErrorMessage>}
		</FormControl>
	);
}
