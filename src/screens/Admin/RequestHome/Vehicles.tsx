import { Typography } from "@material-ui/core";
import { Person } from "@mui/icons-material";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import { Box, Card, CardContent, Grid, Stack } from "@mui/material";
import { ReactElement } from "react";
import { IVehicle, IVendor } from "../../../Interfaces";

interface IVehicleProps {
	vehicles: IVehicle[];
	vendors: IVendor[];
}

export const Vehicles: React.FC<IVehicleProps> = ({
	vehicles,
	vendors,
}: IVehicleProps): ReactElement => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={6} lg={6}>
				<Box>
					<Grid container spacing={2}>
						{vehicles.map((vehicle: IVehicle, index: number) => {
							const vendor: IVendor = vendors.filter(
								(v) => v.id === vehicle.vendorId
							)[0];

							return (
								<>
									<Grid item xs={8} md={7} lg={6} key={index}>
										<Card>
											<CardContent sx={{ pb: 0, paddingRight: 0 }}>
												<Typography
													data-testid="vendor_name"
													style={{
														display: "flex",
														alignItems: "center",
														marginBottom: "5px",
													}}
												>
													<LocalTaxiIcon
														sx={{
															mr: 2,
														}}
													/>
													{vehicle.id}
												</Typography>
												<Typography
													data-testid="vendor_id"
													style={{
														display: "flex",
														alignItems: "center",
														marginBottom: "5px",
													}}
												>
													<Person
														sx={{
															mr: 2,
														}}
													/>
													{vehicle.driverName}
												</Typography>
												<Stack flexDirection="row" alignItems="center">
													<Typography
														data-testid="vendor_phoneNumber"
														style={{ marginRight: "2rem" }}
													>
														<b> Vendor Details :</b> {vendor.name},{" "}
														{vendor.phoneNumber}
													</Typography>
												</Stack>
											</CardContent>
										</Card>
										<br />
									</Grid>
								</>
							);
						})}
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
};
