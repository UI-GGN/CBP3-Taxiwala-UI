import React, { ReactElement } from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import logo from "../../../assets/parked_cab.jpg";
import "./Login.css";
import TextInput from '../../../Components/TextInput/TextInput';

const LoginScreen: React.FC = (): ReactElement => {
  return <>       
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={6}>
        <Container maxWidth="md" >
          <Box className="login_signin_box"  >
            <div className="signin_text">Sign In</div>
            <div className="signin_headline">Start booking cabs now!</div>
            <TextInput
              placeholder='Enter your work email id'
              type="email"
              styles={{
                width: "476px",
                height: "49.4px",
                top: "80px"
              }}
            />
            <br />
            {/* <Button variant="contained">Send OTP</Button> */}
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