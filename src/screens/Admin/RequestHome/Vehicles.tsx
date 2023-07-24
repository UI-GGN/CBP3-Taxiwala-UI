import { Typography } from "@material-ui/core";
import { Person } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Card,
	CardContent,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	Stack,
} from "@mui/material";
import { ReactElement, useEffect, useMemo, useState } from "react";
import ApiStateHandler from "../../../Components/ApiHandler/ApiStateHandler";
import TextInput from "../../../Components/TextInput/TextInput";
import { IVehicle, IVendor, UseStateType } from "../../../Interfaces";
import { AdminService } from "../../../Services/AdminService";
import { GetApiEffect } from "../../../Services/ApiService/ApiUtils";
import Dropdown from "../../../Components/TextInput/Dropdown";

const getDropdownValues = (vendors: IVendor[]) => {
	return vendors.map((vendor: IVendor) => {
		return {
			value: vendor.id,
			label: vendor.name,
		};
	});
};

export const Vehicles = (): ReactElement => {
	const [vendors, setVendors]: UseStateType<IVendor[]> = useState(
		[] as IVendor[]
	);
	const [vehicles, setVehicles]: UseStateType<IVehicle[]> = useState(
		[] as IVehicle[]
	);
	const [vendorType, setVendorType]: UseStateType<string> =
		useState("existing");
	const [existingVendorId, setExistingVendorId]: UseStateType<string> =
		useState("");
	const [vehicleID, setVehicleID]: UseStateType<string> = useState("");
	const [driverName, setDriverName]: UseStateType<string> = useState("");
	const [vendorName, setVendorName]: UseStateType<string> = useState("");
	const [vendorPhoneNo, setVendorPhoneNo]: UseStateType<string> = useState("");

	const [isVendorDataLoading, isVendorDataError, vendorData] = GetApiEffect(
		AdminService.getAllVendors
	);
	const [isVehicleDataLoading, isVehicleDataError, vehicleData] = GetApiEffect(
		AdminService.getAllVehicles
	);

	useEffect(() => {
		setVendors(vendorData);
	}, [vendorData]);

	useEffect(() => {
		setVehicles(vehicleData);
	}, [vehicleData]);

	const handleVendorTypeChange = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setVendorType(event.target.value);
	};

	return (
		<ApiStateHandler
			isLoading={isVehicleDataLoading}
			isError={isVehicleDataError}
		>
			{vehicles && (
				<Grid container spacing={2}>
					<Grid item xs={12} md={6} lg={8}>
						<Box>
							<Grid container spacing={2}>
								{vehicles.map((vehicle: IVehicle, index: number) => {
									const vendor: IVendor = vendors.filter(
										(v) => v.id === vehicle.vendorId
									)[0];

									return (
										<>
											<Grid item xs={8} md={6} lg={4} key={index}>
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
																<b> Vendor Details :</b> {vendor.name},{" "}
																{vendor.phoneNumber}
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
					<Grid item xs={8} md={6} lg={4}>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography variant="h6"> Create New Vehicle </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextInput
									placeholder="Vehicle ID"
									type="text"
									styles={{
										width: "90%",
										height: "49.4px",
										marginRight: "40px",
									}}
									value={vehicleID}
									handleChange={(text: string) => {
										setVehicleID(text);
									}}
								/>
								<TextInput
									placeholder="Driver name"
									type="text"
									styles={{
										width: "90%",
										height: "49.4px",
										marginTop: "30px",
										marginRight: "40px",
										marginBottom: "30px",
									}}
									handleChange={(text: string) => {
										setDriverName(text);
									}}
									value={driverName}
								/>
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
											label="Choose vendor"
											handleChange={(text: string) => {
												setExistingVendorId(text);
											}}
											value={existingVendorId}
											dropdownvalues={getDropdownValues(vendors)}
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
											styles={{
												width: "70%",
												height: "49.4px",
												marginRight: "40px",
											}}
											value={vendorName}
											handleChange={(text: string) => {
												setVendorName(text);
											}}
										/>
										<TextInput
											placeholder="Phone number"
											type="number"
											styles={{
												width: "70%",
												height: "49.4px",
												marginTop: "30px",
												marginRight: "40px",
												marginBottom: "30px",
											}}
											handleChange={(text: string) => {
												setVendorPhoneNo(text);
											}}
											value={vendorPhoneNo}
										/>
									</>
								)}
								<br />
								<Button
									variant="contained"
									// disabled={
									// 	vehicleID === "" ||
									// 	driverName === "" ||
									// 	!(vendorType === "existing" && existingVendorId === "") ||
									// 	!(vendorType === "new" && vendorName === "" || vendorPhoneNo === "")

									// }
									data-testid="create_button"
									onClick={async () => {
										const createVehiclePayload =
											vendorType === "existing"
												? {
														id: vehicleID,
														driverName: driverName,
														vendorId: existingVendorId,
												  }
												: {
														id: vehicleID,
														driverName: driverName,
														vendor: {
															name: vendorName,
															phoneNumber: vendorPhoneNo,
														},
												  };

										await AdminService.createVehicle(createVehiclePayload).then(
											(response: any) => {
												setVehicles((prevVehicles) => {
													return [...prevVehicles, response.data];
												});

												// if (vendorType === "new") {
												// 	setVendors((prevVendors) => {
												// 		return [...prevVendors, response.data];
												// 	});
												// }
											}
										);
										setVehicleID("");
										setDriverName("");
										setVendorType("existing");
										setExistingVendorId("");
									}}
								>
									Create 
								</Button>
							</AccordionDetails>
						</Accordion>
					</Grid>
				</Grid>
			)}
		</ApiStateHandler>
	);
};
