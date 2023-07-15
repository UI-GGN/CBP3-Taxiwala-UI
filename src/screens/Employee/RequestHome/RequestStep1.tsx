import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Alert, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { FC, useMemo } from "react";
import Dropdown from "../../../Components/TextInput/Dropdown";
import { IRequestStep1Props } from "../../../Interfaces";
import {
	extractDate,
	getTodaysDate,
	hasThreeDayGap,
	isBefore,
} from "../../../utils/CabRequestHelper";
import { shouldNextButtonDisabled } from "../../../utils/CabRequestValidation";
import "./RequestHome.css";

const TotalSteps = 2;

const RequestStep1: FC<IRequestStep1Props> = ({
	cabType,
	setCabType,
	checkInTime,
	setCheckInTime,
	checkOutTime,
	setCheckOutTime,
	dateForAdHoc,
	setDateForAdHoc,
	noEndDateNeeded,
	setNoEndDateNeeded,
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	currentstep,
	setCurrentstep,
}: IRequestStep1Props): JSX.Element => {
	const [alignment, setAlignment] = React.useState("Ad-Hoc");

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		console.log(event.target);
		newAlignment && setAlignment(newAlignment);
	};

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
					</LocalizationProvider>
					<br />
					<br />
					<Dropdown
						label="Select specific cab need"
						handleChange={(value: string) => setCabType(value)}
						value={cabType}
						dropdownvalues={[
							{ value: "pick", label: "Need cab for pickup only" },
							{ value: "drop", label: "Need cab for drop only" },
						]}
					/>
					<br />
					{(cabType === "pick" || cabType === "drop") && (
						<>
							<br />
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<TimePicker
									label={"Pick up time"}
									value={cabType === "pick" ? checkInTime : checkOutTime}
									onChange={(time: any) => {
										cabType === "pick"
											? setCheckInTime(time)
											: setCheckOutTime(time);
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
						handleChange={(value: string) => setCabType(value)}
						value={cabType}
						dropdownvalues={[
							{ value: "pick", label: "Need cab for pickup only" },
							{ value: "drop", label: "Need cab for drop only" },
						]}
					/>
					<br />
					{(cabType === "pick" || cabType === "drop") && (
						<>
							<br />
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<TimePicker
									label={"Pick up time"}
									value={cabType === "pick" ? checkInTime : checkOutTime}
									onChange={(time: any) => {
										cabType === "pick"
											? setCheckInTime(time)
											: setCheckOutTime(time);
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
					cabType,
					checkInTime,
					checkOutTime,
					startDate,
					endDate,
					noEndDateNeeded,
					dateForAdHoc
				)}
				onClick={() => {
					currentstep < TotalSteps - 1 &&
						setCurrentstep((prevStep) => prevStep + 1);
				}}
			>
				Next
			</Button>
		</>
	);
};

export default RequestStep1;
