import {
	Card,
	CardContent,
	Typography,
	Box,
	Grid,
	Stack,
	Chip,
	Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IRequestCardProps } from "../../Interfaces";
import { FC } from "react";
import TimelineComponent from "../Timeline";
import {
	convertDateFormat,
	convertTimeFormat,
} from "../../utils/CabRequestHelper";

export const RequestCard: FC<IRequestCardProps> = ({
	request,
	index,
	handleModal,
}: IRequestCardProps): JSX.Element => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent sx={{ pb: 0, paddingRight: 0 }}>
				<Grid container spacing={1}>
					<Grid item xs={8} md={8} lg={8}>
						<Typography sx={{ fontSize: 16 }} color="text.secondary">
							<b>
								{" "}
								{request.employeeName}, {request.employeeId}
							</b>
						</Typography>
						<Typography sx={{ fontSize: 16 }} color="text.secondary">
							{request.phoneNumber}
						</Typography>
						<Typography
							sx={{ fontSize: 16 }}
							color="text.secondary"
							marginBottom="10px"
						>
							Project code: {request.projectCode}
						</Typography>
						<Typography>
							Cab required Date: {convertDateFormat(request.pickupTime)}
						</Typography>
					</Grid>
					<Grid item xs={4} md={4} lg={4}>
						<Typography
							color="text.secondary"
							sx={{ fontSize: 15, float: "right", paddingRight: "10px" }}
						>
							{`${convertDateFormat(request.createdAt)}, ${convertTimeFormat(
								request.createdAt
							)}`}
						</Typography>
					</Grid>
				</Grid>
				<TimelineComponent
					pickupTime={request.pickupTime}
					pickUpLocation={request.pickupLocation}
					dropLocation={request.dropLocation}
				/>
			</CardContent>
			<Box sx={{ ml: 2, mb: 2 }}>
				<Grid container spacing={1}>
					<Grid item xs={10} md={10} lg={10}>
						<Stack direction="row" spacing={1} flexWrap="wrap">
							<Chip
								color="secondary"
								label="Ad Hoc Request"
								variant="outlined"
							/>
							{request.status === "PENDING" && (
								<Chip
									label={request.status}
									style={{
										backgroundColor: "#BDDFFF",
										color: "#1E3583",
										marginBottom: "5px",
									}}
								/>
							)}
							{request.status === "DECLINED" && (
								<Chip
									label={request.status}
									style={{
										backgroundColor: "#FFBDBD",
										color: "#831E1E",
										marginBottom: "5px",
									}}
								/>
							)}
							{request.status === "APPROVED" && (
								<>
									<Chip
										label={request.status}
										style={{
											backgroundColor: "#BDFFC0",
											color: "#1E8371",
											marginBottom: "5px",
										}}
									/>
									<Chip
										label={`Vendor : ${request.vendorName}`}
										style={{
											backgroundColor: "#FFD8B0",
											color: "#824303",
											marginBottom: "5px",
										}}
									/>
								</>
							)}
						</Stack>
					</Grid>
					<Grid item xs={2} md={2} lg={2}>
						<Button
							sx={{
								float: "right",
								width: "15px",
								marginRight: "30px",
								":hover": "backgroundColor: red",
							}}
							onClick={() => handleModal(index)}
						>
							<ArrowForwardIcon sx={{ color: "typography.primary" }} />
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Card>
	);
};
