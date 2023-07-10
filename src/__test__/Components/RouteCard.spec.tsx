import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouteCard } from "../../Components/Cards/RoutesCard";
import { IRoute } from "../../Interfaces";
import { convertDateFormat } from "../../utils/CabRequestHelper";

const route: IRoute = {
	id: 1,
	name: "Route 100",
	startLocation: "Gurgaon sector - 2",
	endLocation: "Thoughtworks",
	pickupTime: "10:00",
	startDate: "2023-05-26T00:00:00.000Z",
	expireDate: "2023-06-29T00:00:00.000Z",
	vehicleId: "AB123456",
	deleted: false,
	vehicle: {
		id: "AB123456",
		driverName: "driver name",
		vendorId: 1,
		deleted: false,
		vendor: {
			id: 1,
			name: "vendor name",
			deleted: false,
		},
	},
};

describe("Route card tests", () => {
	test("Should render route details name and ID", () => {
		render(<RouteCard route={route} />);

		expect(screen.getByText(`${route.name}, ${route.id}`)).toBeInTheDocument();
	});

	test("Should render route location and time", () => {
		render(<RouteCard route={route} />);

		expect(screen.getByText(route.startLocation)).toBeInTheDocument();
		expect(screen.getByText(route.endLocation)).toBeInTheDocument();
		expect(screen.getAllByText(route.pickupTime)[0]).toBeInTheDocument();
	});

	test("Should render oute start date and end date", () => {
		render(<RouteCard route={route} />);

		expect(
			screen.getByText(`${convertDateFormat(route.startDate)}`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`${convertDateFormat(route.expireDate)}`)
		).toBeInTheDocument();
	});

	test("Should render driver, vehicle and vendor details", () => {
		render(<RouteCard route={route} />);

		expect(
			screen.getByText(`Driver name: ${route.vehicle.driverName}`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`Vehicle : ${route.vehicle.id}`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`Vendor name: ${route.vehicle.vendor.name}`)
		).toBeInTheDocument();
	});
});
