import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RequestCard } from "../../Components/Cards/RequestCard";
import { ICabRequest } from "../../Interfaces";
import { convertDateFormat } from "../../utils/CabRequestHelper";

const request: ICabRequest = {
	id: 24,
	createdAt: "2023-06-29T19:15:53.742Z",
	updatedAt: "2023-07-02T20:12:39.369Z",
	employeeId: "12345",
	employeeName: "Ankit",
	projectCode: "666",
	phoneNumber: "7816345456",
	pickupLocation: "Saket Metro Station",
	dropLocation: "Thoughtworks Technologies",
	pickupTime: "2023-07-04T11:15:29.252Z",
	expireDate: "2023-07-04T11:15:29.252Z",
	status: "PENDING",
	deleted: false,
	routeId: null,
};

describe("Request card tests", () => {
	test("Should render employee name and ID", () => {
		render(<RequestCard request={request} index={0} handleModal={() => {}} />);

		expect(
			screen.getByText(`${request.employeeName}, ${request.employeeId}`)
		).toBeInTheDocument();
	});

	test("Should render employee phone no and project code", () => {
		render(<RequestCard request={request} index={0} handleModal={() => {}} />);

		expect(
			screen.getByText(`Phone no: ${request.phoneNumber}`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`Project code: ${request.projectCode}`)
		).toBeInTheDocument();
	});

	test("Should render cab required date", () => {
		render(<RequestCard request={request} index={0} handleModal={() => {}} />);

		expect(
			screen.getByText(
				`Cab required Date: ${convertDateFormat(request.pickupTime)}`
			)
		).toBeInTheDocument();
	});

	test("Should render request status as PENDING", () => {
		render(<RequestCard request={request} index={0} handleModal={() => {}} />);

		expect(screen.getByText(`PENDING`)).toBeInTheDocument();
	});

	test("Should render request status as Assigned with Route name", () => {
		render(
			<RequestCard
				request={{
					...request,
					status: "ASSIGNED",
					routeId: 1,
					routeName: "Route 12",
				}}
				index={0}
				handleModal={() => {}}
			/>
		);

		expect(screen.getByText(`ASSIGNED`)).toBeInTheDocument();
		expect(screen.getByText("Route : Route 12")).toBeInTheDocument();
	});

	test("Should render request status as Declined", () => {
		render(
			<RequestCard
				request={{
					...request,
					status: "DECLINED",
				}}
				index={0}
				handleModal={() => {}}
			/>
		);

		expect(screen.getByText(`DECLINED`)).toBeInTheDocument();
	});
});
