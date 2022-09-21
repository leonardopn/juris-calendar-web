import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("pt-br");
dayjs.extend(duration);
dayjs.extend(relativeTime);

export function humanizeDuration(date: Date) {
	const duration = dayjs.duration(-dayjs().diff(date));
	const days = duration.days();
	const minutes = duration.minutes();

	if (minutes <= -5 && Math.abs(days) === 0) {
		return dayjs(date).format("HH:mm");
	}
	if (days <= -7) return dayjs(date).format("DD MMM YY");
	return duration.humanize(true);
}

export { dayjs as dayjsPtBr };
