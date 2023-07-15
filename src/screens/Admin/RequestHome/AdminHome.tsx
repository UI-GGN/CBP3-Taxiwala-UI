import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { ReactElement } from "react";
import adminSat from "../../../assets/admin-satellite.jpg";
import { AllRequests } from "./AllRequests";
import { AllRoutes } from "./AllRoutes";
import "./admin.css";
import HeaderBar from "../../../Components/Header/header";
import { headerType } from "../../../constants";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export const AdminHome: React.FC = (): ReactElement => {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);
	// const [vendors, setVendors]: UseStateType<IVendor[]> = useState(
	// 	[] as IVendor[]
	// );
	// const [vehicles, setVehicles]: UseStateType<IVehicle[]> = useState(
	// 	[] as IVehicle[]
	// );

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		console.log(event);
		setValue(newValue);
	};
	// const [vendorDataLoading, vendorDataError, vendorData] = GetApiEffect(
	// 	AdminService.getAllVendors
	// );
	// const [vehicleDataLoading, vehicleDataError, vehicleData] = GetApiEffect(
	// 	AdminService.getAllVehicles
	// );

	// useEffect(() => {
	// 	setVendors(vendorData);
	// }, [vendorData]);

	// useEffect(() => {
	// 	setVehicles(vehicleData);
	// }, [vehicleData]);

	return (
		<>
			<HeaderBar headerType={headerType.Admin}/>
			<br />
			<Box style={{ marginTop: "3rem", position: "relative" }}>
				<img
					src={theme.palette.mode === "light" ? adminSat : adminSat}
					alt="cab parked"
					className="admin_coverimg"
				/>
				<Typography
					variant="h4"
					style={{
						position: "absolute",
						top: "7rem",
						left: "30px",
						color: "white",
					}}
				>
					<b>Admin Access</b>
				</Typography>
			</Box>
			<Box sx={{ width: "100%" }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						<Tab label="ALL REQUESTS" {...a11yProps(0)} />
						<Tab label="ALL ROUTES" {...a11yProps(1)} />
						{/* <Tab label="VENDORS" {...a11yProps(2)} />
						<Tab label="VEHICLES" {...a11yProps(3)} /> */}
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<AllRequests />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<AllRoutes />
				</TabPanel>
				{/* <TabPanel value={value} index={2}>
					<ApiStateHandler
						isLoading={vendorDataLoading}
						isError={vendorDataError}
					>
						{vendors && <Vendors vendors={vendors} />}
					</ApiStateHandler>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<ApiStateHandler
						isLoading={vehicleDataLoading}
						isError={vehicleDataError}
					>
						{vehicles && vendors && (
							<Vehicles vehicles={vehicles} vendors={vendors} />
						)}
					</ApiStateHandler>
				</TabPanel> */}
			</Box>
		</>
	);
};
