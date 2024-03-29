import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import WindowLayout from "../../../Components/WindowLayout";
import "../../../index.css";
import { RightWindow } from "./RequestHome";

const LeftWindow = () => {
	const navigate = useNavigate();

	return (
		<>
			<Box style={{ marginTop: "8rem" }} className="left_box">
				<h1 className="request_headline" style={{ margin: "0px" }}>
					Request Declined
				</h1>
				<Typography
					variant="h6"
					color="typography.primary"
					style={{ margin: "0px" }}
				>
					Your request could not be fulfilled at the moment.
					<br /> Please contact admin staff at <b>Phone number: 987654321</b>
				</Typography>
				<br />
				<Button
					variant="outlined"
					className="actions"
					onClick={() => {
						navigate("/employee/allrequests/");
					}}
				>
					<ArrowBackIcon />
					Back to Requests
				</Button>
			</Box>
		</>
	);
};

const RequestDeclined: React.FC = (): ReactElement => {
	return (
		<>
			<WindowLayout leftWindow={<LeftWindow />} rightWindow={<RightWindow />} />
		</>
	);
};

export default RequestDeclined;
