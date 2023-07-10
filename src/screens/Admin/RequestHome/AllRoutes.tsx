import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import {
	DatePicker,
	LocalizationProvider,
	TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { ReactElement, useMemo, useState } from "react";
import { RouteCard } from "../../../Components/Cards/RoutesCard";
import TextInput from "../../../Components/TextInput/TextInput";
import VendorData from "./../../../utils/VendorData.json";
import {
	IRoute,
	UseStateType,
	UseStateTypeForDate,
	IVendor,
	IVehicle,
} from "../../../Interfaces";
import {
	extractDate,
	getTodaysDate,
	isBefore,
} from "../../../utils/CabRequestHelper";
import RouteData from "./../../../utils/RouteData.json";
import VehicleData from "./../../../utils/VehicleData.json";
import "./admin.css";
import Dropdown from "../../../Components/TextInput/Dropdown";

const routeData: IRoute[] = RouteData;
const vendorData: IVendor[] = VendorData;
const vehicleData: IVehicle[] = VehicleData;

const vendorDropdownValues: { value: string; label: string }[] = vendorData.map(
	(vendor) => {
		return {
			value: vendor.id.toString(),
			label: vendor.name,
		};
	}
);

const vehicleDropdownValues: { value: string; label: string }[] =
	vehicleData.map((vehicle) => {
		return {
			value: vehicle.id,
			label: vehicle.id,
		};
	});

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
	const [value, setValue]: UseStateType<string> = React.useState("existing");
	const [vehicleID, setVehicleID]: UseStateType<string> = React.useState("");
	const [driverName, setDriverName]: UseStateType<string> = React.useState("");
	const [vendorName, setVendorName]: UseStateType<string> = React.useState("");

	const handleChange = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setValue(event.target.value);
	};

	const isStartDateGreaterThanEndDate: boolean = useMemo(() => {
		if (startDate !== null && endDate !== null) {
			return isBefore(extractDate(endDate), extractDate(startDate));
		}
		return false;
	}, [startDate, endDate]);

	return (
		<Grid container spacing={10}>
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
			<Grid item xs={12} md={4} lg={4}>
				<Accordion sx={{ width: "fit-content", marginRight: "0" }}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography variant="h6"> Create New Route </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div className="date_picker">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									className="start_date"
									label="Select start date"
									value={startDate}
									onChange={(date: any) => setStartDate(date)}
									shouldDisableDate={(date: Date) => {
										const currentDate = getTodaysDate();
										return date < currentDate;
									}}
								/>
								<DatePicker
									label="Select end date"
									value={endDate}
									onChange={(date: any) => setEndDate(date)}
									shouldDisableDate={(date: Date) => {
										const currentDate = getTodaysDate();
										return date < currentDate;
									}}
								/>
							</LocalizationProvider>
						</div>
						{isStartDateGreaterThanEndDate && (
							<div className="error">
								<ErrorOutlineIcon
									style={{ fontSize: "12px", marginRight: "5px" }}
								/>
								Start date cannot be greater than end date
							</div>
						)}
						<br />
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker
								label="Pick up time"
								value={pickupTime}
								onChange={(time: any) => setPickupTime(time)}
								slotProps={{
									textField: {
										error: false,
									},
								}}
							/>
						</LocalizationProvider>
						<br />
						<TextInput
							placeholder="Pickup location"
							type="text"
							styles={{
								width: "70%",
								height: "49.4px",
								marginTop: "30px",
								marginRight: "40px",
							}}
							handleChange={(text: string) => setPickupLocation(text)}
							value={pickupLocation}
						/>
						<TextInput
							placeholder="Drop location"
							type="text"
							styles={{
								width: "70%",
								height: "49.4px",
								marginTop: "30px",
								marginRight: "40px",
							}}
							handleChange={(text: string) => setDropLocation(text)}
							value={dropLocation}
						/>
						<br />
						<br />
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							name="radio-buttons-group"
							onChange={handleChange}
							sx={{
								display: "flex",
								flexDirection: "row",
							}}
							defaultValue="existing"
						>
							<FormControlLabel
								value="existing"
								control={<Radio />}
								label="Add existing vehicle"
								sx={{
									marginRight: "40px",
								}}
							/>
							<FormControlLabel
								value="new"
								control={<Radio />}
								label="Add new vehicle"
							/>
						</RadioGroup>
						<br />
						{value === "existing" && (
							<>
								<Dropdown
									label="Choose vehicle ID"
									handleChange={(text: string) => {
										setVehicleID(text);
									}}
									value={vehicleID}
									dropdownvalues={vehicleDropdownValues}
									width="70%"
								/>
								<br />
							</>
						)}
						{value === "new" && (
							<>
								<Dropdown
									label="Choose vendor"
									handleChange={(value: string) => setVendorName(value)}
									value={vendorName}
									dropdownvalues={vendorDropdownValues}
									width="70%"
								/>
								<Box height="10px"></Box>
								<TextInput
									placeholder="Add vehicle ID"
									type="text"
									styles={{
										width: "70%",
									}}
									handleChange={(text: string) => setVehicleID(text)}
									value={vehicleID}
								/>
								<br />
								<br />
								<TextInput
									placeholder="Add driver name"
									type="text"
									styles={{
										width: "70%",
									}}
									handleChange={(text: string) => setDriverName(text)}
									value={driverName}
								/>
								<br />
								<br />
							</>
						)}
						<br />
						<Button variant="contained">Create</Button>
					</AccordionDetails>
				</Accordion>
			</Grid>
		</Grid>
	);
};
