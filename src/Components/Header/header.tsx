import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import AccountMenu from "./ProfileIcon";
import { Button, IconButton } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorContext } from "../../App";
import { useContext } from "react";


function Thoughtworks() {
  return (
    <Typography
      variant="overline"
      sx={{
        fontWeight: 400,
        textTransform: "none",
        padding: "5px",
        color: "#838383"
        color: "typography.primary"        
      }}
    >
      /thoughtworks
    </Typography>
  );
}

const navItems = [
  // eslint-disable-next-line react/jsx-key
  <AccountMenu/>,
  "Profile",
  "All Requests"
];

export default function HeaderBar() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        component="header"
        sx={{
          pt: 3,
          pb: 1,
          px: 0,
          color: "#ADADAD",
          position: "fixed",
          width: "100%",
          display: { xs: "none", sm: "block"},
          fontWeight: "700px",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[800]
        }}
      >
        <Grid container>
          <Grid item xs={12} md={9} lg={9}>
            <Container>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#595959",
                  justifyContent: "right",
                }}
              >
                TaxiWala
                <Thoughtworks />
              </Typography>
            </Container>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            lg={3}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Container
              sx={{
                float: "right",
                color: "#838383",
                pt:0.5,
                mr:5
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: "#000000", float: "right", paddingRight: "7%"}}
                >
                  {item}
                </Button>
              ))}
            </Container>
          </Grid>
  const theme = useTheme();
  const color = useContext(ColorContext);

  return (
    <Box 
      component="header"
      sx={{
        pt: 3,
        pb: 1,
        px: 0,           
        
        position: "fixed",
        width: "100%",
        zIndex: 999,
        // display: { xs: "none", sm: "block"},
        fontWeight:"700px",
        margin:"0px",
        backgroundColor: "background.header",
      }}
    >
      <Grid container >
        <Grid item xs={12} md={9} lg={9}>
          <Container>
            <Typography
              variant="body1"
              sx={{
                fontSize: "28px",
                fontWeight: 700,                
                justifyContent: "right",
                marginTop:"5px",
              }}
            >
                TaxiWala
              <Thoughtworks />
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={12} md={3} lg={3} 
          sx={{marginTop:0, display: { xs: "none", sm: "block" } }}>
          <Container sx={{ float: "right", color: "#838383", marginTop: 1,borderRight:0 }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "typography.primary" , float:"right", mr:2, ml: 2 }}>
                {item}
              </Button>
            ))}
            <IconButton sx={{ color: "typography.primary" , float:"right"}} onClick={color.toggleColor} 
              color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>            
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}