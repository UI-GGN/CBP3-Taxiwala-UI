/* eslint-disable no-mixed-spaces-and-tabs */
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import React, { ReactElement, useState } from "react";
import WindowLayout from "../../../Components/WindowLayout";
import {
	IEmmployeeDetails,
	ILocation,
	UseStateType,
	UseStateTypeForDate,
} from "../../../Interfaces";
import nightcab from "../../../assets/night-cab.jpeg";
import daycab from "../../../assets/parked_cab.jpg";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import FormGroup from '@mui/material/FormGroup';
import "./RequestHome.css";
import RequestStep1 from "./RequestStep1";
import RequestStep2 from "./RequestStep2";
import { PostService } from "../../../Services/ApiService/ApiUtils";
import { CabRequestService } from "../../../Services/CabRequestService";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../../Components/Header/header";
import { headerType } from "../../../constants";
import { getUserDetailsFromToken } from "../../../utils/userValidation";
import moment from "moment";

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
	const navigate = useNavigate();
	const [currentstep, setCurrentstep]: UseStateType<number> = useState(0);
	const [cabtype, setCabtype]: UseStateType<string> = useState("");
	const [checkintime, setCheckintime]: UseStateType<string> = useState("");
	const [checkouttime, setCheckouttime]: UseStateType<string> = useState("");
	const [noEndDateNeeded, setNoEndDateNeeded]: UseStateType<boolean> =
		useState(false);
	const [dateForAdHoc, setDateForAdHoc]: UseStateTypeForDate =
		useState<Date | null>(null);
	const [startDate, setStartDate]: UseStateTypeForDate = useState<Date | null>(
		null
	);
	const [endDate, setEndDate]: UseStateTypeForDate = useState<Date | null>(
		null
	);
	const [location, setLocation]: UseStateType<ILocation> = useState({
		address: "",
		pincode: "",
		landmark: "",
	});
	const [employeeDetails, setEmployeeDetails]: UseStateType<IEmmployeeDetails> =
		useState({
			id: "",
			projectCode: "",
			phoneNumber: "",
		});
	const { postApi, data, isLoading, isError } = PostService(
		CabRequestService.create
	);

	const submitFn = () => {
		const userdetails = getUserDetailsFromToken();
		const formattedAdhocDate = new Date(dateForAdHoc);
		const selectedDate = moment(formattedAdhocDate).format("YYYY-MM-DD");

		const formattedTime = new Date(checkintime);
		const selectedTime = moment(formattedTime).format("HH:mm:ss");
		console.log(selectedTime);
		console.log(selectedDate + "T" + selectedTime + ".000Z");
		const pickTime = selectedDate + "T" + selectedTime + ".000Z";

		const formatedCheckoutTime = new Date(checkouttime);
		const selectedCheckoutTime =
			moment(formatedCheckoutTime).format("HH:mm:ss");
		console.log(selectedCheckoutTime);
		console.log(selectedDate + "T" + selectedCheckoutTime + ".000Z");
		const dropTime = selectedDate + "T" + selectedCheckoutTime + ".000Z";
		// navigate(`/employee/request/${63}`);
		// return;

		postApi(
			{
				employeeId: userdetails.employeeId,
				employeeName: userdetails.name,
				pickupLocation:
					cabtype === "pick"
						? location.address +
						  " pincode: " +
						  location.pincode +
						  " landmark: " +
						  location.landmark
						: "International Tech Park, Sector 59, Gurugram, Haryana, 122102",
				dropLocation:
					cabtype === "pick"
						? "International Tech Park, Sector 59, Gurugram, Haryana, 122102"
						: location.address +
						  " pincode: " +
						  location.pincode +
						  " landmark: " +
						  location.landmark,
				pickupTime: cabtype === "pick" ? pickTime : dropTime,
				projectCode: employeeDetails.projectCode,
				phoneNumber: employeeDetails.phoneNumber,
			},
			undefined,
			(data: any) => {
				console.log(data);
				navigate(`/employee/request/${data.data.id}`);
				return;
			}
		);
		// console.log(location, employeeDetails, checkouttime);
	};

	return (
		<>
			<Box style={{ marginTop: "8rem" }} className="left_box">
				<Typography
					color="typography.primary"
					style={{ margin: "0px", marginBottom: "-10px" }}
				>
					Looking for office cab? {isLoading ? "loading" : "done"}
				</Typography>
				{/* <Typography variant="h3">Request one now</Typography> */}
				<Typography
					variant="h3"
					sx={{
						fontSize: "2.5rem",
						fontWeight: 700,
						color: "typography.primaryblue",
						justifyContent: "right",
					}}
				>
					Request one now
				</Typography>
				<div>
					<p className="stepsBox">
						Step {currentstep + 1}/{TotalSteps}
					</p>
				</div>
				<br />
				{currentstep == 0 && (
					<RequestStep1
						cabType={cabtype}
						setCabType={setCabtype}
						checkInTime={checkintime}
						setCheckInTime={setCheckintime}
						checkOutTime={checkouttime}
						setCheckOutTime={setCheckouttime}
						dateForAdHoc={dateForAdHoc}
						setDateForAdHoc={setDateForAdHoc}
						noEndDateNeeded={noEndDateNeeded}
						setNoEndDateNeeded={setNoEndDateNeeded}
						startDate={startDate}
						setStartDate={setStartDate}
						endDate={endDate}
						setEndDate={setEndDate}
						currentstep={currentstep}
						setCurrentstep={setCurrentstep}
					/>
				)}
				{currentstep == 1 && (
					<RequestStep2
						location={location}
						setLocation={setLocation}
						currentstep={currentstep}
						setCurrentstep={setCurrentstep}
						cabType={cabtype}
						employeeDetails={employeeDetails}
						setEmployeeDetails={setEmployeeDetails}
						submitFn={submitFn}
						isLoading={isLoading}
						isError={isError}
					/>
				)}
			</Box>
		</>
	);
};

const RequestHome: React.FC = (): ReactElement => {
	return (
		<>
			<HeaderBar headerType={headerType.Employee} />
			<WindowLayout leftWindow={<LeftWindow />} rightWindow={<RightWindow />} />
		</>
	);
};

export default RequestHome;
