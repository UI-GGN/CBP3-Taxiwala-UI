import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { ReactElement, useEffect, useState } from "react";
import adminSat from "../../../assets/admin-satellite.jpg";
import { AllRequests } from "./AllRequests";
import { AllRoutes } from "./AllRoutes";
import "./admin.css";
import { Vendors } from "./Vendors";
import { AdminService } from "../../../Services/AdminService";
import { GetApiEffect } from "../../../Services/ApiService/ApiUtils";
import ApiStateHandler from "../../../Components/ApiHandler/ApiStateHandler";
import { IVendor, UseStateType } from "../../../Interfaces";

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

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		console.log(event);
		setValue(newValue);
	};

	const [vendors, setVendors]: UseStateType<IVendor[]> = useState(
		[] as IVendor[]
	);

	const [isLoading, isError, data] = GetApiEffect(AdminService.getAllVendors);

	useEffect(() => {
		setVendors(data);
	}, [data]);

	return (
		<>
			<Box style={{ position: "relative" }}>
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
						<Tab label="VENDORS" {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<AllRequests />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<AllRoutes />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<ApiStateHandler isLoading={isLoading} isError={isError}>
						{vendors && <Vendors vendors={vendors} />}
					</ApiStateHandler>
				</TabPanel>
			</Box>
		</>
	);
};
