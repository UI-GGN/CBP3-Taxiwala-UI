import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	FormControlLabel,
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
import React, { ReactElement, useMemo } from "react";
import { ICreateRouteAccordian, IVehicle, IVendor } from "../../Interfaces";
import { shouldCreateButtonDisabled } from "../../utils/AdminValidation";
import {
	extractDate,
	getTodaysDate,
	isBefore,
} from "../../utils/CabRequestHelper";
import Dropdown from "../TextInput/Dropdown";
import TextInput from "../TextInput/TextInput";
import "./../../screens/Admin/RequestHome/admin.css";
import VehicleData from "./../../utils/VehicleData.json";
import VendorData from "./../../utils/VendorData.json";

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

export const CreateRouteAccordian: React.FC<ICreateRouteAccordian> = ({
	pickupTime,
	setPickupTime,
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	pickupLocation,
	setPickupLocation,
	dropLocation,
	setDropLocation,
	vehicleType,
	setVehicleType,
	existingVehicleID,
	setExistingVehicleID,
	newVehicleID,
	setNewVehicleID,
	driverName,
	setDriverName,
	vendorName,
	setVendorName,
}: ICreateRouteAccordian): ReactElement => {
	const handleVehicleTypeChange = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setVehicleType(event.target.value);
	};

	const isStartDateGreaterThanEndDate: boolean = useMemo(() => {
		if (startDate !== null && endDate !== null) {
			return isBefore(extractDate(endDate), extractDate(startDate));
		}
		return false;
	}, [startDate, endDate]);

	return (
		<Accordion sx={{ width: "fit-content", marginRight: "0" }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography variant="h6"> Create New Route </Typography>
			</AccordionSummary>
			<AccordionDetails>
				<div>
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
							onChange={(date: any) => {
								console.log(date);
								setEndDate(date);
							}}
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
					onChange={handleVehicleTypeChange}
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
				{vehicleType === "existing" && (
					<>
						<Dropdown
							label="Choose vehicle ID"
							handleChange={(text: string) => {
								setExistingVehicleID(text);
							}}
							value={existingVehicleID}
							dropdownvalues={vehicleDropdownValues}
							width="70%"
						/>
						<br />
					</>
				)}
				{vehicleType === "new" && (
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
							handleChange={(text: string) => setNewVehicleID(text)}
							value={newVehicleID}
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
				<Button
					variant="contained"
					disabled={shouldCreateButtonDisabled(
						pickupTime,
						startDate,
						endDate,
						pickupLocation,
						dropLocation,
						vehicleType,
						vendorName,
						newVehicleID,
						existingVehicleID,
						driverName
					)}
					data-testid="create_button"
				>
					Create
				</Button>
			</AccordionDetails>
		</Accordion>
	);
};
