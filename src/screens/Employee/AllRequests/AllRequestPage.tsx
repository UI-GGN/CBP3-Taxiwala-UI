import React, { ReactElement } from "react";
import {
	Grid,
	Card,
	CardContent,
	Typography,
	Box,
	Container,
} from "@mui/material/";
import "./AllRequestPage.css";
import logo from "../../../assets/image1.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { GetApiEffect } from "../../../Services/ApiService/ApiUtils";
import { CabRequestService } from "../../../Services/CabRequestService";
import ApiStateHandler from "../../../Components/ApiHandler/ApiStateHandler";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ICabRequest } from "../../../Interfaces";

const AllRequestPage: React.FC = (): ReactElement => {
	const params = useParams();
	const [isLoading, isError, data] = GetApiEffect(CabRequestService.get, {
		id: params.id,
	});
	const navigate = useNavigate();

	return (
		<>
			<ApiStateHandler isLoading={isLoading} isError={isError}>
				{data && (
					<Grid container spacing={2}>
						<Grid item xs={12} md={6} lg={6}>
							<Container maxWidth="md">
								<Box className="left_box allrequest_box">
									<div className="allrequests_text">All requests</div>
									<br />
									{data.map((req: ICabRequest, index: number) => (
										<Grid item xs={12} md={9} lg={9} key={index}>
											<Card
												sx={{ boxShadow: 2, mb: 4, cursor: "pointer" }}
												onClick={() =>
													navigate(`/employee/request/${params.id}/${req.id}`)
												}
											>
												<Typography
													variant="caption"
													sx={{
														marginLeft: "10px",
														// fontSize: "10px",
														marginTop: "5px",
													}}
												>
													{`Req Id : ${req.id}`}
												</Typography>

												<Typography
													variant="caption"
													sx={{
														float: "right",
														marginRight: "10px",
														// fontSize: "10px",
														marginTop: "5px",
													}}
												>
													{`${req.createdAt.split("T")[0]}`}
												</Typography>

												<CardContent className="card-content">
													<Typography variant="subtitle2" sx={{ mb: 1 }}>
														<b>
															Ride dates: {`${req.pickupTime.split("T")[0]}`}
														</b>
													</Typography>
													<Grid container className="grid">
														<Grid item xs={6} md={6} lg={6}>
															<Typography variant="subtitle2">
																<b>Pickup point: </b>
																<span className="details">
																	{`${req.pickupLocation}`}
																</span>
															</Typography>
														</Grid>
														<Grid item xs={6} md={6} lg={6}>
															<Typography variant="subtitle2">
																<b>Pickup time: </b>
																<span className="details">
																	{" "}
																	{`${req.pickupTime.split("T")[1]}`}
																</span>
															</Typography>
														</Grid>
														<Grid item xs={6} md={6} lg={6}>
															<Typography variant="subtitle2">
																<b>Drop point: </b>
																<span className="details">
																	{`${req.dropLocation}`}
																</span>
															</Typography>
														</Grid>

														<Grid container className="status-box">
															<Grid item xs={6} md={6} lg={6}>
																{req.deleted ? (
																	<div className={"status declined"}>
																		Request is Declined
																	</div>
																) : (
																	<div
																		className={`status ${
																			req.status == "PENDING" ? "pending" : ""
																		} ${
																			req.status == "DECLINED" ? "declined" : ""
																		} ${
																			req.status == "APPROVED" ? "assigned" : ""
																		}`}
																	>
																		{req.status == "PENDING" &&
																			"Request in pending"}
																		{req.status == "DECLINED" &&
																			"Request in Declined"}
																		{req.status == "APPROVED" &&
																			"Request Approved"}
																	</div>
																)}
															</Grid>
															<Grid className="arrow" item xs={6} md={6} lg={6}>
																<ArrowForwardIcon />
															</Grid>
														</Grid>
													</Grid>
												</CardContent>
											</Card>
										</Grid>
									))}
								</Box>
							</Container>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							lg={6}
							className="login_img_grid"
							sx={{ display: { xs: "none", sm: "block" } }}
						>
							<img src={logo} alt="notes img" className="requests_image" />
						</Grid>
					</Grid>
				)}
			</ApiStateHandler>
		</>
	);
};

export default AllRequestPage;
