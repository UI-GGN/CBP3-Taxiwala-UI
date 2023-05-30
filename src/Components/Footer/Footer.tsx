import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function Caption() {
  return (
    <Typography
      variant="caption"
      sx={{ fontSize: "10px", fontWeight: 400, color: "#838383" }}
    >
      Made with brain by Gurgaon office
    </Typography>
  );
}
function Thoughtworks() {
  return (
    <Typography
      variant="overline"
      sx={{
        fontWeight: 400,
        textTransform: "none",
        padding: "5px",
        color: "#838383",
      }}
    >
      /thoughtworks
    </Typography>
  );
}

function Links(title: string, marginTop: string) {
  return (
    <Typography
      variant="body2"
      sx={{ color: "#838383", fontSize: "13px", marginTop: {marginTop} }}
    >
      {title}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box 
        component="footer"
        sx={{
          py: 2,
          px: 1,
          mt: "auto",
          borderTop: 1,
          color: "#ADADAD",          
          bottom: 0,
          width: "100%",
          display: { xs: "none", sm: "block"},
          //fontWeight:'700px',
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[800],
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
                  color: "#595959",
                  justifyContent: "right",
                }}
              >
                TaxiWala
                <Thoughtworks />
              </Typography>

              <Caption />
            </Container>
          </Grid>
          <Grid item xs={12} md={3} lg={3} sx={{marginTop:1}}>
            <Container sx={{ float: "right", color: "#838383", marginTop: 1 }}>
              { Links("Know the Team behind TaxiWala", "0px")}
              { Links("Terms of Use", "7px")}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
