import { Dispatch } from "react";

export const shouldNextButtonDisabled: (
	alignment: string,
	cabtype: string,
	checkintime: string,
	checkouttime: string,
	startDate: {} | null,
	endDate: {} | null,
	noEndDateNeeded: boolean | undefined,
	dateForAdHoc: {} | null
) => boolean = (
	alignment: string,
	cabtype: string,
	checkintime: string,
	checkouttime: string,
	startDate: {} | null,
	endDate: {} | null,
	noEndDateNeeded: boolean | undefined,
	dateForAdHoc: {} | null
) => {
	if (alignment === "Ad-Hoc") {
		if (cabtype === "") return true;
		else if (cabtype === "pick") {
			return checkintime === "" || dateForAdHoc === null;
		} else {
			return checkouttime === "" || dateForAdHoc === null;
		}
	}

	console.log(endDate);

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

export const setDropAndPickUpLocation: (
	cabtype: string,
	setDropLocation: Dispatch<any>,
	setPickupLocation: Dispatch<any>
) => void = (
	cabtype: string,
	setDropLocation: Dispatch<any>,
	setPickupLocation: Dispatch<any>
) => {
	if (cabtype === "pick") {
		setPickupLocation({ location: "", pincode: "", landmark: "" });
		setDropLocation({
			location: "International Tech Park, Sector 59, Gurugram, Haryana",
			pincode: "122102",
			landmark: "",
		});
	} else if (cabtype === "drop") {
		setDropLocation({ location: "", pincode: "", landmark: "" });
		setPickupLocation({
			location: "International Tech Park, Sector 59, Gurugram, Haryana",
			pincode: "122102",
			landmark: "",
		});
	}
};
