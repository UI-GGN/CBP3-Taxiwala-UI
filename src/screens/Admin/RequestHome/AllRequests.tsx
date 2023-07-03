import React, { ReactElement } from "react";
import { Box, Grid } from "@mui/material";
import { RequestCard } from "../../../Components/Cards/RequestCard";
import { ICabRequest } from "../../../Interfaces";
import RequestData from "./../../../utils/RequestData.json";

export const AllRequests: React.FC = (): ReactElement => {
	const data: ICabRequest[] = RequestData;

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12} md={10} lg={10}>
					<Box>
						<Grid container spacing={6}>
							{data.map((request, index) => {
								return (
									<Grid item xs={12} md={6} lg={6}>
										<RequestCard key={index} request={request} />
									</Grid>
								);
							})}
						</Grid>
					</Box>
				</Grid>
				<Grid
					item
					xs={12}
					md={2}
					lg={2}
					sx={{ display: { xs: "none", sm: "block" } }}
				></Grid>
			</Grid>
		</>
	);
};
