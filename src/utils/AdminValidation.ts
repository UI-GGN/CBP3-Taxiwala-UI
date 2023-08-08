export const shouldCreateButtonDisabled: (
	pickupTime: string,
	startDate: Date | null,
	endDate: Date | null,
	pickupLocation: string,
	dropLocation: string,
	vehicleType: string,
	vendorName: string,
	newVehicleID: string,
	existingVehicleID: string,
	driverName: string
) => boolean = (
	pickupTime: string,
	startDate: Date | null,
	endDate: Date | null,
	pickupLocation: string,
	dropLocation: string,
	vehicleType: string,
	vendorName: string,
	newVehicleID: string,
	existingVehicleID: string,
	driverName: string
) => {
	if (vehicleType === "new") {
		return (
			pickupTime === "" ||
			startDate === null ||
			endDate === null ||
			pickupLocation === "" ||
			dropLocation === "" ||
			vendorName === "" ||
			newVehicleID === "" ||
			driverName === ""
		);
	} else if (vehicleType === "existing") {
		return (
			pickupTime === "" ||
			startDate === null ||
			endDate === null ||
			pickupLocation === "" ||
			dropLocation === "" ||
			existingVehicleID === ""
		);
	}

	return true;
};
