import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import AccountMenu from "./ProfileIcon";

function Thoughtworks() {
  return (
    <Typography
      variant="overline"
      sx={{
        fontWeight: 400,
        textTransform: "none",
        padding: "5px",
        color: "#838383"
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

const defaultTheme = createTheme();

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
        </Grid>
      </Box>
    </ThemeProvider>
  );
}