import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LocationAccordian from "../../Components/Accordians/LocationAccordian";

describe("Location accordian tests", () => {
	test("Should three input fields for location", () => {
		render(
			<LocationAccordian
				location={{
					pincode: "120023",
					landmark: "Near Metro",
					address: "Sector - 32",
				}}
				setLocation={() => {}}
				cabType={"drop"}
			/>
		);

		expect(screen.getAllByTestId("text_input").length).toBe(3);
	});
});
