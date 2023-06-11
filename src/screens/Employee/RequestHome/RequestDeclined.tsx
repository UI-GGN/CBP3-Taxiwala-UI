import { ReactElement, React } from "react";
import WindowLayout from "../../../Components/WindowLayout";
import { RightWindow } from "./RequestHome";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const LeftWindow = () => {
  const navigate = useNavigate();

  return <>
    <Box style={{ marginTop: '8rem' }} className="left_box">
      <h1 className="request_headline" style={{margin: "0px"}}>Request Declined</h1>
      <Typography variant="h6" color="typography.primary" style={{margin: "0px"}} >
      Your request could not be fulfilled at the moment.<br/> Please contact admin staff at <b>Phone number: 987654321</b>
      </Typography>
      <br />
      <Button variant="outlined"
        onClick={() => {
          navigate("/employee/home");
        }}
      >
        <ArrowBackIcon /> Back to Home
      </Button>
    </Box>
  </>;
};


const RequestDeclined: React.FC = (): ReactElement => {
  return <>
    <WindowLayout 
      leftWindow={<LeftWindow />}
      rightWindow={<RightWindow />}
    />
  </>;
};

export default RequestDeclined;