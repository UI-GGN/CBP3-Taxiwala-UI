import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { IEmmployeeDetails, IRequestStep2Props } from "../../../Interfaces";
import "./RequestHome.css";
import LocationAccordian from "./components/LocationAccordian";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TextInput from "../../../Components/TextInput/TextInput";
import { shouldSubmitButtonDisabled } from "../../../utils/CabRequestValidation";

const TotalSteps = 2;

const RequestStep2: FC<IRequestStep2Props> = ({
	location,
	setLocation,
	currentstep,
	setCurrentstep,
	cabType,
	employeeDetails,
	setEmployeeDetails,
}: IRequestStep2Props): JSX.Element => {
	console.log(location);

	return (
		<>
			{cabType === "pick" ? (
				<LocationAccordian
					location={location}
					setLocation={setLocation}
					cabType={cabType.charAt(0).toUpperCase() + cabType.slice(1) + "up"}
				/>
			) : (
				<LocationAccordian
					location={location}
					setLocation={setLocation}
					cabType={cabType.charAt(0).toUpperCase() + cabType.slice(1)}
				/>
			)}
			<br />
			<Typography variant="h6">
				{cabType === "pick" ? `Drop location` : `Pickup location`}
			</Typography>
			<Typography
				variant="body2"
				marginTop={"5px"}
				style={{ display: "flex", alignItems: "center" }}
			>
				<LocationOnOutlinedIcon style={{ color: "pink", paddingLeft: "0" }} />
				International Tech Park, Sector 59, Gurugram, Haryana, 122102,
			</Typography>
			<br />
			<Typography variant="h6" margin={"5px 0"}>
				Code
			</Typography>
			<div className="employee_details">
				<TextInput
					placeholder="Employee ID"
					type="text"
					styles={{
						width: "200px",
						marginBottom: "10px",
					}}
					handleChange={(text: string) => {
						setEmployeeDetails((x: IEmmployeeDetails) => {
							return {
								...x,
								id: text,
							};
						});
					}}
					value={employeeDetails.id}
				/>
				<TextInput
					placeholder="Project Code"
					type="text"
					styles={{
						width: "200px",
					}}
					handleChange={(text: string) => {
						setEmployeeDetails((x: IEmmployeeDetails) => {
							return {
								...x,
								projectCode: text,
							};
						});
					}}
					value={employeeDetails.projectCode}
				/>
			</div>
			<br />
			<br />
			<div style={{ display: "flex" }}>
				<Button
					data-testid="back_button"
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
					data-testid="submit_button"
					variant="contained"
					disabled={shouldSubmitButtonDisabled(location, employeeDetails)}
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

export default RequestStep2;
