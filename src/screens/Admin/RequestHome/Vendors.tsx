import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Alert,
	AlertTitle,
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Grid,
	Stack,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import ApiStateHandler from "../../../Components/ApiHandler/ApiStateHandler";
import { IVendor, UseStateType } from "../../../Interfaces";
import { AdminService } from "../../../Services/AdminService";
import {
	GetApiEffect,
	PostService,
} from "../../../Services/ApiService/ApiUtils";
import "./admin.css";
import TextInput from "../../../Components/TextInput/TextInput";

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

export const Vendors: React.FC = (): ReactElement => {
	const [isVendorDataLoading, isVendorDataError, vendorData]: [
		boolean,
		boolean,
		IVendor[]
	] = GetApiEffect(AdminService.getAllVendors);
	const { postApi, data, isLoading, isError } = PostService(
		AdminService.createVendor
	);

	const [vendors, setVendors]: UseStateType<IVendor[]> = useState(
		[] as IVendor[]
	);
	const [name, setName]: UseStateType<string> = useState("");
	const [phoneNumber, setPhoneNumber]: UseStateType<string> = useState("");

	useEffect(() => {
		setVendors(vendorData);
	}, [vendorData]);

	const createNewVendor: () => void = () => {
		postApi(
			{
				name: name,
				phoneNumber: phoneNumber,
			},
			null,
			(response: any) => {
				console.log(data);
				setVendors((prevVendors: IVendor[]) => [response.data, ...prevVendors]);
				setName("");
				setPhoneNumber("");
			}
		);
	};

	return (
		<ApiStateHandler
			isLoading={isVendorDataLoading}
			isError={isVendorDataError}
		>
			{vendors && (
				<Grid container spacing={2}>
					<Grid item xs={10} sm={12} md={8} lg={8}>
						<Box>
							<Grid container spacing={2}>
								{vendors.map((vendor: IVendor, index: number) => {
									return (
										<>
											<Grid item xs={12} sm={6} md={6} lg={4}>
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
					<Grid item xs={10} sm={8} md={4} lg={3}>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography variant="h6"> Create New Vendor </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextInput
									placeholder="Vendor name"
									type="text"
									value={name}
									handleChange={(text: string) => setName(text)}
									styles={{
										width: "90%",
										height: "49.4px",
										marginRight: "40px",
									}}
								/>
								<TextInput
									placeholder="Phone number"
									type="number"
									value={phoneNumber}
									handleChange={(text: string) => setPhoneNumber(text)}
									styles={{
										width: "90%",
										height: "49.4px",
										marginTop: "30px",
										marginRight: "40px",
									}}
								/>
								<br />
								<br />
								{isError && (
									<Alert severity="error">
										<AlertTitle>Error</AlertTitle>
										Something went wrong. Try again!
									</Alert>
								)}
								{isLoading ? (
									<CircularProgress />
								) : (
									<Button
										variant="contained"
										disabled={name === "" || phoneNumber === ""}
										data-testid="create_button"
										onClick={() => createNewVendor()}
									>
										Create
									</Button>
								)}
							</AccordionDetails>
						</Accordion>
					</Grid>
				</Grid>
			)}
		</ApiStateHandler>
	);
};
