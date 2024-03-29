/* eslint-disable no-mixed-spaces-and-tabs */
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Button, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { headerType } from "../../constants";
import { logout } from "../../utils/userValidation";

function Thoughtworks() {
  return (
    <Typography
      variant="overline"
      sx={{
        fontWeight: 400,
        textTransform: "none",
        padding: "5px",
        color: "typography.secondaryred",
      }}
    >
			/
      <Typography
        variant="overline"
        sx={{
          fontWeight: 400,
          textTransform: "none !important",
          color: "typography.secondaryblue",
        }}
      >thoughtworks</Typography>
    </Typography>
  );
}

const navItems = [
  // { label: "Profile", route: "/employee/profile" },
  { label: "All Requests", route: "/employee/allrequests/" },
];

export default function HeaderBar(props: any) {
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
        fontWeight: "700px",
        margin: "0px",
        backgroundColor: "background.header",
      }}
    >
      <Grid container>
        <Grid item xs={12} md={8} lg={8}>
          <Container
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (props.headerType === headerType.Employee) {
                navigate("/employee/home");
              }
              if (props.headerType === headerType.Admin) {
                navigate("/admin/home");
              }
            }}
          >
            <Typography
              variant="body1"
              color="typography.primaryblue"
              sx={{
                fontSize: "28px !important",
                fontWeight: "700 !important",
                justifyContent: "right",
                marginTop: "5px !important",
                paddingLeft: "30px",
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
          md={4}
          lg={4}
          sx={{ marginTop: 0, display: { xs: "none", sm: "block" } }}
        >
          <Container sx={{ float: "right", marginTop: 1, borderRight: 0 }}>
            {(props.headerType === headerType.Employee ||
							props.headerType === headerType.Admin) && (
              <Button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                key={"logout"}
                sx={{
                  color: "typography.primary",
                  float: "right",
                  marginRight: "10px",
                }}
              >
								LogOut
              </Button>
            )}

            {props.headerType === headerType.Employee &&
							navItems.map((item) => (
							  <Button
							    onClick={() => navigate(item.route)}
							    key={item.label}
							    sx={{
							      color: "typography.primary",
							      float: "right",
							      marginRight: "10px",
							    }}
							  >
							    {item.label}
							  </Button>
							))}

            <IconButton
              sx={{
                color: "typography.primary",
                float: "right",
                marginRight: "5px",
              }}
              onClick={color.toggleColor}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
