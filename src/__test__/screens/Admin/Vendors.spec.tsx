import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Vendors } from "../../../screens/Admin/RequestHome/Vendors";
import { IVendor } from "./../../../Interfaces";

const vendors: IVendor[] = [
	{
		id: 1,
		name: "Vendor name 1",
		deleted: false,
		phoneNumber: "1234567890",
	},
	{
		id: 2,
		name: "Vendor name 2",
		deleted: false,
		phoneNumber: "911234567890",
	},
	{
		id: 5,
		name: "Vendor name 5",
		deleted: false,
		phoneNumber: "121234567890",
	},
];

describe("Vendor component tests", () => {
	it("should render vendor name", () => {
		render(<Vendors />);

		const vendorsName: HTMLElement[] = screen.getAllByTestId("vendor_name");

		expect(vendorsName[0]).toHaveTextContent("Vendor name 1");
		expect(vendorsName[1]).toHaveTextContent("Vendor name 2");
		expect(vendorsName[2]).toHaveTextContent("Vendor name 5");
	});

	it("should render vendor Ids", () => {
		render(<Vendors />);

		const vendorsId: HTMLElement[] = screen.getAllByTestId("vendor_id");

		expect(vendorsId[0]).toHaveTextContent("1");
		expect(vendorsId[1]).toHaveTextContent("2");
		expect(vendorsId[2]).toHaveTextContent("5");
	});

	it("should render phone Icons", () => {
		render(<Vendors />);

		const phoneIcons: HTMLElement[] = screen.getAllByTestId("phoneIcon");

		expect(phoneIcons.length).toBe(3);
	});
});
