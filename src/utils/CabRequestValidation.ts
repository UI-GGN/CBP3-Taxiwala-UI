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
			return checkintime === "" || dateForAdHoc === "";
		} else {
			return checkouttime === "" || dateForAdHoc === "";
		}
	} else {
		if (noEndDateNeeded === true) {
			return startDate === null || checkouttime === "" || checkouttime === "";
		} else {
			return (
				startDate === null ||
				endDate === null ||
				checkouttime === "" ||
				checkouttime === ""
			);
		}
	}
};

export const setDropAndPickUpLocation: (
	alignment: string,
	cabtype: string,
	setDropLocation: Dispatch<any>,
	setPickupLocation: Dispatch<any>
) => void = (
	alignment: string,
	cabtype: string,
	setDropLocation: Dispatch<any>,
	setPickupLocation: Dispatch<any>
) => {
	if (alignment === "Ad-Hoc") {
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
	} else {
		setDropLocation({ location: "", pincode: "", landmark: "" });
		setPickupLocation({ location: "", pincode: "", landmark: "" });
	}
};
