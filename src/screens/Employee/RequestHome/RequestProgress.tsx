import { ReactElement, React } from "react";
import WindowLayout from "../../../Components/WindowLayout";
import { RightWindow } from "./RequestHome";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import '../../../index.css';

const LeftWindow = () => {
  const navigate = useNavigate();

  return <>
    <Box style={{ marginTop: '8rem' }} className="left_box">
      <h1 className="request_headline" style={{margin: "0px"}}>Request in Progress</h1>
      <Typography variant="h6" color="typography.primary" style={{margin: "0px"}} >
      Your request has been shared with Gurgaon office Admins. They will get in touch with you soon.
      </Typography>
      <br />
      <Button variant="outlined" className="actions"
        onClick={() => {
          navigate("/employee/allrequests");
        }}
      >
        <ArrowBackIcon /> Back to Requests
      </Button>
      {/* <Typography variant="h3">Request one now</Typography> */}
    </Box>
  </>;
};


const RequestProgress: React.FC = (): ReactElement => {
  return <>
    <WindowLayout 
      leftWindow={<LeftWindow />}
      rightWindow={<RightWindow />}
    />
  </>;
};

export default RequestProgress;