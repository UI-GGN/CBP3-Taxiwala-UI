import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CreateRouteAccordian } from "../../Components/Accordians/CreateRouteAccordian";

describe("Create Route Accordian tests", () => {
	test("Should render Create button", () => {
		render(
			<CreateRouteAccordian
				pickupTime={""}
				setPickupTime={() => {}}
				startDate={null}
				setStartDate={() => {}}
				endDate={null}
				setEndDate={() => {}}
				pickupLocation={""}
				setPickupLocation={() => {}}
				dropLocation={""}
				setDropLocation={() => {}}
				vehicleType={""}
				setVehicleType={() => {}}
				existingVehicleID={""}
				setExistingVehicleID={() => {}}
				newVehicleID={""}
				setNewVehicleID={() => {}}
				driverName={""}
				setDriverName={() => {}}
				vendorName={""}
				setVendorName={() => {}}
			/>
		);

		const button: HTMLElement = screen.getByTestId("create_button");

		expect(button).toBeInTheDocument();
		expect(button).toBeDisabled();
	});

	test("Should render input field for drop and pickup location", () => {
		render(
			<CreateRouteAccordian
				pickupTime={""}
				setPickupTime={() => {}}
				startDate={null}
				setStartDate={() => {}}
				endDate={null}
				setEndDate={() => {}}
				pickupLocation={""}
				setPickupLocation={() => {}}
				dropLocation={""}
				setDropLocation={() => {}}
				vehicleType={"existing"}
				setVehicleType={() => {}}
				existingVehicleID={""}
				setExistingVehicleID={() => {}}
				newVehicleID={""}
				setNewVehicleID={() => {}}
				driverName={""}
				setDriverName={() => {}}
				vendorName={""}
				setVendorName={() => {}}
			/>
		);

		const inputFields: HTMLElement[] = screen.getAllByTestId("text_input");

		expect(inputFields[0].children[0].children[0]).toHaveAttribute(
			"placeholder",
			"Pickup location"
		);
		expect(inputFields[1].children[0].children[0]).toHaveAttribute(
			"placeholder",
			"Drop location"
		);
	});

	test("Should render two radio buttons for vehicle types", () => {
		render(
			<CreateRouteAccordian
				pickupTime={""}
				setPickupTime={() => {}}
				startDate={null}
				setStartDate={() => {}}
				endDate={null}
				setEndDate={() => {}}
				pickupLocation={""}
				setPickupLocation={() => {}}
				dropLocation={""}
				setDropLocation={() => {}}
				vehicleType={"existing"}
				setVehicleType={() => {}}
				existingVehicleID={""}
				setExistingVehicleID={() => {}}
				newVehicleID={""}
				setNewVehicleID={() => {}}
				driverName={""}
				setDriverName={() => {}}
				vendorName={""}
				setVendorName={() => {}}
			/>
		);

		const radioButton: HTMLElement = screen.getByTestId("radio_group");

		expect(radioButton.children.length).toBe(2);
		expect(radioButton.children[0].children[0].children[0]).toBeChecked();
	});
});
