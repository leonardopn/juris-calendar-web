import { Flex, Heading, Icon as ChakraIcon, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

interface HeaderProps {
	icon: string;
	title: string;
	subTitle: string;
}

export function Header({ icon, subTitle, title }: HeaderProps) {
	return (
		<Flex align="center" gap="3">
			<ChakraIcon as={Icon} icon={icon} w="10" h="10" color="text.600" />
			<Stack>
				<Heading size="md" color="main.300">
					{title}
				</Heading>
				<Text fontSize="md" marginTop="0!important" color="text.600">
					{subTitle}
				</Text>
			</Stack>
		</Flex>
	);
}
