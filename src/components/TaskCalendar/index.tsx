import "@fullcalendar/react/dist/vdom";
import FullCalendar, { EventInput } from "@fullcalendar/react"; // must go before plugins
import { Box, useDimensions } from "@chakra-ui/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useMemo, useRef, useState } from "react";
import { CalendarView } from "../../@types/Calendar";
import { TaskCategory } from "../../@types/Task";
import { useAppSelector } from "../../hooks/useAppSelector";
import { CalendarToolbar } from "../CalendarToolbar";

export function TaskCalendar() {
	const [date, setDate] = useState(new Date());
	const [view, setView] = useState<CalendarView>("dayGridMonth");

	const calendarRef = useRef<FullCalendar>(null);
	const elementRef = useRef<HTMLDivElement>(null);
	const dimensions = useDimensions(elementRef);

	const { tasks } = useAppSelector(state => state.task);
	const { process } = useAppSelector(state => state.process);

	const events = useMemo(
		() =>
			tasks.map(task => {
				const category = Object.entries(TaskCategory).find(
					category => category[0] === task.category
				);
				const foundProcess = process.find(process => process.id === task.processId);
				const event: EventInput = {
					id: task.id,
					title: `${category?.[1]} - ${foundProcess?.number}`,
					date: task.initialDate,
					allDay: true,
					end: task.finalDate,
				};
				return event;
			}),
		[tasks]
	);

	const handleClickToday = () => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.today();
			setDate(calendarApi.getDate());
		}
	};

	const handleChangeView = (newView: CalendarView) => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.changeView(newView);
			setView(newView);
		}
	};

	const handleClickDatePrev = () => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.prev();
			setDate(calendarApi.getDate());
		}
	};

	const handleClickDateNext = () => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.next();
			setDate(calendarApi.getDate());
		}
	};

	return (
		<Box w="full" h="full">
			<CalendarToolbar
				date={date}
				view={view}
				onNextDate={handleClickDateNext}
				onPrevDate={handleClickDatePrev}
				onToday={handleClickToday}
				onChangeView={handleChangeView}
			/>
			<Box ref={elementRef} h={`calc(100% - ${dimensions?.contentBox.top}px)`}>
				<FullCalendar
					events={events}
					initialDate={date}
					initialView={view}
					height={"100%"}
					ref={calendarRef}
					locale="pt-br"
					weekends
					rerenderDelay={10}
					dayMaxEventRows={3}
					eventDisplay="block"
					headerToolbar={false}
					allDayMaintainDuration
					eventResizableFromStart
					plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
				/>
			</Box>
		</Box>
	);
}
