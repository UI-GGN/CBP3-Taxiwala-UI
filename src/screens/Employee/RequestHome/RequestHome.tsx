import React, { ReactElement, useMemo } from "react";
import WindowLayout from "../../../Components/WindowLayout";
import daycab from "../../../assets/parked_cab.jpg";
import nightcab from "../../../assets/night-cab.jpeg";
import Box from "@mui/material/Box";
import { useState } from "react";
import {
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Grid,
	ToggleButtonGroup,
	ToggleButton,
	Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextInput from "../../../Components/TextInput/TextInput";
import Dropdown from "../../../Components/TextInput/Dropdown";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Checkbox from "@mui/material/Checkbox";
// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from "@mui/material/FormControlLabel";
import "./RequestHome.css";
import {
	setDropAndPickUpLocation,
	shouldNextButtonDisabled,
} from "../../../utils/CabRequestValidation";
import {
	getTodaysDate,
	extractDate,
	isBefore,
	hasThreeDayGap,
} from "../../../utils/CabRequestHelper";
import { TimePicker } from "@mui/x-date-pickers";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const RightWindow = () => {
	const theme = useTheme();

	return (
		<img
			src={theme.palette.mode === "light" ? daycab : nightcab}
			alt="cab parked"
			className="login_coverimg"
		/>
	);
};

const LeftWindow = () => {
	const TotalSteps = 2;
	const [currentstep, setCurrentstep] = useState(0);
	const [alignment, setAlignment] = React.useState("Ad-Hoc");
	const [cabtype, setCabtype] = useState("");
	const [checkintime, setCheckintime] = useState("");
	const [checkouttime, setCheckouttime] = useState("");
	const [noEndDateNeeded, setNoEndDateNeeded] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [pickupLocation, setPickupLocation] = useState({
		location: "",
		pincode: "",
		landmark: "",
	});
	const [dropLocation, setDropLocation] = useState({
		location: "",
		pincode: "",
		landmark: "",
	});
	const [dateForAdHoc, setDateForAdHoc] = useState(null);
	const [textInputChanged, setTextInputChanged] = useState(0);

	const isStartDateGreaterThanEndDate: boolean = useMemo(() => {
		if (startDate !== null && endDate !== null) {
			return isBefore(extractDate(endDate), extractDate(startDate));
		}
		return false;
	}, [startDate, endDate]);

	const isEndDateThreeDaysAfterStartDate: boolean = useMemo(() => {
		if (isStartDateGreaterThanEndDate) {
			return true;
		}
		if (startDate !== null && endDate !== null) {
			return hasThreeDayGap(extractDate(endDate), extractDate(startDate));
		}
		return true;
	}, [startDate, endDate]);

	const Step1 = () => {
		const handleChange = (
			event: React.MouseEvent<HTMLElement>,
			newAlignment: string
		) => {
			console.log(event.target);
			newAlignment && setAlignment(newAlignment);
		};

		return (
			<>
				<ToggleButtonGroup
					color="primary"
					value={alignment}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
				>
					<ToggleButton value="Ad-Hoc">Ad-Hoc</ToggleButton>
					<ToggleButton value="Regular">Regular</ToggleButton>
				</ToggleButtonGroup>
				<br />
				<br />

				{alignment == "Ad-Hoc" && (
					<div>
						<Alert severity="info">
							Ad-Hoc requests are request on demand basis for the specific day.
							These are to be made 1 hour before atleast.
						</Alert>
						<br />
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							{/* <DemoContainer components={["DatePicker"]}> */}
							<DatePicker
								label="Select date"
								value={dateForAdHoc}
								shouldDisableDate={(date: Date) => {
									const currentDate = getTodaysDate();
									return date < currentDate;
								}}
								onChange={(date: any) => setDateForAdHoc(date)}
								slotProps={{
									textField: {
										error: false,
									},
								}}
							/>
							{/* </DemoContainer> */}
						</LocalizationProvider>
						<br />
						<br />
						<Dropdown
							label="Select specific cab need"
							handleChange={(value: string) => setCabtype(value)}
							value={cabtype}
							dropdownvalues={[
								{ value: "pick", label: "Need cab for pickup only" },
								{ value: "drop", label: "Need cab for drop only" },
							]}
						/>
						<br />
						{(cabtype === "pick" || cabtype === "drop") && (
							<>
								<br />
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<TimePicker
										label={
											cabtype === "pick" ? "Check in time" : "Check out time"
										}
										value={cabtype === "pick" ? checkintime : checkouttime}
										onChange={(time: any) => {
											cabtype === "pick"
												? setCheckintime(time)
												: setCheckouttime(time);
										}}
										slotProps={{
											textField: {
												error: false,
											},
										}}
									/>
								</LocalizationProvider>
								<br />
							</>
						)}
						<br />
					</div>
				)}
				{alignment == "Regular" && (
					<div>
						<Alert severity="info">
							Regular requests are when you plan to come for few days to office.
							These are to be made 1 day before by 10pm.
						</Alert>
						<br />
						<div className="date_picker">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								{/* <DemoContainer components={["DatePicker"]}> */}
								<DatePicker
									className="start_date"
									label="Select start date"
									value={startDate}
									onChange={(date: any) => setStartDate(date)}
									shouldDisableDate={(date: Date) => {
										const currentDate = new Date();
										return date < currentDate;
									}}
								/>
								<DatePicker
									label="Select end date"
									value={endDate}
									disabled={noEndDateNeeded}
									onChange={(date: any) => setEndDate(date)}
									shouldDisableDate={(date: Date) => {
										const currentDate = new Date();
										return date < currentDate;
									}}
								/>
								{/* </DemoContainer> */}
							</LocalizationProvider>
						</div>
						<div className="error">
							{(isStartDateGreaterThanEndDate ||
								!isEndDateThreeDaysAfterStartDate) && (
								<ErrorOutlineIcon
									style={{ fontSize: "12px", marginRight: "5px" }}
								/>
							)}
							{isStartDateGreaterThanEndDate && (
								<span> Start date cannot be greater than end date</span>
							)}
							{!isEndDateThreeDaysAfterStartDate && (
								<span> There should be minimum 3 days </span>
							)}
						</div>
						<FormControlLabel
							control={
								<Checkbox
									checked={noEndDateNeeded}
									onChange={(e) => {
										setNoEndDateNeeded(e.target.checked);
										setEndDate(null);
									}}
									name="isEndDate"
								/>
							}
							label="No End Date decided"
						/>
						<br />
						<br />
						<Dropdown
							label="Select specific cab need"
							handleChange={(value: string) => setCabtype(value)}
							value={cabtype}
							dropdownvalues={[
								{ value: "pick", label: "Need cab for pickup only" },
								{ value: "drop", label: "Need cab for drop only" },
							]}
						/>
						<br />
						{(cabtype === "pick" || cabtype === "drop") && (
							<>
								<br />
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<TimePicker
										label={
											cabtype === "pick" ? "Check in time" : "Check out time"
										}
										value={cabtype === "pick" ? checkintime : checkouttime}
										onChange={(time: any) => {
											cabtype === "pick"
												? setCheckintime(time)
												: setCheckouttime(time);
										}}
										slotProps={{
											textField: {
												error: false,
											},
										}}
									/>
								</LocalizationProvider>
								<br />
							</>
						)}
						<br />
					</div>
				)}
				<Button
					variant="contained"
					disabled={shouldNextButtonDisabled(
						alignment,
						cabtype,
						checkintime,
						checkouttime,
						startDate,
						endDate,
						noEndDateNeeded,
						dateForAdHoc
					)}
					onClick={() => {
						currentstep < TotalSteps - 1 &&
							setCurrentstep((prevStep) => prevStep + 1);
						setDropAndPickUpLocation(
							cabtype,
							setDropLocation,
							setPickupLocation
						);
					}}
				>
					Next
				</Button>
			</>
		);
	};

	const Step2 = () => {
		return (
			<>
				<Accordion defaultExpanded>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>Enter your Pickup location</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div>
							<Typography>
								Pickup point is where you will be coming from towards office!
							</Typography>
							<TextInput
								placeholder="Enter your pickup location"
								type="text"
								value={pickupLocation.location}
								handleChange={(text: string) => {
									setPickupLocation((prevLocation) => {
										return {
											...prevLocation,
											location: text,
										};
									});
									setTextInputChanged(0);
								}}
								styles={{
									width: "100%",
									height: "49.4px",
									marginTop: "10px",
									marginRight: "40px",
								}}
								id={0}
								id_changed={textInputChanged}
							/>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6} lg={6}>
									<TextInput
										placeholder="PIN Code"
										type="text"
										value={pickupLocation.pincode}
										handleChange={(text: string) => {
											setPickupLocation((prevLocation) => {
												return {
													...prevLocation,
													pincode: text,
												};
											});
											setTextInputChanged(1);
										}}
										styles={{
											width: "100%",
											height: "49.4px",
											marginTop: "10px",
											marginRight: "40px",
										}}
										id={1}
										id_changed={textInputChanged}
									/>
								</Grid>
								<Grid item xs={12} md={6} lg={6}>
									<TextInput
										placeholder="Nearest Landmark"
										type="text"
										value={pickupLocation.landmark}
										handleChange={(text: string) => {
											setPickupLocation((prevLocation) => {
												return {
													...prevLocation,
													landmark: text,
												};
											});
											setTextInputChanged(2);
										}}
										styles={{
											width: "100%",
											height: "49.4px",
											marginTop: "10px",
											marginRight: "40px",
										}}
										id={2}
										id_changed={textInputChanged}
									/>
								</Grid>
							</Grid>
						</div>
					</AccordionDetails>
				</Accordion>
				<br />
				<Accordion defaultExpanded>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>Enter your Drop location</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div>
							<Typography>
								Drop point is where you will be going to after the office!
							</Typography>
							<TextInput
								placeholder="Enter your pickup location"
								type="text"
								value={dropLocation.location}
								handleChange={(text: string) => {
									setDropLocation((prevLocation) => {
										return {
											...prevLocation,
											location: text,
										};
									});
									setTextInputChanged(3);
								}}
								styles={{
									width: "100%",
									height: "49.4px",
									marginTop: "10px",
									marginRight: "40px",
								}}
								id={3}
								id_changed={textInputChanged}
							/>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6} lg={6}>
									<TextInput
										placeholder="PIN Code"
										type="text"
										value={dropLocation.pincode}
										handleChange={(text: string) => {
											setDropLocation((prevLocation) => {
												return {
													...prevLocation,
													pincode: text,
												};
											});
											setTextInputChanged(4);
										}}
										styles={{
											width: "100%",
											height: "49.4px",
											marginTop: "10px",
											marginRight: "40px",
										}}
										id={4}
										id_changed={textInputChanged}
									/>
								</Grid>
								<Grid item xs={12} md={6} lg={6}>
									<TextInput
										placeholder="Nearest Landmark"
										type="text"
										value={dropLocation.landmark}
										handleChange={(text: string) => {
											setDropLocation((prevLocation) => {
												return {
													...prevLocation,
													landmark: text,
												};
											});
											setTextInputChanged(5);
										}}
										styles={{
											width: "100%",
											height: "49.4px",
											marginTop: "10px",
											marginRight: "40px",
										}}
										id={5}
										id_changed={textInputChanged}
									/>
								</Grid>
							</Grid>
						</div>
					</AccordionDetails>
				</Accordion>
				<br />
				<div style={{ display: "flex" }}>
					<Button
						variant="outlined"
						sx={{
							mr: 1,
						}}
						onClick={() => {
							currentstep > 0 && setCurrentstep((prevStep) => prevStep - 1);
						}}
					>
						<ArrowBackIcon />
					</Button>
					<Button
						variant="contained"
						disabled={
							pickupLocation.location === "" ||
							pickupLocation.pincode === "" ||
							dropLocation.location === "" ||
							dropLocation.pincode === ""
						}
						onClick={() => {
							currentstep < TotalSteps - 1 &&
								setCurrentstep((prevStep) => prevStep + 1);
						}}
					>
						Submit
					</Button>
				</div>
			</>
		);
	};

	return (
		<>
			<Box style={{ marginTop: "8rem" }} className="left_box">
				<Typography
					color="typography.primary"
					style={{ margin: "0px", marginBottom: "-13px" }}
				>
					Looking for office cab?
				</Typography>
				{/* <Typography variant="h3">Request one now</Typography> */}
				<h1 className="request_headline" style={{ margin: "0px" }}>
					Request one now
				</h1>
				<div>
					<p className="stepsBox">
						Step {currentstep + 1}/{TotalSteps}
					</p>
				</div>
				<br />
				{currentstep == 0 && <Step1 />}
				{currentstep == 1 && <Step2 />}
			</Box>
		</>
	);
};

const RequestHome: React.FC = (): ReactElement => {
	return (
		<>
			<WindowLayout leftWindow={<LeftWindow />} rightWindow={<RightWindow />} />
		</>
	);
};

export default RequestHome;
