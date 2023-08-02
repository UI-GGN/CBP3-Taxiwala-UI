import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC, ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiStateHandler from "../../../Components/ApiHandler/ApiStateHandler";
import TimelineComponent from "../../../Components/Timeline";
import WindowLayout from "../../../Components/WindowLayout";
import { GetApiEffect } from "../../../Services/ApiService/ApiUtils";
import { CabRequestService } from "../../../Services/CabRequestService";
import nightcab from "../../../assets/night-cab.jpeg";
import daycab from "../../../assets/parked_cab.jpg";
import { ICabRequest } from "../../../Interfaces";
import {
  convertDateFormat,
  convertTimeFormat,
} from "../../../utils/CabRequestHelper";
import HeaderBar from "../../../Components/Header/header";
import { headerType } from "../../../constants";
import DangerousIcon from '@mui/icons-material/Dangerous';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RequestStatusText: FC<{ status: string }> = ({ status }): JSX.Element => {
  switch (status) {
  case "PENDING":
    return (
      <>
        <h1 className="request_headline" style={{ margin: "0px", color: "#47A1AD" }}>
          <PendingIcon /> Request in Progress
        </h1>
        <Typography
          sx={{ fontSize: "17px" }}
          color="typography.secondary"
          style={{ margin: "0px" }}
        >
						Your request has been shared with Gurgaon office Admins. They will
						get in touch with you soon.
        </Typography>
      </>
    );
  case "DECLINED":
    return (
      <>
        <h1 className="request_headline" style={{ margin: "0px", color: "#F2617A" }}>
          <DangerousIcon /> Request Declined
        </h1>
        <Typography
          sx={{ fontSize: "17px" }}
          color="typography.secondary"
          style={{ margin: "0px" }}
        >
						Your request could not be fulfilled at the moment.
          <br /> Please contact admin staff at 987654321
        </Typography>
      </>
    );
  case "APPROVED":
    return (
      <>
        <h1 className="request_headline" style={{ margin: "0px", color: "#6B9E78" }}>
          <CheckCircleIcon />Request Approved
        </h1>
        <Typography
          sx={{ fontSize: "17px" }}
          color="typography.secondary"
          style={{ margin: "0px" }}
        >
						Thank you from booking via portal. Please share your feedback!
        </Typography>
      </>
    );
  default:
    return <></>;
  }
};

const RightWindow = () => {
  const theme = useTheme();
  return (
    <img
      src={theme.palette.mode === "light" ? daycab : nightcab}
      alt="cab parked"
      className="login_coverimg"
    />
  );
};

const LeftWindow = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, isError, data] = GetApiEffect(CabRequestService.get);
  const [isVendorLoading, isVendorError, vendordata] = GetApiEffect(CabRequestService.getVendors);

  return (
    <>
      <ApiStateHandler isLoading={isLoading||isVendorLoading} isError={isError||isVendorError}>
        {console.log(vendordata)}
        <Box style={{ marginTop: "6rem" }} className="left_box">
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/employee/allrequests/");
            }}
          >
            <ArrowBackIcon sx={{ marginRight: "10px" }} /> Back to
											Requests
          </Button>
          <br />
          <br />
          <br />
          <br />
          {data && (
            <>
              {data
                .filter(
                  (req: ICabRequest) => req.id.toString() == params.routeId
                )
                .map((req: ICabRequest, index: number) => (
                  <>
                    <Typography sx={{ color: "typography.secondary" }}>
                      Raised at : {convertDateFormat(req.createdAt)}
                    </Typography>
                    <RequestStatusText key={index} status={req.status} />
                    <br />
                    
                    <Box
                      sx={{
                        width: "60%",
                        height: "fit-content",
                        backgroundColor: "background.secondary",
                        borderRadius: "20px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "19px" }}
                      >
											<b>Pickup Time : </b> {convertTimeFormat(req.pickupTime)}, {convertDateFormat(req.pickupTime)}
                      </Typography>

                      {
                        req.vendorId && vendordata && (
                          <>
                            {
                              vendordata
                                .filter((vehicleobj) => vehicleobj.id === req.vendorId)
                                .map((assignedVehicle) => (
                                  <>
                                    <Typography variant="body2"
                                      sx={{ fontSize: "19px" }}>
                                      <b>Driver Assigned : </b> {assignedVehicle.name} (Ph no. {assignedVehicle.phoneNumber})
                                    </Typography>

                                  </>
                                ))
                            }
                          </>
                        )
                      }
                    </Box>
                    <br />
                    <TimelineComponent
                      pickupTime={req.pickupTime}
                      pickUpLocation={req.pickupLocation}
                      dropLocation={req.dropLocation}
                    />
                    {/* <hr /> */}
                    <br />
               
                    {/* <Typography
                      variant="body2"
                      sx={{ color: "typography.secondary", fontSize: "19px" }}
                    >
											Change of Plans?
                    </Typography>
                    <Button
                      style={{
                        backgroundColor: "#FEC1C1",
                        padding: "10px",
                        margin: "10px 0px",
                        fontSize: "15px",
                        color: "red",
                      }}
                      variant="outlined"
                    >
											Delete your request
                    </Button> */}
                    <br />										
                  </>
                ))}
            </>
          )}
        </Box>
      </ApiStateHandler>
    </>
  );
};

const Request: React.FC = (): ReactElement => {
  return <>
    <HeaderBar headerType={headerType.Employee}/>
    <WindowLayout 
      leftWindow={<LeftWindow />}
      rightWindow={<RightWindow />}
    />
  </>;
};

export default Request;
