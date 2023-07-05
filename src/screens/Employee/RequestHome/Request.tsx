import { ReactElement, React } from "react";
import WindowLayout from "../../../Components/WindowLayout";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import daycab from "../../../assets/parked_cab.jpg";
import nightcab from "../../../assets/night-cab.jpeg";
import { useParams } from 'react-router-dom';


const RightWindow = () => {
  const theme = useTheme();
  return <img src={ theme.palette.mode ==="light"?daycab:nightcab} alt="cab parked" className="login_coverimg" />;
};
  

const LeftWindow = () => {
  const navigate = useNavigate();

  return <>
    <Box style={{ marginTop: '8rem' }} className="left_box">
      <h1 className="request_headline" style={{margin: "0px"}}>Request in Progress</h1>
      <Typography variant="h6" color="typography.primary" style={{margin: "0px"}} >
      Your request has been shared with Gurgaon office Admins. They will get in touch with you soon.
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


const Request: React.FC = (): ReactElement => {
  const params = useParams();
  console.log(params);


  return <>
    <WindowLayout 
      leftWindow={<LeftWindow />}
      rightWindow={<RightWindow />}
    />
  </>;
};

export default Request;