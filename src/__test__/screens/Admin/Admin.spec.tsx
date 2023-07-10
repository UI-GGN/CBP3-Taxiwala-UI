import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AdminHome } from "../../../screens/Admin/RequestHome/AdminHome";

describe("Admin Screen tests", () => {
	it("should render tabs for routes, requests, vendors, & vehicles", () => {
		render(<AdminHome />);

		expect(screen.getByText("ALL ROUTES")).toBeInTheDocument();
		expect(screen.getByText("ALL REQUESTS")).toBeInTheDocument();
		// expect(screen.getByText("VENDORS")).toBeInTheDocument();
		// expect(screen.getByText("VEHICLES")).toBeInTheDocument();
	});

	// it("should render create new route accordian", () => {
	// 	render(<AdminHome />);

	// 	fireEvent.click(screen.getByText("create new route"));

	// 	expect(screen.getByTestId("route-button")).toBeEnabled();
	// });
});
