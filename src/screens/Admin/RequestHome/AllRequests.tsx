import React, { ReactElement } from "react";
import { Box, Grid } from "@mui/material";
import { RequestCard } from "../../../Components/Cards/RequestCard";

export const AllRequests: React.FC = (): ReactElement => {
  return <>

      <Grid container spacing={2}>
        <Grid item xs={12} md={10} lg={10}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <RequestCard />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <RequestCard />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <RequestCard />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <RequestCard />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <RequestCard />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <RequestCard />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <RequestCard />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <RequestCard />
                        </Grid>
                    </Grid>
                </Box>
        </Grid>
        <Grid item xs={12} md={2} lg={2} sx={{ display: { xs: 'none', sm: 'block' } }}>

        </Grid>
      </Grid>
  </>;
};

