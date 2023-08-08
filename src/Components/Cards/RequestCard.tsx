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
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';


export const RequestCard: FC<IRequestCardProps> = ({
	request,
	index,
	handleModal,
}: IRequestCardProps): JSX.Element => {
	return (
		<Card sx={{ minWidth: 275, boxShadow: 2,  cursor: 'pointer' }} onClick={() => handleModal(index)}>
			<CardContent sx={{ pb: 0, paddingRight: 0 }}>
				<Grid container spacing={1}>
					<Grid item xs={8} md={8} lg={8}>
						<Typography sx={{ fontSize: 16 }} color="text.secondary">
							<b>
								{" "}
								{request.employeeName} ({request.employeeId})
							</b>
						</Typography>
						<Typography sx={{ fontSize: 16, display: 'flex', alignItems: 'center' }} color="text.secondary">
							<PhoneIcon style={{ fontSize: 16, paddingRight: '4px'  }}/> {request.phoneNumber}
						</Typography>
						<Typography
							sx={{ fontSize: 16, display: 'flex', alignItems: 'center' }}
							color="text.secondary"
							marginBottom="10px"
						>
							<WorkIcon style={{ fontSize: 16, paddingRight: '4px'  }}/> Project code: {request.projectCode}
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
										color: "#ffffff",
    									background: "#47A1AD",
										marginBottom: "5px",
									}}
								/>
							)}
							{request.status === "DECLINED" && (
								<Chip
									label={request.status}
									style={{
										color: "#ffffff",
  										background: "#F2617A",
										marginBottom: "5px",
									}}
								/>
							)}
							{request.status === "APPROVED" && (
								<>
									<Chip
										label={request.status}
										style={{
											color: "#ffffff",
											background: "#6B9E78",
											marginBottom: "5px",
										}}
									/>
									<Chip
										variant="outlined"
										color="primary"
										label={`Vendor : ${request.vendorName}`}
										style={{
											// backgroundColor: "#CC850A",
											// color: "#ffffff",
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
						>
							<ArrowForwardIcon sx={{ color: "typography.primary" }} />
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Card>
	);
};
