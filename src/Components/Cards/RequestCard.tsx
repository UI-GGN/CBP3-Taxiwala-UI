import {
	Card,
	CardContent,
	Typography,
	Box,
	Grid,
	Stack,
	Chip,
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
					<Grid item xs={11} md={11} lg={11}>
						<Stack direction="row" spacing={1}>
							<Chip
								color="secondary"
								label="Ad Hoc Request"
								variant="outlined"
							/>
							<Chip label={request.status} />
						</Stack>
					</Grid>
					<Grid item xs={1} md={1} lg={1}>
						<ArrowForwardIcon sx={{ color: "typography.primary" }} />
					</Grid>
				</Grid>
				<Typography sx={{ pt: 1, paddingLeft: "12px" }}>
					Cab required Date: {convertDateFormat(request.pickupTime)}
				</Typography>
			</Box>
		</Card>
	);
};
