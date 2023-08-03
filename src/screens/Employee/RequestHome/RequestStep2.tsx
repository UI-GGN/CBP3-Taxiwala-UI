import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography, Grid } from "@mui/material";
import { FC } from "react";
import { IEmmployeeDetails, IRequestStep2Props } from "../../../Interfaces";
import "./RequestHome.css";
import LocationAccordian from "../../../Components/Accordians/LocationAccordian";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TextInput from "../../../Components/TextInput/TextInput";
import { shouldSubmitButtonDisabled } from "../../../utils/CabRequestValidation";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const RequestStep2: FC<IRequestStep2Props> = ({
  location,
  setLocation,
  currentstep,
  setCurrentstep,
  cabType,
  employeeDetails,
  setEmployeeDetails,
  submitFn,
  isLoading,
  isError
}: IRequestStep2Props): JSX.Element => {
  return (
    <>
      {cabType === "pick" ? (
        <LocationAccordian
          location={location}
          setLocation={setLocation}
          cabType={cabType.charAt(0).toUpperCase() + cabType.slice(1) + "up"}
        />
      ) : (
        <LocationAccordian
          location={location}
          setLocation={setLocation}
          cabType={cabType.charAt(0).toUpperCase() + cabType.slice(1)}
        />
      )}
      <br />
      <Typography variant="h6">
        {cabType === "pick" ? "Drop location" : "Pickup location"}
      </Typography>
      <Typography
        variant="body2"
        marginTop={"5px"}
        style={{ display: "flex", alignItems: "center" }}
      >
        <LocationOnOutlinedIcon style={{ color: "pink", paddingLeft: "0" }} />
				International Tech Park, Sector 59, Gurugram, Haryana, 122102,
      </Typography>
      <br />
      <Typography variant="h6" margin={"5px 0"}>
				Code
      </Typography>
      <div className="">
	  	<Grid container spacing={2}>
          {/* <Grid item xs={12} md={4} lg={4}>
            <TextInput
              placeholder="Employee ID"
              type="text"
              styles={{
                marginBottom: "10px",
              }}
              handleChange={(text: string) => {
                setEmployeeDetails((x: IEmmployeeDetails) => {
                  return {
                    ...x,
                    id: text,
                  };
                });
              }}
              value={employeeDetails.id}
            />
          </Grid> */}
          <Grid item xs={12} md={4} lg={4}>
            <TextInput
              placeholder="Phone Number"
              type="text"
              styles={{
                marginBottom: "10px",
              }}
              handleChange={(text: string) => {
                setEmployeeDetails((x: IEmmployeeDetails) => {
                  return {
                    ...x,
                    phoneNumber: text,
                  };
                });
              }}
              value={employeeDetails.phoneNumber}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextInput
              placeholder="Project Code"
              type="text"
              styles={{
              }}
              handleChange={(text: string) => {
                setEmployeeDetails((x: IEmmployeeDetails) => {
                  return {
                    ...x,
                    projectCode: text,
                  };
                });
              }}
              value={employeeDetails.projectCode}
            />
          </Grid>
        </Grid>
      </div>
      <br />
      <br />
      {
        isError&&<Alert severity="error">
          <AlertTitle>Error</AlertTitle>
			Something went wrong. Try again!
        </Alert>
      }
      <div style={{ display: "flex" }}>
        <Button
          data-testid="back_button"
          variant="outlined"
          sx={{
            mr: 1,
          }}
          onClick={() => {
            currentstep > 0 && setCurrentstep((prevStep) => prevStep - 1);
          }}
        >
          <ArrowBackIcon />
        </Button>
        {
          isLoading?
            <CircularProgress />
            :
            <Button
              data-testid="submit_button"
              variant="contained"
              sx={{ width: "200px" }}
              disabled={shouldSubmitButtonDisabled(location, employeeDetails)}
              onClick={() => submitFn()}
            >
					Submit
            </Button>
        }		
				
      </div>
	  <br />
		<br />
    </>
  );
};

export default RequestStep2;
