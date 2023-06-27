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

export const extractDate: (dateObject: any) => Date = (dateObject: any) => {
	const dateString = dateObject.$d;
	return new Date(dateString);
};

export const hasThreeDayGap: (date1: Date, date2: Date) => boolean = (
	date1: Date,
	date2: Date
) => {
	date1.setHours(0, 0, 0, 0);
	date2.setHours(0, 0, 0, 0);

	const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());

	const diffInDays = Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000));

	return diffInDays >= 3;
};

export const isBefore: (date1: Date, date2: Date) => boolean = (
	date1: Date,
	date2: Date
) => {
	const date1WithoutTime = new Date(
		date1.getFullYear(),
		date1.getMonth(),
		date1.getDate()
	);
	const date2WithoutTime = new Date(
		date2.getFullYear(),
		date2.getMonth(),
		date2.getDate()
	);

	return date1WithoutTime < date2WithoutTime;
};
