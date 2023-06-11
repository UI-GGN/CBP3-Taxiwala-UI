import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function Caption() {
	return (
		<Typography
			variant="caption"
			sx={{ fontSize: "10px", fontWeight: 400, color: "typography.secondary" }}
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
			sx={{
				color: "typography.secondary",
				fontSize: "13px",
				marginTop: { marginTop },
			}}
		>
			{title}
		</Typography>
	);
}

export default function StickyFooter() {
	return (
		<Box
			component="footer"
			sx={{
				py: 2,
				px: 1,
				mt: "auto",
				borderTop: 1,
				color: "linecolor",
				bottom: 0,
				width: "100%",
				// display: { xs: "none", sm: "block"},
				//fontWeight:'700px',
				backgroundColor: "background.header",
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
								color: "typography.secondary",
								justifyContent: "right",
							}}
						>
							TaxiWala
							<Thoughtworks />
						</Typography>

						<Caption />
					</Container>
				</Grid>
				<Grid
					item
					xs={12}
					md={3}
					lg={3}
					sx={{ marginTop: 1, display: { xs: "none", sm: "block" } }}
				>
					<Container
						sx={{ float: "right", color: "typography.secondary", marginTop: 1 }}
					>
						{Links("Know the Team behind TaxiWala", "0px")}
						{Links("Terms of Use", "7px")}
					</Container>
				</Grid>
			</Grid>
		</Box>
	);
}
