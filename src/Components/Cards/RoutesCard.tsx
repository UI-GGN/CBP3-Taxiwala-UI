import {
	Card,
	CardContent,
	Typography,
	Box,
	Grid,
	Button,
	Chip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const RouteCard = () => {
	const [shownames, setShowNames] = useState(false);

	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent sx={{ pb: 0 }}>
				<Grid container spacing={1}>
					<Grid item xs={9} md={9} lg={9}>
						<Typography variant="h6" color="text.secondary" gutterBottom>
							Route 1
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
			</CardContent>
			<Box sx={{ ml: 2, mb: 2 }}>
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
			</Box>
		</Card>
	);
};
