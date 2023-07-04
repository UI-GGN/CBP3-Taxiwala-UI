import React, { ReactElement } from "react";
import { Box, Grid, Button } from "@mui/material";
import { RouteCard } from "../../../Components/Cards/RoutesCard";

export const AllRoutes: React.FC = (): ReactElement => {
  return <>
    <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <RouteCard />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <RouteCard />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <RouteCard />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <RouteCard />
                        </Grid>
                    </Grid>
                </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
            <Box style={{display: "flex", justifyContent: "flex-end"}}>
                <Button variant="contained"
                disableElevation
                >
                    Create New Route
                </Button>
            </Box>
        </Grid>
    </Grid>
  </>;
};

