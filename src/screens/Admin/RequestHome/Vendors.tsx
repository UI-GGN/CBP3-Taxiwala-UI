import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Stack,
} from "@mui/material";
import React, { ReactElement, useState } from "react";
import { IVendor, UseStateType } from "../../../Interfaces";
import TextInput from "../../../Components/TextInput/TextInput";
import { AdminService } from "../../../Services/AdminService";

interface IVendorProps {
	vendors: IVendor[];
}

const Vendor = ({ id, name, phoneNumber }: IVendor): ReactElement => {
	return (
		<Card>
			<CardContent sx={{ pb: 0, paddingRight: 0 }}>
				<Stack
					flexDirection="row"
					justifyContent="space-between"
					flexWrap="wrap"
				>
					<Typography data-testid="vendor_name">{name}</Typography>
					<Typography data-testid="vendor_id" style={{ marginRight: "2rem" }}>
						<b> Id: </b> {id}
					</Typography>
				</Stack>
				<Stack flexDirection="row" alignItems="center">
					<LocalPhoneIcon
						data-testid="phoneIcon"
						sx={{ color: "green", fontSize: 20, mr: 1.5 }}
					/>
					<Typography
						data-testid="vendor_phoneNumber"
						style={{ marginRight: "2rem" }}
					>
						{phoneNumber}
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};

export const Vendors: React.FC<IVendorProps> = ({
	vendors,
}: IVendorProps): ReactElement => {
	const [name, setName]: UseStateType<string> = useState("");
	const [phoneNo, setPhoneNo]: UseStateType<string> = useState("");

	console.log("name" + name);

	return (
		<Grid container spacing={4}>
			<Grid item xs={12} md={8} lg={8}>
				<Box>
					<Grid container spacing={2}>
						{vendors.map((vendor: IVendor, index: number) => {
							return (
								<>
									<Grid item xs={8} md={6} lg={4}>
										<Vendor
											key={index}
											id={vendor.id}
											name={vendor.name}
											phoneNumber={vendor.phoneNumber}
											deleted={vendor.deleted}
										/>
										<br />
									</Grid>
								</>
							);
						})}
					</Grid>
				</Box>
			</Grid>
			<Grid item xs={12} md={4} lg={4}>
				<Grid
					container
					sx={
						{
							// display: { xs: "none", sm: "block" },
						}
					}
				>
					<Grid item xs={8} md={10} lg={8}>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography variant="h6"> Create New Vendor </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextInput
									placeholder="Vendor name"
									type="text"
									styles={{
										width: "90%",
										height: "49.4px",
										marginRight: "40px",
									}}
									value={name}
									handleChange={(text: string) => {
										console.log(text);
										setName(text);
									}}
								/>
								<TextInput
									placeholder="Phone number"
									type="number"
									styles={{
										width: "90%",
										height: "49.4px",
										marginTop: "30px",
										marginRight: "40px",
										marginBottom: "30px",
									}}
									handleChange={(text: string) => {
										setPhoneNo(text);
									}}
									value={phoneNo}
								/>
								<Button
									variant="contained"
									disabled={name === "" || phoneNo === ""}
									data-testid="create_button"
									onClick={async () => {
										await AdminService.createVendor({
											name: name,
											phoneNumber: phoneNo,
										});
									}}
								>
									Create 
								</Button>
							</AccordionDetails>
						</Accordion>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
