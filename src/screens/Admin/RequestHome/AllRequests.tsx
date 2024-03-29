import CloseIcon from "@mui/icons-material/Close";
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	CircularProgress,
	Grid,
	Modal,
	Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { ReactElement, useEffect, useState } from "react";
import ApiStateHandler from "../../../Components/ApiHandler/ApiStateHandler";
import { RequestCard } from "../../../Components/Cards/RequestCard";
import Dropdown from "../../../Components/TextInput/Dropdown";
import TextInput from "../../../Components/TextInput/TextInput";
import { ICabRequest, IVendor, UseStateType } from "../../../Interfaces";
import { AdminService } from "../../../Services/AdminService";
import {
	GetApiEffect,
	PostService,
} from "../../../Services/ApiService/ApiUtils";
import { requestStatusType } from "../../../constants";
import { getLocalTheme } from "./../../../utils/theme";
import "./admin.css";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { notifyVendor } from "../../../Services/SnsClient";

interface IVendorDropdown {
	value: number;
	label: string;
}

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

	const [isVendorDataLoading, isVendorDataError, vendorData]: [
		boolean,
		boolean,
		IVendor[]
	] = GetApiEffect(AdminService.getAllVendors);
	const [isRequestDataLoading, isRequestDataError, requestData]: [
		boolean,
		boolean,
		any
	] = GetApiEffect(AdminService.getAllRequests);
	const { postApi, data, isLoading, isError } = PostService(
		AdminService.updateRequestStatus
	);

	const [cabRequestData, setCabRequestData]: UseStateType<ICabRequest[]> =
		useState([] as ICabRequest[]);
	const [vendors, setVendors]: UseStateType<IVendorDropdown[]> = useState(
		[] as IVendorDropdown[]
	);
	const [showModal, setShowModal]: UseStateType<boolean> = useState(false);
	const [selectedCabRequestIndex, setSelectedCabRequestIndex] = useState(null);
	const [selectedVendor, setSelectedVendor]: UseStateType<string> =
		useState("");
	const [sortBy, setSortBy] = useState("createdAt");
	const [filterBy, setFilterBy] = useState({
		status: requestStatusType.ALL,
		emp: "",
	});
	const [action, setAction]: UseStateType<string> = useState("");

	const handleModal: (index: any) => void = (index: any) => {
		setSelectedCabRequestIndex(index);
		setShowModal(true);
	};

	const handleDeclineRequest: () => void = () => {
		if (selectedCabRequestIndex !== null) {
			postApi(
				{
					status: "DECLINED",
				},
				{
					id: cabRequestData[selectedCabRequestIndex].id,
				},
				() => {
					setShowModal(false);
					setSelectedVendor("");
					setAction("");
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
				}
			);
		}
	};

	if (vendorData !== null) {
		console.log(selectedVendor);
		console.log(
			vendorData.filter((v: any) => {
				v.id.toString() === selectedVendor;
			})[0]
		);
	}

	console.log(data);

	const handleAssignVendor: () => void = () => {
		if (selectedCabRequestIndex !== null) {
			postApi(
				{
					status: "APPROVED",
					vendorId: selectedVendor,
				},
				{
					id: cabRequestData[selectedCabRequestIndex].id,
				},
				() => {
					setShowModal(false);
					setAction("");
					notifyVendor(
						vendorData.filter((v) => {
							return v.id.toString() == selectedVendor;
						})[0].phoneNumber,
						cabRequestData[selectedCabRequestIndex]
					);
					setCabRequestData((cabRequests: ICabRequest[]) =>
						cabRequests.map((x: ICabRequest, index: number) => {
							return index === selectedCabRequestIndex
								? {
										...x,
										status: "APPROVED",
										vendorId: parseInt(selectedVendor),
										vendorName: vendors.filter((v) => {
											console.log(v.value.toString());
											console.log(selectedVendor);

											return v.value.toString() == selectedVendor;
										})[0].label,
								  }
								: x;
						})
					);
					setSelectedCabRequestIndex(null);
				}
			);
		}
	};

	useEffect(() => {
		if (vendorData !== null) {
			setVendors(() =>
				vendorData.map((vendor: any) => {
					return {
						value: vendor.id,
						label: vendor.name,
					};
				})
			);
		}
	}, [vendorData]);

	useEffect(() => {
		if (vendorData != null && requestData !== null) {
			setCabRequestData(() => {
				return requestData.map((r: ICabRequest) => {
					return {
						...r,
						vendorName:
							r.vendorId &&
							vendorData.filter((v: IVendor) => {
								return v.id === r.vendorId;
							})[0].name,
					};
				});
			});
		}
	}, [requestData, vendorData]);

	console.log(vendorData);

	const applySortAndFilter = () => {
		console.log(sortBy);
		console.log(filterBy);
		console.log(requestData);
		const filteredData = requestData.filter((req: any) => {
			return (
				(filterBy.status === requestStatusType.ALL
					? req
					: req.status === filterBy.status) &&
				(req.employeeName.toLowerCase().includes(filterBy.emp.trim().toLowerCase()) ||
					req.phoneNumber.toLowerCase().includes(filterBy.emp.trim().toLowerCase()) ||
					req.employeeId.toLowerCase().includes(filterBy.emp.trim().toLowerCase()))
			);
		});
		const sortedData = [...filteredData].sort((a, b) => {
			if (a[sortBy] < b[sortBy]) {
				return -1;
			}
			if (a[sortBy] > b[sortBy]) {
				return 1;
			}
			return 0;
		});

		setCabRequestData(() => {
			return sortedData.map((r) => {
				return {
					...r,
					vendorName:
						r.vendorId &&
						vendorData.filter((v: IVendor) => {
							return v.id === r.vendorId;
						})[0].name,
				};
			});
		});
	};

	const exportCsv = (data: ICabRequest[]) => {
		const filteredData = data.map((exportdata) => {
			const { updatedAt, expireDate, deleted, ...remainingData } = exportdata;
			return remainingData;
		});
		const csv = Papa.unparse(filteredData, {
			header: true,
		});
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
		const date = new Date();
		const month = date.getMonth() + 1;
		saveAs(
			blob,
			"CabRequest-" +
				date.getDate() +
				"-" +
				month +
				"-" +
				date.getFullYear() +
				".csv"
		);
	};

	return (
		<>
			<ApiStateHandler
				isLoading={isRequestDataLoading}
				isError={isRequestDataError}
			>
				<>
					<ApiStateHandler
						isLoading={isVendorDataLoading}
						isError={isVendorDataError}
					>
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
									Assign vendor
								</Typography>
								<Dropdown
									label=""
									handleChange={(value: string) => setSelectedVendor(value)}
									value={selectedVendor}
									dropdownvalues={vendors}
								/>
								<br />
								<br />
								{isError && (
									<>
										<Alert severity="error">
											<AlertTitle>Error</AlertTitle>
											Something went wrong. Try again!
										</Alert>
										<br />
									</>
								)}
								<br />
								<div className="modal_buttons">
									{isLoading && action === "decline" ? (
										<CircularProgress />
									) : (
										<Button
											variant="contained"
											sx={{
												backgroundColor: "red",
												color: "white",
												marginRight: "5px",
											}}
											onClick={() => {
												setAction("decline");
												handleDeclineRequest();
											}}
										>
											Decline
										</Button>
									)}
									{isLoading && action === "assign" ? (
										<CircularProgress />
									) : (
										<Button
											variant="contained"
											sx={{ backgroundColor: "green", color: "white" }}
											disabled={selectedVendor === ""}
											onClick={() => {
												setAction("assign");
												handleAssignVendor();
											}}
										>
											Assign
										</Button>
									)}
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
					</ApiStateHandler>
					{cabRequestData && (
						<Grid container spacing={3}>
							<Grid item xs={12} md={9} lg={9}>
								<Box>
									<Typography variant="h6">
										{cabRequestData.length} Results
									</Typography>
									<br />
									<Grid container spacing={3}>
										{cabRequestData.map(
											(request: ICabRequest, index: number) => {
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
											}
										)}
									</Grid>
								</Box>
							</Grid>
							<Grid
								item
								xs={12}
								md={3}
								lg={3}
								sx={{ display: { xs: "none", sm: "block" } }}
							>
								<Button
									sx={{ mt: 2 }}
									data-testid="export_button"
									variant="contained"
									color="success"
									onClick={() => exportCsv(cabRequestData)}
								>
									Export to Excel
								</Button>
								<br />
								<br />
								<Typography variant="h6" gutterBottom>
									Sort By
								</Typography>
								<FormControl>
									<FormLabel id="demo-radio-buttons-group-label">
										Time
									</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-buttons-group-label"
										defaultValue="createdAt"
										onChange={(e) => setSortBy(e.target.value)}
										name="radio-buttons-group"
									>
										<FormControlLabel
											value="createdAt"
											control={<Radio />}
											label="Created At"
										/>
										<FormControlLabel
											value="pickupTime"
											control={<Radio />}
											label="Pickup Time"
										/>
									</RadioGroup>
								</FormControl>
								<br />
								<br />
								<Typography variant="h6" gutterBottom>
									Filter By
								</Typography>
								<Dropdown
									label="Select Status"
									handleChange={(value: string) => {
										setFilterBy({
											...filterBy,
											status: value,
										});
									}}
									value={filterBy.status}
									dropdownvalues={[
										{
											value: requestStatusType.DECLINED,
											label: "Declined requests",
										},
										{
											value: requestStatusType.PENDING,
											label: "Pending requests",
										},
										{
											value: requestStatusType.APPROVED,
											label: "Approved requests",
										},
										{ value: requestStatusType.ALL, label: "All Requests" },
									]}
								/>
								<TextInput
									placeholder="Employee Id / Employee Name / Employee Ph."
									type="text"
									value={filterBy.emp}
									handleChange={(text: string) => {
										setFilterBy({
											...filterBy,
											emp: text,
										});
									}}
									styles={{
										width: "100%",
									}}
									id={0}
								/>
								<Button
									sx={{ mt: 2 }}
									data-testid="submit_button"
									variant="contained"
									onClick={() => applySortAndFilter()}
								>
									APPLY
								</Button>
							</Grid>
						</Grid>
					)}
				</>
			</ApiStateHandler>
		</>
	);
};
