import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { AdminHome } from "../../../screens/Admin/RequestHome/AdminHome";

describe("Admin Screen tests", () => {
	it("should render tabs for routes, requests, vendors, & vehicles", () => {
		render(<AdminHome />);

		expect(screen.getByText("ALL ROUTES")).toBeInTheDocument();
		expect(screen.getByText("ALL REQUESTS")).toBeInTheDocument();
		// expect(screen.getByText("VENDORS")).toBeInTheDocument();
		// expect(screen.getByText("VEHICLES")).toBeInTheDocument();
	});

	it("should enable create new route button", () => {
		render(<AdminHome />);

		fireEvent.click(screen.getByText("ALL ROUTES"));

		expect(screen.getByTestId("route-button")).toBeEnabled();
	});
});
