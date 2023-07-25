import { IEmmployeeDetails, ILocation } from "../Interfaces";

export const shouldNextButtonDisabled: (
	alignment: string,
	cabtype: string,
	checkintime: string,
	checkouttime: string,
	startDate: Date | null,
	endDate: Date | null,
	noEndDateNeeded: boolean | undefined,
	dateForAdHoc: Date | null
) => boolean = (
	alignment: string,
	cabtype: string,
	checkintime: string,
	checkouttime: string,
	startDate: Date | null,
	endDate: Date | null,
	noEndDateNeeded: boolean | undefined,
	dateForAdHoc: Date | null
) => {
	if (alignment === "Ad-Hoc") {
		if (cabtype === "") return true;
		else if (cabtype === "pick") {
			return checkintime === "" || dateForAdHoc === null;
		} else {
			return checkouttime === "" || dateForAdHoc === null;
		}
	}

	if (alignment === "Regular") {
		if (noEndDateNeeded === true) {
			if (cabtype === "") return true;
			else if (cabtype === "pick") {
				return checkintime === "" || startDate === null;
			} else {
				return checkouttime === "" || startDate === null;
			}
		} else {
			if (cabtype === "") return true;
			else if (cabtype === "pick") {
				return checkintime === "" || startDate === null || endDate === null;
			} else {
				return checkouttime === "" || startDate === null || endDate === null;
			}
		}
	}

	return false;
};

export const shouldSubmitButtonDisabled: (
	location: ILocation,
	employeeDetails: IEmmployeeDetails
) => boolean = (location: ILocation, employeeDetails: IEmmployeeDetails) => {
	return (
		location.address === "" ||
		location.pincode === "" ||
		employeeDetails.phoneNumber === "" ||
		employeeDetails.projectCode === ""
	);
};
