import React, { ReactElement } from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import logo from "../../../assets/parked_cab.jpg";
import "./Login.css";

const LoginScreen: React.FC = (): ReactElement => {
  return <>       
    <Grid container spacing={2}>
      <Grid xs={12} md={6} lg={6}>
        <Container maxWidth="md" >
          <Box className="login_signin_box"  >
            <h1>Sign In</h1>
            <p>Start booking cabs now!</p>
            <TextField id="filled-basic" label="Enter your Email id" variant="filled" />
            <br />
            <Button variant="contained">Send OTP</Button>
          </Box>
        </Container>
      </Grid>
      <Grid xs={12} md={6} lg={6} className="login_img_grid" sx={{ display: { xs: 'none', sm: 'block' } }}>
        <img src={logo} alt="cab parked" className="login_coverimg" />
      </Grid>
    </Grid>
  </>;
};

export default LoginScreen;