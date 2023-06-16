export interface ITimeIntervals {
	label: string;
	value: string;
}

export const getTimeSlotsAfterOneHour: () => ITimeIntervals[] = () => {
	const now: Date = new Date();
	const currentHour: number = now.getHours();
	const currentMinute: number = now.getMinutes();

	let nextHour: number = currentHour + 1;

	if (currentMinute >= 30) {
		nextHour++;
	}

	const intervals: ITimeIntervals[] = [];

	while (nextHour < 24) {
		intervals.push({
			label: `${nextHour}:00`,
			value: `${nextHour}:00`,
		});
		intervals.push({
			label: `${nextHour}:30`,
			value: `${nextHour}:30`,
		});
		nextHour++;
	}

	return intervals.slice(0, 8);
};

export const getTodaysDate: () => Date = () => {
	const date: Date = new Date();
	const newDate: Date = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate()
	);

	return newDate;
};
