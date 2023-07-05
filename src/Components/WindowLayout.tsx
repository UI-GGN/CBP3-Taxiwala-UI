import React, { ReactElement } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

interface IWindowLayoutProps {
	leftWindow: React.ReactNode;
	rightWindow: React.ReactNode;
}

const WindowLayout: React.FC<IWindowLayoutProps> = ({
	leftWindow,
	rightWindow,
}: IWindowLayoutProps): ReactElement => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={6} lg={6}>
				<Container maxWidth="md" style={{ marginTop: "4rem" }}>
					{leftWindow}
				</Container>
			</Grid>
			<Grid
				item
				xs={12}
				md={6}
				lg={6}
				className="login_img_grid"
				sx={{ display: { xs: "none", sm: "block" } }}
			>
				{rightWindow}
			</Grid>
		</Grid>
	);
};

export default WindowLayout;
