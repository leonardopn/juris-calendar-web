import { useTheme as chakraUseTheme } from "@chakra-ui/react";
import { Theme } from "../theme/theme";

export function useTheme() {
	const theme = chakraUseTheme<Theme>();
	return theme;
}
