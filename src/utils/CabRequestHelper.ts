export interface ITimeIntervals {
	label: string;
	value: string;
}

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

// covert 2023-06-29T19:15:53.742Z to 7:15 PM
export const convertTimeFormat: (date: string) => string = (date: string) => {
	const [dateString, timeString] = date.split("T");
	const timeObj = new Date(`${dateString}T${timeString.split(".")[0]}`);

	const formattedTime = timeObj.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
	return formattedTime;
};

// covert 2023-06-29T19:15:53.742Z to 29 June, 2023
export const convertDateFormat: (date: string) => string = (date: string) => {
	const [dateString] = date.split("T");
	const dateObj = new Date(dateString);

	const formattedTime = dateObj.toLocaleString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
	return formattedTime;
};
