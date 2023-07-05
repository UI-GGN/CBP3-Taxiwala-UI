import { Dispatch, SetStateAction } from "react";

export type UseStateType<T> = [T, Dispatch<SetStateAction<T>>];

export type UseStateTypeForDate = [
	Date | null,
	Dispatch<SetStateAction<Date | null>>
];

export interface ILocation {
	address: string;
	pincode: string;
	landmark: string;
}

export interface IEmmployeeDetails {
	id: string;
	projectCode: string;
}

export interface IRequestStep1Props {
	cabType: string;
	setCabType: React.Dispatch<React.SetStateAction<string>>;
	checkInTime: string;
	setCheckInTime: React.Dispatch<React.SetStateAction<string>>;
	checkOutTime: string;
	setCheckOutTime: React.Dispatch<React.SetStateAction<string>>;
	dateForAdHoc: Date | null;
	setDateForAdHoc: React.Dispatch<React.SetStateAction<Date | null>>;
	noEndDateNeeded: boolean;
	setNoEndDateNeeded: React.Dispatch<React.SetStateAction<boolean>>;
	startDate: Date | null;
	setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
	endDate: Date | null;
	setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
	currentstep: number;
	setCurrentstep: React.Dispatch<React.SetStateAction<number>>;
}

export interface IRequestStep2Props {
	location: ILocation;
	setLocation: React.Dispatch<React.SetStateAction<ILocation>>;
	currentstep: number;
	setCurrentstep: React.Dispatch<React.SetStateAction<number>>;
	cabType: string;
	employeeDetails: IEmmployeeDetails;
	setEmployeeDetails: React.Dispatch<React.SetStateAction<IEmmployeeDetails>>;
}

export interface ILocationAccordianProps {
	location: ILocation;
	setLocation: React.Dispatch<React.SetStateAction<ILocation>>;
	cabType: string;
}

export interface ICabRequest {
	id: number;
	createdAt: string;
	updatedAt: string;
	employeeId: string;
	employeeName: string;
	projectCode: string;
	phoneNumber: string;
	pickupLocation: string;
	dropLocation: string;
	pickupTime: string;
	expireDate: string;
	status: string;
	deleted: boolean;
	routeId: number | null;
	routeName?: string;
}

export interface IRequestCardProps {
	request: ICabRequest;
	index: number;
	handleModal: (index: number) => void;
}

export interface IRoute {
	id: number;
	name: string;
	startLocation: string;
	endLocation: string;
	pickupTime: string;
	startDate: string;
	expireDate: string;
	vehicleId: string;
	deleted: boolean;
	vehicle: IVehicle;
}

export interface IVehicle {
	id: string;
	driverName: string;
	vendorId: number;
	deleted: boolean;
	vendor: IVendor;
}

export interface IVendor {
	id: number;
	name: string;
	deleted: boolean;
}

export interface IRouteCardProps {
	route: IRoute;
}
