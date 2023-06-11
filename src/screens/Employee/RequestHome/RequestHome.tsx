import React, { ReactElement } from "react";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Checkbox from "@mui/material/Checkbox";
// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from "@mui/material/FormControlLabel";
import "./RequestHome.css";

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
	const dropdownvalues = [
		{
			value: "9:00",
			label: "9:00",
		},
		{
			value: "10:00",
			label: "10:00",
		},
	];

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

						<Dropdown
							label="Select specific cab need"
							handleChange={(value: string) => setCabtype(value)}
							value={cabtype}
							dropdownvalues={[
								{ value: "pick", label: "Need cab for pickup only" },
								{ value: "drop", label: "Need cab for drop only" },
								{ value: "both", label: "Need cab for both pick and drop" },
							]}
						/>
						<br />
						{(cabtype == "pick" || cabtype == "both") && (
							<Dropdown
								label="Check In Time"
								handleChange={(value: string) => setCheckintime(value)}
								value={checkintime}
								dropdownvalues={dropdownvalues}
							/>
						)}
						{(cabtype == "drop" || cabtype == "both") && (
							<Dropdown
								label="Check Out Time"
								handleChange={(value) => setCheckouttime(value)}
								value={checkouttime}
								dropdownvalues={dropdownvalues}
							/>
						)}
					</div>
				)}
				{alignment == "Regular" && (
					<div>
						<Alert severity="info">
							Regular requests are when you plan to come for few days to office.
							These are to be made 1 day before by 10pm.
						</Alert>
						<br />
						<div>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["DatePicker"]}>
									<DatePicker label="Select start date" />
									<DatePicker
										label="Select end date"
										disabled={noEndDateNeeded}
									/>
								</DemoContainer>
							</LocalizationProvider>
						</div>

						<FormControlLabel
							control={
								<Checkbox
									checked={noEndDateNeeded}
									onChange={(e) => setNoEndDateNeeded(e.target.checked)}
									name="isEndDate"
								/>
							}
							label="No End Date decided"
						/>
						<br />
						<br />
						<Dropdown
							label="Check In Time"
							handleChange={(value: string) => setCheckintime(value)}
							value={checkintime}
							dropdownvalues={dropdownvalues}
						/>
						<br />
						<Dropdown
							label="Check Out Time"
							handleChange={(value) => setCheckouttime(value)}
							value={checkouttime}
							dropdownvalues={dropdownvalues}
						/>
					</div>
				)}
			</>
		);
	};

	const Step2 = () => {
		return (
			<>
				<Accordion>
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
								value={""}
								handleChange={(text: string) => console.log(text)}
								styles={{
									width: "100%",
									height: "49.4px",
									marginTop: "10px",
									marginRight: "40px",
								}}
							/>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6} lg={6}>
									<TextInput
										placeholder="PIN Code"
										type="text"
										value={""}
										handleChange={(text: string) => console.log(text)}
										styles={{
											width: "100%",
											height: "49.4px",
											marginTop: "10px",
											marginRight: "40px",
										}}
									/>
								</Grid>
								<Grid item xs={12} md={6} lg={6}>
									<TextInput
										placeholder="Nearest Landmark"
										type="text"
										value={""}
										handleChange={(text: string) => console.log(text)}
										styles={{
											width: "100%",
											height: "49.4px",
											marginTop: "10px",
											marginRight: "40px",
										}}
									/>
								</Grid>
							</Grid>
						</div>
					</AccordionDetails>
				</Accordion>
				<br />
				<Accordion>
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
								value={""}
								handleChange={(text: string) => console.log(text)}
								styles={{
									width: "100%",
									height: "49.4px",
									marginTop: "10px",
									marginRight: "40px",
								}}
							/>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6} lg={6}>
									<TextInput
										placeholder="PIN Code"
										type="text"
										value={""}
										handleChange={(text: string) => console.log(text)}
										styles={{
											width: "100%",
											height: "49.4px",
											marginTop: "10px",
											marginRight: "40px",
										}}
									/>
								</Grid>
								<Grid item xs={12} md={6} lg={6}>
									<TextInput
										placeholder="Nearest Landmark"
										type="text"
										value={""}
										handleChange={(text: string) => console.log(text)}
										styles={{
											width: "100%",
											height: "49.4px",
											marginTop: "10px",
											marginRight: "40px",
										}}
									/>
								</Grid>
							</Grid>
						</div>
					</AccordionDetails>
				</Accordion>
				<br />
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

				<div style={{ display: "flex" }}>
					{currentstep > 0 && (
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
					)}
					<Button
						variant="contained"
						disableElevation
						onClick={() => {
							currentstep < TotalSteps - 1 &&
								setCurrentstep((prevStep) => prevStep + 1);
						}}
					>
						{currentstep == TotalSteps - 1 ? "Submit" : "Next"}
					</Button>
				</div>
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
