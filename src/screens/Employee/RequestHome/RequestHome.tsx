import React, { ReactElement } from "react";
import WindowLayout from "../../../Components/WindowLayout";
import logo from "../../../assets/parked_cab.jpg";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Button, Accordion, AccordionSummary, AccordionDetails, Typography, Grid,
  ToggleButtonGroup, ToggleButton
 } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextInput from "../../../Components/TextInput/TextInput";
import "./RequestHome.css";

const RightWindow = () => {
  return <img src={logo} alt="cab parked" className="login_coverimg" />;
};

const LeftWindow = () => {
  const TotalSteps = 2;
  const [currentstep, setCurrentstep] = useState(0);
  const [alignment, setAlignment] = React.useState('Ad-Hoc');  


  const Step1 = () => {
    return <>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Enter your Pickup location</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
        <Typography>
        Pickup point is where you will be coming from towards office!
        </Typography>
          <TextInput
            placeholder='Enter your pickup location'
            type="text"
            value={""}
            handleChange={(text: string) => console.log(text)}
            styles={{
              width: "100%",
              height: "49.4px",
              marginTop: "10px",
              marginRight: "40px"
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
                <TextInput
                placeholder='PIN Code'
                type="text"
                value={""}
                handleChange={(text: string) => console.log(text)}
                styles={{
                  width: "100%",
                  height: "49.4px",
                  marginTop: "10px",
                  marginRight: "40px"
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            <TextInput
                placeholder='Nearest Landmark'
                type="text"
                value={""}
                handleChange={(text: string) => console.log(text)}
                styles={{
                  width: "100%",
                  height: "49.4px",
                  marginTop: "10px",
                  marginRight: "40px"
                }}
              />
            </Grid>
          </Grid>
        </div>

      </AccordionDetails>
    </Accordion>
    <br />
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Enter your Drop location</Typography>
      </AccordionSummary>
      <AccordionDetails>
      <div>
      <Typography>
        Drop point is where you will be going to after the office!
        </Typography>
          <TextInput
            placeholder='Enter your pickup location'
            type="text"
            value={""}
            handleChange={(text: string) => console.log(text)}
            styles={{
              width: "100%",
              height: "49.4px",
              marginTop: "10px",
              marginRight: "40px"
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
                <TextInput
                placeholder='PIN Code'
                type="text"
                value={""}
                handleChange={(text: string) => console.log(text)}
                styles={{
                  width: "100%",
                  height: "49.4px",
                  marginTop: "10px",
                  marginRight: "40px"
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            <TextInput
                placeholder='Nearest Landmark'
                type="text"
                value={""}
                handleChange={(text: string) => console.log(text)}
                styles={{
                  width: "100%",
                  height: "49.4px",
                  marginTop: "10px",
                  marginRight: "40px"
                }}
              />
            </Grid>
          </Grid>
        </div>
      </AccordionDetails>
    </Accordion>
    <br />
  </>
  };

  const Step2 = () => {
    
    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      setAlignment(newAlignment);
    };


    return <>
      <Typography>
        On what regularity are you planning to book cab?
      </Typography>
      
      <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="Ad-Hoc">Ad-Hoc</ToggleButton>
      <ToggleButton value="Regular">Regular</ToggleButton>
    </ToggleButtonGroup>
    <br />
    <br />
    {alignment=="Ad-Hoc"&&<div>
      <Typography>
      Ad-Hoc requests are request on demand basis. These are to be made 1 hour before atleast.
      </Typography>
      </div>
    }
    {alignment=="Regular"&&<div>
      <Typography>
      Regular requests are qhen you plan to come for many days to office. These are to be made 1 day before by 10pm.
      </Typography>
      </div>
    }
    </>;
  };


  return <>
    <Box style={{ marginTop: '8rem' }} className="left_box">
      <p className="request_subtext" style={{margin: "0px"}}>Looking for office cab?</p>
      <h1 className="request_headline" style={{margin: "0px"}}>Request one now</h1>
      <div>
        <p className="stepsBox">Step {currentstep+1}/{TotalSteps}</p>
      </div>

      {currentstep==0&&<Step1 />}
      {currentstep==1&&<Step2 />}

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