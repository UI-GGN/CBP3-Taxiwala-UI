import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RequestHome from "../../../../screens/Employee/RequestHome/RequestHome";
import App from "../../../../App";

const LoginToApp = () => {
	const emailInputContainer: HTMLElement = screen.getByTestId("text_input");
	const sendOTPButton: HTMLElement = screen.getByTestId("sendOTP_button");

	fireEvent.change(emailInputContainer.children[0].children[0], {
		target: {
			value: "taxiwala@thoughtworks.com",
		},
	});
	fireEvent.click(sendOTPButton);

	expect(screen.getAllByTestId("text_input")).toHaveLength(2);

	const otpInputContainer: HTMLElement = screen.getAllByTestId("text_input")[1];
	const submitOTP_button: HTMLElement = screen.getByTestId("submitOTP_button");

	fireEvent.change(otpInputContainer.children[0].children[0], {
		target: {
			value: "123456",
		},
	});
	fireEvent.click(submitOTP_button);
};

describe("Request Home Screen", () => {
	it("should render components on request page", () => {
		render(<RequestHome />);

		expect(screen.getByText("Looking for office cab?")).toBeInTheDocument();
		expect(screen.getByText("Next")).toBeInTheDocument();
		expect(screen.getByText("Step 1/2")).toBeInTheDocument();

		expect(screen.getByRole("button", { name: "Ad-Hoc" }));
		expect(screen.getByRole("button", { name: "Regular" }));
	});

	it("Should render Ad-hoc Info component", () => {
		render(<RequestHome />);

		expect(
			screen.getByText(
				"Ad-Hoc requests are request on demand basis for the specific day. These are to be made 1 hour before atleast."
			)
		);
	});

	it("Should disable dates before current date and enable dated after current date", () => {
		jest.useFakeTimers().setSystemTime(new Date("2023-06-08"));

		render(<RequestHome />);
		const chooseDateButton: HTMLElement = screen.getByLabelText("Choose date");
		fireEvent.click(chooseDateButton);

		const dateBeforeCurrentDate = screen.getByText("5");
		const dateAfterCurrentDate = screen.getByText("10");

		expect(dateAfterCurrentDate).toBeEnabled();
		expect(dateBeforeCurrentDate).toBeDisabled();
	});

	it("Should able to select date in date picker", () => {
		jest.useFakeTimers().setSystemTime(new Date("2023-06-08"));

		render(<RequestHome />);
		const chooseDateButton: HTMLElement = screen.getByLabelText("Choose date");
		fireEvent.click(chooseDateButton);

		const dateToBeSelected = screen.getByText("10");
		fireEvent.click(dateToBeSelected);

		expect(screen.getByDisplayValue("06/10/2023")).toBeInTheDocument();
	});

	it("should disable next button if all input fields are not filled in Ad-Hoc request", async () => {
		render(<App />);
		LoginToApp();

		const nextButton: HTMLElement = screen.getByText("Next");
		const chooseDateButton: HTMLElement = screen.getByLabelText("Choose date");
		const cabTypeDropdownIcon: HTMLElement =
			screen.getByTestId("ArrowDropDownIcon");

		fireEvent.click(chooseDateButton);

		const dateToBeSelected = screen.getByText("30");
		fireEvent.click(dateToBeSelected);

		expect(nextButton).toBeDisabled();
	});
});
