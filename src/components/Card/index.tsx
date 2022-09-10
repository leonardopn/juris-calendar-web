import { Box, BoxProps } from "@chakra-ui/react";
import { useTheme } from "../../hooks/useTheme";

interface CardProps extends BoxProps {}

export function Card({ ...rest }: CardProps) {
	const theme = useTheme();

	return <Box bg="white" borderRadius="md" p="5" boxShadow={theme.shadow.main} {...rest} />;
}
