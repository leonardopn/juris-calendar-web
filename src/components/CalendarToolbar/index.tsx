import { Button, Flex, Heading, IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { useMemo } from "react";
import { CalendarView } from "../../@types/Calendar";
import { VoidFunction } from "../../@types/Function";
import { dayjsPtBr } from "../../utils/date";

const VIEW_OPTIONS = [
	{ value: "dayGridMonth", label: "Mês", icon: "ic:round-view-module" },
	{ value: "timeGridWeek", label: "Semana", icon: "ic:round-view-week" },
	{ value: "timeGridDay", label: "Dia", icon: "ic:round-view-day" },
	{ value: "listWeek", label: "Agenda", icon: "ic:round-view-agenda" },
] as const;

export interface CalendarToolbarProps {
	date: Date;
	view: CalendarView;
	onToday: VoidFunction;
	onNextDate: VoidFunction;
	onPrevDate: VoidFunction;
	onChangeView: (newView: CalendarView) => void;
}

export function CalendarToolbar({
	date,
	view,
	onToday,
	onNextDate,
	onPrevDate,
	onChangeView,
}: CalendarToolbarProps) {
	const formattedDate = useMemo(() => {
		if (view === "dayGridMonth") return dayjsPtBr(date).format("MMMM YYYY");
		if (view === "timeGridWeek" || view === "listWeek")
			return dayjsPtBr(date)
				.startOf("week")
				.format(`DD [até] ${dayjsPtBr(date).endOf("week").format("DD")} [de] MMMM YYYY`);
		return dayjsPtBr(date).format("DD MMMM YYYY");
	}, [date, view]);

	return (
		<Flex align-items="center" flex-direction="column" padding="1.25rem" justify="space-between">
			<Stack direction="row" spacing={3}>
				{VIEW_OPTIONS.map(viewOption => (
					<Tooltip key={viewOption.value} title={viewOption.label}>
						<IconButton
							colorScheme={view === viewOption.value ? "main" : "gray"}
							aria-label="button-select-view"
							value={view}
							onClick={() => onChangeView(viewOption.value)}
							>
							<Icon icon={viewOption.icon} width={20} height={20} />
						</IconButton>
					</Tooltip>
				))}
			</Stack>
			<Stack direction="row" alignItems="center" spacing={2}>
				<IconButton aria-label="button-return" onClick={onPrevDate}>
					<Icon icon="eva:arrow-ios-back-fill" width={20} height={20} />
				</IconButton>
				<Heading as="h6" size='md'>{formattedDate}</Heading>
				<IconButton aria-label="button-next" onClick={onNextDate}>
					<Icon icon="eva:arrow-ios-forward-fill" width={20} height={20} />
				</IconButton>
			</Stack>
			<Button colorScheme="main" onClick={onToday}>
				Hoje
			</Button>
		</Flex>
	);
}
