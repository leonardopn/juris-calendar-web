import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

const extendThemeProps = {
	colors: {
		main: ChakraTheme.colors.purple,
		text: ChakraTheme.colors.gray,
	},
	shadow: {
		main: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
	},
	styles: {
		global: {
			body: { backgroundColor: "gray.50" },
		},
	},
};

export const theme = extendTheme(extendThemeProps);

export type Theme = typeof extendThemeProps;
