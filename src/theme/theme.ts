import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

const extendThemeProps = {
	fonts: {
		body: `'Roboto', sans-serif`,
	},
	colors: {
		main: ChakraTheme.colors.purple,
		text: ChakraTheme.colors.gray,
	},
	shadow: {
		main: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
		intern: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;",
	},
	styles: {
		global: {
			body: { backgroundColor: "gray.50" },
		},
	},
};

export const theme = extendTheme(extendThemeProps);

export type Theme = typeof extendThemeProps;
