import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Button, IconButton } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Thoughtworks() {
  return (
    <Typography
      variant="overline"
      sx={{
        fontWeight: 400,
        textTransform: "none",
        padding: "5px",
        color: "typography.primary"        
      }}
    >
      /thoughtworks
    </Typography>
  );
}

const navItems = [
  { label: "Profile", route: "/" },
  { label: "All Requests", route: "/employee/allrequests" },
];


export default function HeaderBar() {
  const theme = useTheme();
  const navigate = useNavigate();
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
          <Container sx={{ float: "right", marginTop: 1,borderRight:0 }}>            

            {navItems.map((item) => (
              <Button
                onClick={()=>navigate(item.route)}
                key={item.label}
                sx={{ color: "typography.primary", float: "right", paddingRight: "10%" }}
              >
                {item.label}
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
