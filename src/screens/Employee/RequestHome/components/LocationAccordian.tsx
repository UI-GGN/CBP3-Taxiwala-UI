import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	Typography,
} from "@mui/material";
import { FC } from "react";
import TextInput from "../../../../Components/TextInput/TextInput";
import { ILocation, ILocationAccordianProps } from "../../../../Interfaces";
import "./../RequestHome.css";

const TotalSteps = 2;

const LocationAccordian: FC<ILocationAccordianProps> = ({
	location,
	setLocation,
	cabType,
}: ILocationAccordianProps): JSX.Element => {
	return (
		<Accordion defaultExpanded>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography variant="h6">{`Enter your ${cabType} location`}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<div>
					<Typography>
						{`${cabType} point is where you will be coming from towards office!`}
					</Typography>
					<TextInput
						placeholder="Address"
						type="text"
						value={location.address}
						handleChange={(text: string) => {
							setLocation((prevLocation: ILocation) => {
								return {
									...prevLocation,
									address: text,
								};
							});
						}}
						styles={{
							width: "100%",
							height: "49.4px",
							marginTop: "10px",
							marginRight: "40px",
						}}
						id={0}
					/>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6} lg={6}>
							<TextInput
								placeholder="PIN Code"
								type="text"
								value={location.pincode}
								handleChange={(text: string) => {
									setLocation((prevLocation: ILocation) => {
										return {
											...prevLocation,
											pincode: text,
										};
									});
								}}
								styles={{
									width: "100%",
									height: "49.4px",
									marginTop: "10px",
									marginRight: "40px",
								}}
								id={1}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={6}>
							<TextInput
								placeholder="Nearest Landmark"
								type="text"
								value={location.landmark}
								handleChange={(text: string) => {
									setLocation((prevLocation: ILocation) => {
										return {
											...prevLocation,
											landmark: text,
										};
									});
								}}
								styles={{
									width: "100%",
									height: "49.4px",
									marginTop: "10px",
									marginRight: "40px",
								}}
								id={2}
							/>
						</Grid>
					</Grid>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};

export default LocationAccordian;
