import React, { ReactElement } from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import logo from "../../../assets/parked_cab.jpg";
import "./Login.css";
import TextInput from '../../../Components/TextInput/TextInput';
import { Button } from '@mui/material';
import { useState } from "react";

const LoginScreen: React.FC = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTPFields, setShowOTPFields] = useState(false);

  const sendOTP = () => {
    console.log(email);
    setShowOTPFields(true);
  }

  const submitOTP = () => {
    console.log(email);
    console.log(otp);
  }

  return <>       
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={6}>
        <Container maxWidth="md" >
          <Box className="login_signin_box"  >
            <div className="signin_text">Sign In</div>
            <div className="signin_headline">Start booking cabs now!</div>
            <TextInput
              placeholder='Enter your work Email ID'
              type="email"
              value={email}
              disabled={showOTPFields}
              handleChange={(text: string) => setEmail(text)}
              styles={{
                width: "390px",
                height: "49.4px",
                marginTop: "40px",
                marginBottom: "10px",
                marginRight: "40px"
              }}
            />
            {
              showOTPFields && <><TextInput
              placeholder='Enter OTP sent to your Email ID'
              type="number"
              value={otp}
              handleChange={(text: string) => setOtp(text)}
              styles={{
                width: "390px",
                height: "49.4px",
                marginTop: "10px",
                marginRight: "40px"
              }}
            />
            <p className="login_sendOTP_text">Didn't receive OTP? <span 
            onClick={() => window.location.reload()} style={{color: 'steelblue', cursor: "pointer"}}>Try again.</span></p>
            </>
            }
            <br />
            {showOTPFields? <Button variant="contained" style={{
                  marginTop: '20px'
                }}
                onClick={() => submitOTP()}
                >Submit OTP</Button>
              :
              <Button variant="contained" style={{
                marginTop: '20px'
              }}
              onClick={() => sendOTP()}
              >Send OTP</Button>
            }
          </Box>
        </Container>
      </Grid>
      <Grid item xs={12} md={6} lg={6} className="login_img_grid" sx={{ display: { xs: 'none', sm: 'block' } }}>
        <img src={logo} alt="cab parked" className="login_coverimg" />
      </Grid>
    </Grid>
  </>;
};

export default LoginScreen;