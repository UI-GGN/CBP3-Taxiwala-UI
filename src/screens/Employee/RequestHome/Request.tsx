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

const RequestStatusText: FC<{ status: string }> = ({ status }): JSX.Element => {
  switch (status) {
  case "PENDING":
    return (
      <>
        <h1 className="request_headline" style={{ margin: "0px" }}>
						Request in Progress
        </h1>
        <Typography
          variant="h6"
          color="typography.primary"
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
        <h1 className="request_headline" style={{ margin: "0px" }}>
						Request Declined
        </h1>
        <Typography
          variant="h6"
          color="typography.primary"
          style={{ margin: "0px" }}
        >
						Your request could not be fulfilled at the moment.
          <br /> Please contact admin staff at <b>Phone number: 987654321</b>
        </Typography>
      </>
    );
  case "APPROVED":
    return (
      <>
        <h1 className="request_headline" style={{ margin: "0px" }}>
						Request Approved
        </h1>
        <Typography
          variant="h6"
          color="typography.primary"
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

  return (
    <>
      <ApiStateHandler isLoading={isLoading} isError={isError}>
        <Box style={{ marginTop: "8rem" }} className="left_box">
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
          {data && (
            <>
              {data
                .filter(
                  (req: ICabRequest) => req.id.toString() == params.routeId
                )
                .map((req: ICabRequest, index: number) => (
                  <>
                    <RequestStatusText key={index} status={req.status} />
                    <br />
                    <Box
                      sx={{
                        width: "60%",
                        height: "fit-content",
                        backgroundColor: "background.secondary",
                        borderRadius: "20px",
                        padding: "15px 20px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "typography.secondary", fontSize: "19px" }}
                      >
												Date: {convertDateFormat(req.expireDate)}
                        <br />
												Checkin Time: {convertTimeFormat(req.pickupTime)}
                      </Typography>
                    </Box>
                    <br />
                    <TimelineComponent
                      pickupTime={req.pickupTime}
                      pickUpLocation={req.pickupLocation}
                      dropLocation={req.dropLocation}
                    />
                    <hr />
                    <br />
                    <Typography
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
                    </Button>
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
