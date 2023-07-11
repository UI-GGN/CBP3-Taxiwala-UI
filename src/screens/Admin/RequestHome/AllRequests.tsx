import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import ApiStateHandler from "../../../Components/ApiHandler/ApiStateHandler";
import { RequestCard } from "../../../Components/Cards/RequestCard";
import Dropdown from "../../../Components/TextInput/Dropdown";
import { ICabRequest, IRoute, UseStateType } from "../../../Interfaces";
import { AdminService } from "../../../Services/AdminService";
import { GetApiEffect } from "../../../Services/ApiService/ApiUtils";
import RouteData from "./../../../utils/RouteData.json";
import { getLocalTheme } from "./../../../utils/theme";
import "./admin.css";

const routeData: IRoute[] = RouteData;
const dropdownvalues: { value: string; label: string }[] = routeData.map(
	(route) => {
		return {
			value: route.name,
			label: route.name,
		};
	}
);

export const AllRequests: React.FC = (): ReactElement => {
	const theme = getLocalTheme();
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		border: theme === "light" ? "2px solid #242424" : "2px solid white",
		backgroundColor: theme === "light" ? "white" : "#242424",
		color: theme === "light" ? "black" : "white",
		p: 4,
	};

	const [isLoading, isError, data] = GetApiEffect(AdminService.getAllRequests);

	const [cabRequestData, setCabRequestData]: UseStateType<ICabRequest[]> =
		useState([] as ICabRequest[]);

	const [showModal, setShowModal]: UseStateType<boolean> = useState(false);
	const [selectedCabRequestIndex, setSelectedCabRequestIndex] = useState(null);
	const [selectedRoute, setSelectedRoute]: UseStateType<string> = useState("");

	const handleModal: (index: any) => void = (index: any) => {
		setSelectedCabRequestIndex(index);
		setShowModal(true);
	};

	const handleDeclineRequest: () => void = () => {
		setShowModal(false);
		setSelectedRoute("");
		setCabRequestData((cabRequests: ICabRequest[]) =>
			cabRequests.map((x: ICabRequest, index: number) => {
				return index === selectedCabRequestIndex
					? {
							...x,
							status: "DECLINED",
					  }
					: x;
			})
		);
	};

	const handleAssignRoute: () => void = () => {
		setShowModal(false);
		setCabRequestData((cabRequests: ICabRequest[]) =>
			cabRequests.map((x: ICabRequest, index: number) => {
				return index === selectedCabRequestIndex
					? {
							...x,
							status: "ASSIGNED",
							routeName: selectedRoute,
					  }
					: x;
			})
		);
	};

	useEffect(() => {
		setCabRequestData(data);
	}, [data]);

	return (
		<>
			<Modal
				open={showModal}
				sx={{
					width: "50%",
					margin: "auto",
					height: "1000px",
					padding: "0",
					border: "0",
				}}
			>
				<Box sx={style} className="modal_box">
					<Typography
						sx={{
							fontSize: 16,
							position: "absolute",
							top: "40px",
						}}
					>
						<b>For</b>
						&nbsp;
						{selectedCabRequestIndex != null &&
							cabRequestData[selectedCabRequestIndex].employeeName}
						,{" "}
						{selectedCabRequestIndex != null &&
							cabRequestData[selectedCabRequestIndex].employeeId}
					</Typography>
					<br />
					<br />
					<Typography
						sx={{
							fontSize: 16,
						}}
						gutterBottom
					>
						Assign route
					</Typography>
					<Dropdown
						label=""
						handleChange={(value: string) => setSelectedRoute(value)}
						value={selectedRoute}
						dropdownvalues={dropdownvalues}
					/>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<div className="modal_buttons">
						<Button
							variant="contained"
							sx={{
								backgroundColor: "red",
								color: "white",
								marginRight: "5px",
							}}
							onClick={() => handleDeclineRequest()}
						>
							Decline
						</Button>
						<Button
							variant="contained"
							sx={{ backgroundColor: "green", color: "white" }}
							disabled={selectedRoute === ""}
							onClick={() => handleAssignRoute()}
						>
							Assign
						</Button>
					</div>
					<Button
						sx={{
							color: "black",
							position: "absolute",
							top: "10px",
							right: "0px",
						}}
						onClick={() => setShowModal(false)}
					>
						<CloseIcon />
					</Button>
				</Box>
			</Modal>
			<ApiStateHandler isLoading={isLoading} isError={isError}>
				{cabRequestData && (
					<Grid container spacing={2}>
						<Grid item xs={12} md={10} lg={10}>
							<Box>
								<Grid container spacing={6}>
									{cabRequestData.map((request: ICabRequest, index: number) => {
										return (
											<Grid item xs={12} md={6} lg={6}>
												<RequestCard
													key={index}
													request={request}
													index={index}
													handleModal={handleModal}
												/>
											</Grid>
										);
									})}
								</Grid>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							md={2}
							lg={2}
							sx={{ display: { xs: "none", sm: "block" } }}
						></Grid>
					</Grid>
				)}
			</ApiStateHandler>
		</>
	);
};
