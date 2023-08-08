import { Typography } from "@material-ui/core";
import { Person } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Alert,
	AlertTitle,
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	Stack,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import ApiStateHandler from "../../../Components/ApiHandler/ApiStateHandler";
import Dropdown from "../../../Components/TextInput/Dropdown";
import TextInput from "../../../Components/TextInput/TextInput";
import { IVehicle, IVendor, UseStateType } from "../../../Interfaces";
import { AdminService } from "../../../Services/AdminService";
import {
	GetApiEffect,
	PostService,
} from "../../../Services/ApiService/ApiUtils";
import "./admin.css";

interface IVendorDropdownValue {
	value: string;
	label: string;
}

export const Vehicles: React.FC = (): ReactElement => {
	const [isVehicleDataLoading, isVehicleDataError, vehicleData]: [
		boolean,
		boolean,
		IVehicle[]
	] = GetApiEffect(AdminService.getAllVehicles);
	const [isVendorDataLoading, isVendorDataError, vendorData]: [
		boolean,
		boolean,
		IVendor[]
	] = GetApiEffect(AdminService.getAllVendors);
	const { postApi, data, isLoading, isError } = PostService(
		AdminService.createVehicle
	);

	const [vehicles, setVehicles]: UseStateType<IVehicle[]> = useState(
		[] as IVehicle[]
	);
	const [vendors, setVendors]: UseStateType<IVendor[]> = useState(
		[] as IVendor[]
	);
	const [name, setName]: UseStateType<string> = useState("");
	const [phoneNumber, setPhoneNumber]: UseStateType<string> = useState("");
	const [vehicleId, setVehicleId]: UseStateType<string> = useState("");
	const [driverName, setDriverName] = useState("");
	const [vendorType, setVendorType] = useState("existing");
	const [existingVendor, setExistingVendor] = useState("");
	const [vendorDropdownValues, setVendorDropdownValues] = useState(
		[] as IVendorDropdownValue[]
	);

	console.log(isVendorDataLoading, isVendorDataError, data);

	useEffect(() => {
		if (vendorData !== null && vehicleData !== null) {
			setVehicles(() => {
				return vehicleData.map((vehicle: IVehicle) => {
					const assignedVendor: IVendor = vendorData.filter(
						(vendor: IVendor) => {
							return vendor.id === vehicle.vendorId;
						}
					)[0];

					return {
						...vehicle,
						vendorName: assignedVendor.name,
						vendorPhoneNumber: assignedVendor.phoneNumber,
					};
				});
			});
		}
	}, [vehicleData, vendorData]);

	useEffect(() => {
		setVendors(vendorData);

		if (vendorData !== null) {
			setVendorDropdownValues(() => {
				return vendorData.map((vendor) => {
					return {
						value: vendor.id.toString(),
						label: vendor.name,
					};
				});
			});
		}
	}, [vendorData]);

	const handleVendorTypeChange = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setVendorType(event.target.value);
	};

	const createVehicle: () => void = () => {
		const body: any =
			vendorType === "existing"
				? {
						id: vehicleId,
						driverName: driverName,
						vendorId: parseInt(existingVendor),
				  }
				: {
						id: vehicleId,
						driverName: driverName,
						vendor: {
							name: name,
							phoneNumber: "+91" + phoneNumber,
						},
				  };

		postApi(body, null, (response: any) => {
			const newVehicle: IVehicle =
				vendorType === "existing"
					? {
							...response.data,
							vendorName: vendors.filter((v: IVendor) => {
								return v.id.toString() === existingVendor;
							})[0].name,
							vendorPhoneNumber: vendors.filter((v: IVendor) => {
								return v.id.toString() === existingVendor;
							})[0].phoneNumber,
					  }
					: {
							...response.data,
							vendorName: name,
							vendorPhoneNumber: "+91" + phoneNumber,
					  };
			setVehicles((prevVehicles: IVehicle[]) => [newVehicle, ...prevVehicles]);
			setName("");
			setPhoneNumber("");
			setVehicleId("");
			setDriverName("");
			setVendorType("existing");
			setExistingVendor("");
		});
	};

	return (
		<ApiStateHandler
			isLoading={isVehicleDataLoading}
			isError={isVehicleDataError}
		>
			{vehicles && vendors && (
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={8} lg={8}>
						<Box>
							<Grid container spacing={2}>
								{vehicles.map((vehicle: IVehicle, index: number) => {
									return (
										<>
											<Grid item xs={10} sm={6} md={6} lg={4} key={index}>
												<Card>
													<CardContent sx={{ pb: 0, paddingRight: 0 }}>
														<Typography
															data-testid="vendor_name"
															style={{
																display: "flex",
																alignItems: "center",
																marginBottom: "5px",
															}}
														>
															<LocalTaxiIcon
																sx={{
																	mr: 2,
																}}
															/>
															{vehicle.id}
														</Typography>
														<Typography
															data-testid="vendor_id"
															style={{
																display: "flex",
																alignItems: "center",
																marginBottom: "5px",
															}}
														>
															<Person
																sx={{
																	mr: 2,
																}}
															/>
															{vehicle.driverName}
														</Typography>
														<Stack flexDirection="row" alignItems="center">
															<Typography
																data-testid="vendor_phoneNumber"
																style={{ marginRight: "2rem" }}
															>
																<b> Vendor Details :</b> {vehicle.vendorName},
																&nbsp;
																{vehicle.vendorPhoneNumber}
															</Typography>
														</Stack>
													</CardContent>
												</Card>
												<br />
											</Grid>
										</>
									);
								})}
							</Grid>
						</Box>
					</Grid>
					<Grid item xs={10} sm={10} md={4} lg={4}>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography variant="h6"> Create New Vehicle </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextInput
									placeholder="Vehicle ID"
									type="text"
									value={vehicleId}
									handleChange={(text: string) => setVehicleId(text)}
									styles={{
										width: "90%",
										height: "49.4px",
										marginRight: "40px",
									}}
								/>
								<TextInput
									placeholder="Driver Name"
									type="text"
									value={driverName}
									handleChange={(text: string) => setDriverName(text)}
									styles={{
										width: "90%",
										height: "49.4px",
										marginTop: "30px",
										marginRight: "40px",
									}}
								/>
								<br />
								<br />
								<RadioGroup
									aria-labelledby="demo-radio-buttons-group-label"
									name="radio-buttons-group"
									onChange={handleVendorTypeChange}
									sx={{
										display: "flex",
										flexDirection: "row",
									}}
									defaultValue="existing"
									data-testid="radio_group"
								>
									<FormControlLabel
										value="existing"
										control={<Radio />}
										label="Add existing vendor"
										sx={{
											marginRight: "40px",
										}}
									/>
									<FormControlLabel
										value="new"
										control={<Radio />}
										label="Add new vendor"
									/>
								</RadioGroup>
								<br />
								{vendorType === "existing" && (
									<>
										<Dropdown
											label="Choose vendor name"
											handleChange={(text: string) => {
												setExistingVendor(text);
											}}
											value={existingVendor}
											dropdownvalues={vendorDropdownValues}
											width="70%"
										/>
										<br />
									</>
								)}
								{vendorType === "new" && (
									<>
										<TextInput
											placeholder="Vendor name"
											type="text"
											value={name}
											handleChange={(text: string) => setName(text)}
											styles={{
												width: "90%",
												height: "49.4px",
												marginRight: "40px",
											}}
										/>
										<TextInput
											placeholder="Phone number"
											type="number"
											value={phoneNumber}
											handleChange={(text: string) => setPhoneNumber(text)}
											styles={{
												width: "90%",
												height: "49.4px",
												marginTop: "30px",
												marginRight: "40px",
											}}
											icon={"+91"}
										/>
										<br />
										<br />
									</>
								)}
								{isError && (
									<>
										<Alert severity="error">
											<AlertTitle>Error</AlertTitle>
											Something went wrong. Try again!
										</Alert>
										<br />
									</>
								)}
								{isLoading ? (
									<CircularProgress />
								) : (
									<Button
										variant="contained"
										disabled={
											vehicleId === "" ||
											driverName === "" ||
											(vendorType === "existing" && existingVendor === "") ||
											(vendorType === "new" && name === "") ||
											(vendorType === "new" && phoneNumber === "")
										}
										data-testid="create_button"
										onClick={() => createVehicle()}
									>
										Create
									</Button>
								)}
							</AccordionDetails>
						</Accordion>
					</Grid>
				</Grid>
			)}
		</ApiStateHandler>
	);
};
