import { Box, Grid } from "@mui/material";
import React, { ReactElement, useState } from "react";
import { CreateRouteAccordian } from "../../../Components/Accordians/CreateRouteAccordian";
import { RouteCard } from "../../../Components/Cards/RoutesCard";
import { IRoute, UseStateType, UseStateTypeForDate } from "../../../Interfaces";
import RouteData from "./../../../utils/RouteData.json";
import "./admin.css";

const routeData: IRoute[] = RouteData;

export const AllRoutes: React.FC = (): ReactElement => {
	const [pickupTime, setPickupTime]: UseStateType<string> = useState("");
	const [startDate, setStartDate]: UseStateTypeForDate = useState<Date | null>(
		null
	);
	const [endDate, setEndDate]: UseStateTypeForDate = useState<Date | null>(
		null
	);
	const [pickupLocation, setPickupLocation]: UseStateType<string> =
		useState("");
	const [dropLocation, setDropLocation]: UseStateType<string> = useState("");
	const [vehicleType, setVehicleType]: UseStateType<string> =
		React.useState("existing");
	const [existingVehicleID, setExistingVehicleID]: UseStateType<string> =
		React.useState("");
	const [newVehicleID, setNewVehicleID]: UseStateType<string> =
		React.useState("");
	const [driverName, setDriverName]: UseStateType<string> = React.useState("");
	const [vendorName, setVendorName]: UseStateType<string> = React.useState("");

	return (
		<Grid container spacing={10}>
			<Grid
				item
				xs={12}
				md={4}
				lg={4}
				sx={{ display: { xs: "block", sm: "none" } }}
			>
				<CreateRouteAccordian
					pickupTime={pickupTime}
					setPickupTime={setPickupTime}
					startDate={startDate}
					setStartDate={setStartDate}
					endDate={endDate}
					setEndDate={setEndDate}
					pickupLocation={pickupLocation}
					setPickupLocation={setPickupLocation}
					dropLocation={dropLocation}
					setDropLocation={setDropLocation}
					vehicleType={vehicleType}
					setVehicleType={setVehicleType}
					existingVehicleID={existingVehicleID}
					setExistingVehicleID={setExistingVehicleID}
					newVehicleID={newVehicleID}
					setNewVehicleID={setNewVehicleID}
					driverName={driverName}
					setDriverName={setDriverName}
					vendorName={vendorName}
					setVendorName={setVendorName}
				/>
			</Grid>
			<Grid item xs={12} md={8} lg={8}>
				<Box>
					<Grid container spacing={6}>
						{routeData.map((route: IRoute, index: number) => {
							return (
								<Grid item xs={12} md={6} lg={6}>
									<RouteCard key={index} route={route} />
								</Grid>
							);
						})}
					</Grid>
				</Box>
			</Grid>
			<Grid
				item
				xs={12}
				md={4}
				lg={4}
				sx={{ display: { xs: "none", sm: "block" } }}
			>
				<CreateRouteAccordian
					pickupTime={pickupTime}
					setPickupTime={setPickupTime}
					startDate={startDate}
					setStartDate={setStartDate}
					endDate={endDate}
					setEndDate={setEndDate}
					pickupLocation={pickupLocation}
					setPickupLocation={setPickupLocation}
					dropLocation={dropLocation}
					setDropLocation={setDropLocation}
					vehicleType={vehicleType}
					setVehicleType={setVehicleType}
					existingVehicleID={existingVehicleID}
					setExistingVehicleID={setExistingVehicleID}
					newVehicleID={newVehicleID}
					setNewVehicleID={setNewVehicleID}
					driverName={driverName}
					setDriverName={setDriverName}
					vendorName={vendorName}
					setVendorName={setVendorName}
				/>
			</Grid>
		</Grid>
	);
};
