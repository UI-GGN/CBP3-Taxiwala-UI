import { Typography } from "@material-ui/core";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Card, CardContent, Grid, Stack } from "@mui/material";
import { ReactElement } from "react";
import { IVendor } from "../../../Interfaces";

interface IVendorProps {
	vendors: IVendor[];
}

const Vendor = ({ id, name, phoneNumber }: IVendor): ReactElement => {
	return (
		<Card>
			<CardContent sx={{ pb: 0, paddingRight: 0 }}>
				<Grid container spacing={1}>
					<Grid item xs={12} md={12} lg={12}>
						<Stack
							flexDirection="row"
							justifyContent="space-between"
							flexWrap="wrap"
						>
							<Typography data-testid="vendor_name">{name}</Typography>
							<Typography
								data-testid="vendor_id"
								style={{ marginRight: "2rem" }}
							>
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
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export const Vendors: React.FC<IVendorProps> = ({
	vendors,
}: IVendorProps): ReactElement => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={8} md={5} lg={3}>
				{vendors.map((vendor: IVendor, index: number) => {
					return (
						<>
							<Vendor
								key={index}
								id={vendor.id}
								name={vendor.name}
								phoneNumber={vendor.phoneNumber}
								deleted={vendor.deleted}
							/>
							<br />
						</>
					);
				})}
			</Grid>
		</Grid>
	);
};
