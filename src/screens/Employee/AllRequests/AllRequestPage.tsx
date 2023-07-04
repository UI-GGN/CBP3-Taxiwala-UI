import React, { ReactElement } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Box,
  Container,
} from "@mui/material/";
import "./AllRequestPage.css";
import items from "../../../../.github/workflows/item.json";
import logo from "../../../assets/image1.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const AllRequestPage: React.FC = (): ReactElement => {  

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <Container maxWidth="md">
            <Box className="left_box allrequest_box">
              <div className="allrequests_text">All requests</div>
              <br />
              {items.map((elem) => (
                <Grid
                  item
                  xs={12}
                  md={9}
                  lg={9}
                  key={items.indexOf(elem)}
                >
                  <Card sx={{ boxShadow: 2, mb: 4}}>
                    <Typography
                      variant="caption"
                      sx={{
                        marginLeft: "10px",
                        // fontSize: "10px",
                        marginTop: "5px",
                      }}
                    >
                      {`Req Id : ${elem.id}`}
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
                      {`${elem.createdAt.split("T")[0]}`}
                    </Typography>

                    <CardContent className="card-content">
                      <Typography variant="subtitle2" sx={{mb: 1}}><b>
                        Ride dates:
                        </b>
                      </Typography>
                      <Grid container className="grid">
                        <Grid item xs={6} md={6} lg={6}>
                          <Typography variant="subtitle2">
                            <b>Pickup point:</b>
                            <span className="details">
                              {`${elem.pickupLocation}`}
                            </span>
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                          <Typography variant="subtitle2">
                            <b>Pickup time:</b>
                            <span className="details">
                              {" "}
                              {`${elem.pickupTime.split("T")[1]}`}
                            </span>
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                          <Typography variant="subtitle2">
                            <b>Drop point:</b>
                            <span className="details">
                              {`${elem.dropLocation}`}
                            </span>
                          </Typography>
                        </Grid>

                            <Grid container className="status-box" >
                              <Grid item xs={6} md={6} lg={6}>
                                <div
                                  className={`status ${
                                    elem.status == "PENDING" ? "pending" : ""
                                  } ${elem.status == "DECLINED" ? "declined" : ""} ${
                                    elem.status == "ASSIGNED" ? "assigned" : ""
                                  }`}
                                >
                                  {elem.status == "PENDING" && "Request in pending"}
                                  {elem.status == "DECLINED" && "Request in Declined"}
                                  {elem.status == "ASSIGNED" && "Route assigned"}
                                </div>
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
    </>
  );
};

export default AllRequestPage;
