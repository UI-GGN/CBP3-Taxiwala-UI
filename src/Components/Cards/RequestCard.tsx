import { Card, CardContent, Typography, Box, Grid, Stack, Chip } from "@mui/material";
import TimelineComponent from "../Timeline";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const RequestCard = () => {
  return  <Card sx={{ minWidth: 275 }}>
    <CardContent sx={{ pb: 0 }}>
      <Grid container spacing={1}>
        <Grid item xs={10} md={10} lg={10}>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    vansh.kapoor@thoughtworks.com • <b>33070</b>
          </Typography>
        </Grid>
        <Grid item xs={2} md={2} lg={2}>
          <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    12th June, 2023
          </Typography>
        </Grid>
      </Grid>
      <TimelineComponent />
      
    </CardContent>
    <Box sx={{ml: 2, mb: 2}}>
      <Grid container spacing={1}>
        <Grid item xs={11} md={11} lg={11}>
          <Stack direction="row" spacing={1}>
            <Chip color="secondary" label="Ad Hoc Request" variant="outlined"/>
            <Chip label="Pending" />
          </Stack>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
          <ArrowForwardIcon sx={{color: "typography.primary"}} />
        </Grid>
      </Grid>
      <Typography sx={{pt:1}}>Cab required Date: 12th June, 2023 </Typography>
    </Box>
  </Card>;
};