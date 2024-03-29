import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import TimelineComponent from "../../../Components/Timeline";
import WindowLayout from "../../../Components/WindowLayout";
import { RightWindow } from "./RequestHome";

const LeftWindow = () => {
	const navigate = useNavigate();

	return (
		<>
			<Box style={{ marginTop: "8rem" }} className="left_box">
				<h1 className="request_headline" style={{ margin: "0px" }}>
					Your assigned Route
				</h1>
				<Box>
					<Box
						sx={{
							width: "60%",
							height: "fit-content",
							backgroundColor: "#EDEDED",
							borderRadius: "20px",
							padding: "15px 20px",
						}}
					>
						<Typography
							variant="body2"
							sx={{
								color: "black",
								fontSize: "19px",
							}}
						>
							Driver assigned: Name, 987654321
						</Typography>
					</Box>
					<br />
					<Box
						sx={{
							width: "60%",
							height: "fit-content",
							backgroundColor: "#EDEDED",
							borderRadius: "20px",
							padding: "15px 20px",
						}}
					>
						<Typography
							variant="body2"
							sx={{
								color: "black",
								fontSize: "19px",
							}}
						>
							Dates: 3rd June 2023
							<br />
							Checkin Time: 9:00 AM
							<br />
							Checkout Time: 9:15 AM
						</Typography>
					</Box>
					<br />
					<TimelineComponent
						pickupTime={"2023-07-04T10:30:29.252Z"}
						pickUpLocation={"Guru Dronacharya Metro Station"}
						dropLocation={"Thoughtworks Technologies"}
					/>
					<hr />
					<br />
					<Typography
						variant="body2"
						sx={{
							color: "black",
							fontSize: "19px",
						}}
					>
						Change of Plans?
					</Typography>
					<Button
						style={{
							backgroundColor: "#FEC1C1",
							padding: "10px",
							margin: "10px 0px",
							fontSize: "15px",
							color: "red",
						}}
						variant="outlined"
					>
						Delete your request
					</Button>
				</Box>
				<br />
				<br />
				<Button
					variant="outlined"
					onClick={() => {
						navigate("/employee/home");
					}}
				>
					<ArrowBackIcon /> Back to Home
				</Button>
			</Box>
		</>
	);
};

const AssignedRoute: React.FC = (): ReactElement => {
	return (
		<>
			<WindowLayout leftWindow={<LeftWindow />} rightWindow={<RightWindow />} />
		</>
	);
};

export default AssignedRoute;
