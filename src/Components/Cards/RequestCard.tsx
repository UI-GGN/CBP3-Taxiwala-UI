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
					<Grid item xs={9} md={9} lg={9}>
						<Typography sx={{ fontSize: 16 }} color="text.secondary">
							<b>
								{" "}
								{request.employeeName}, {request.employeeId}
							</b>
						</Typography>
						<Typography sx={{ fontSize: 16 }} color="text.secondary">
							Phone no: {request.phoneNumber}
						</Typography>
						<Typography
							sx={{ fontSize: 16 }}
							color="text.secondary"
							marginBottom="10px"
						>
							Project code: {request.projectCode}
						</Typography>
					</Grid>
					<Grid item xs={3} md={3} lg={3}>
						<Typography
							sx={{ fontSize: 15, float: "right", paddingRight: "30px" }}
						>
							{`${convertDateFormat(request.updatedAt)}, ${convertTimeFormat(
								request.updatedAt
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
						<Stack direction="row" spacing={1}>
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
									}}
								/>
							)}
							{request.status === "DECLINED" && (
								<Chip
									label={request.status}
									style={{
										backgroundColor: "#FFBDBD",
										color: "#831E1E",
									}}
								/>
							)}
							{request.status === "ASSIGNED" && (
								<>
									<Chip
										label={request.status}
										style={{
											backgroundColor: "#BDFFC0",
											color: "#1E8371",
										}}
									/>
									<Chip
										label={`Route : ${request.routeName}`}
										style={{
											backgroundColor: "#FFD8B0",
											color: "#824303",
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
				<Typography sx={{ pt: 1, paddingLeft: "12px" }}>
					Cab required Date: {convertDateFormat(request.pickupTime)}
				</Typography>
			</Box>
		</Card>
	);
};
