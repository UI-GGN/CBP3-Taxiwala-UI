import { ReactElement, React } from "react";
import WindowLayout from "../../../Components/WindowLayout";
import { RightWindow } from "./RequestHome";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import TimelineComponent from "../../../Components/Timeline";

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
							width: "100%",
							height: "fit-content",
							backgroundColor: "#EDEDED",
							borderRadius: "20px",
							padding: "15px 20px",
						}}
					>
						<Typography
							variant="body2"
							sx={{ color: "typography.secondary", fontSize: "19px" }}
						>
							Driver assigned: Name, 987654321
						</Typography>
					</Box>
					<br />
					<Box
						sx={{
							width: "100%",
							height: "fit-content",
							backgroundColor: "#EDEDED",
							borderRadius: "20px",
							padding: "15px 20px",
						}}
					>
						<Typography
							variant="body2"
							sx={{ color: "typography.secondary", fontSize: "19px" }}
						>
							Dates: 3rd June 2023
							<br />
							Checkin Time: 9:00 AM
							<br />
							Checkout Time: 9:15 AM
						</Typography>
					</Box>
					<br />
					<TimelineComponent />
					<hr />
					<br />
					<Typography
						variant="body2"
						sx={{ color: "typography.secondary", fontSize: "19px" }}
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
