import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { IRouteCardProps } from "../../Interfaces";
import { convertDateFormat } from "../../utils/CabRequestHelper";
import TimelineComponent from "../Timeline";

export const RouteCard: FC<IRouteCardProps> = ({
	route,
}: IRouteCardProps): JSX.Element => {
	// const [shownames, setShowNames] = useState(false);

	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent sx={{ pb: 0 }}>
				<Grid container spacing={1} marginBottom={2}>
					<Grid item xs={9} md={9} lg={9}>
						<Typography sx={{ fontSize: 16 }} color="text.secondary">
							<b>
								{route.name}, {route.id}
							</b>
						</Typography>
						<Typography
							sx={{ fontSize: 16, display: "flex", alignItems: "center" }}
							color="text.secondary"
							gutterBottom
						>
							{convertDateFormat(route.startDate)}
							&nbsp;
							<ArrowForwardIcon sx={{ fontSize: 16 }} />
							&nbsp;
							{convertDateFormat(route.expireDate)}
						</Typography>
					</Grid>
					<Grid item xs={3} md={3} lg={3}>
						<Typography sx={{ fontSize: 12 }} color="text.secondary">
							<Chip
								color="secondary"
								label="Ad Hoc Request"
								variant="outlined"
							/>
						</Typography>
					</Grid>
				</Grid>
				<Box
					sx={{
						marginBottom: "-15px",
					}}
				>
					<TimelineComponent
						pickupTime={route.pickupTime}
						pickUpLocation={route.startLocation}
						dropLocation={route.endLocation}
					/>
				</Box>
				<Box>
					<Chip
						label={`Driver name: ${route.vehicle.driverName}`}
						style={{
							backgroundColor: "#BDDFFF",
							color: "#1E3583",
							marginBottom: "5px",
							marginRight: "10px",
						}}
					/>
					<Chip
						label={`Vehicle : ${route.vehicleId}`}
						style={{
							backgroundColor: "#BDFFC0",
							color: "#1E8371",
							marginBottom: "5px",
						}}
					/>
					<br />
					<Chip
						label={`Vendor name: ${route.vehicle.vendor.name}`}
						style={{
							backgroundColor: "#FFD8B0",
							color: "#824303",
						}}
					/>
					<br />
				</Box>
			</CardContent>
			{/* <Box sx={{ ml: 2, mb: 2 }}>
				<Grid container spacing={1}>
					<Grid item xs={11} md={11} lg={11}>
						<Button
							variant="text"
							onClick={() => setShowNames((prev) => !prev)}
							sx={{
								fontSize: "16px",
								textTransform: "none",
								cursor: "pointer",
								color: "typography.primary",
							}}
						>
							3 people assigned <ArrowDropDownIcon />
						</Button>
						{shownames && (
							<Typography
								sx={{ fontSize: "14px" }}
								color="text.secondary"
								gutterBottom
							>
								Vansh, Ansh, Nsh
							</Typography>
						)}
					</Grid>
					<Grid item xs={1} md={1} lg={1}>
						<ArrowForwardIcon sx={{ color: "typography.primary" }} />
					</Grid>
				</Grid>
			</Box> */}
		</Card>
	);
};
