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
import { ICabRequest } from "../../../Interfaces";
import { convertTimeFormat } from "../../../utils/CabRequestHelper";
import { useParams } from "react-router-dom";
import HeaderBar from "../../../Components/Header/header";
import { headerType } from "../../../constants";

const AllRequestPage: React.FC = (): ReactElement => {
  const params = useParams();
  const [isLoading, isError, data] = GetApiEffect(CabRequestService.get);
  const navigate = useNavigate();

  return (
    <>
      <HeaderBar headerType={headerType.Employee} />
    	<ApiStateHandler isLoading={isLoading} isError={isError}>
        	{data && <Grid container spacing={2}>
          	<Grid item xs={12} md={8} lg={8}>
            <Container >
              <Box className="left_box allrequest_box">
                <div className="allrequests_text">All requests</div>
                <br />
                <Grid container spacing={1}>
                  {data.map((req: ICabRequest, index) => (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={6}
                      key={index}
                    >
                      <Card sx={{ boxShadow: 2, mb: 2, cursor: "pointer"}} 
                        onClick={() => navigate(`/employee/request/${req.id}`)}
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
																		{`${convertTimeFormat(req.pickupTime)}`}
																		{/* {`${req.pickupTime.split("T")[1]}`} */}
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
																				req.status == "DECLINED"
																					? "declined"
																					: ""
																			} ${
																				req.status == "APPROVED"
																					? "assigned"
																					: ""
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
																<Grid
																	className="arrow"
																	item
																	xs={6}
																	md={6}
																	lg={6}
																>
																	<ArrowForwardIcon />
																</Grid>
															</Grid>
														</Grid>
													</CardContent>
												</Card>
											</Grid>
										))}
									</Grid>
								</Box>
							</Container>
						</Grid>
						<Grid
							item
							xs={12}
							md={4}
							lg={4}
							className="login_img_grid"
							sx={{ display: { xs: "none", sm: "block" } }}
						>
							<img src={logo} alt="notes img" className="requests_image" />
						</Grid>
					</Grid>
				}
		</ApiStateHandler>
		</>
	);
};

export default AllRequestPage;
