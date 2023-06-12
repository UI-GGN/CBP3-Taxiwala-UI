import React, { ReactElement } from "react";
import WindowLayout from "../../../Components/WindowLayout";
import logo from "../../../assets/parked_cab.jpg";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./RequestHome.css";

const RightWindow = () => {
  return <img src={logo} alt="cab parked" className="login_coverimg" />;
};

const LeftWindow = () => {
  const TotalSteps = 2;
  const [currentstep, setCurrentstep] = useState(0);


  return <>
    <Box style={{ marginTop: '8rem' }} className="left_box">
      <p className="request_subtext" style={{margin: "0px"}}>Looking for office cab?</p>
      <h1 className="request_headline" style={{margin: "0px"}}>Request one now</h1>
      <div>
        <p className="stepsBox">Step {currentstep+1}/{TotalSteps}</p>
      </div>


      <div style={{display: 'flex'}}>
        {
          currentstep>0&&<Button variant="outlined" sx={{
            mr: 1
          }}
          onClick={() => {
            currentstep>0&&setCurrentstep(prevStep => prevStep-1);
          }}
          >
            <ArrowBackIcon />
          </Button>
        }        
        <Button variant="contained"
          disableElevation
          onClick={() => {
            currentstep<TotalSteps-1&&setCurrentstep(prevStep => prevStep+1);
          }}
        >
          {currentstep==TotalSteps-1?"Submit":"Next"}
        </Button>
      </div>

    </Box>
  </>
}




const RequestHome: React.FC = (): ReactElement => {
  return <>
    <WindowLayout 
      leftWindow={<LeftWindow />}
      rightWindow={<RightWindow />}
    />
  </>;
};

export default RequestHome;