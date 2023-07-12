import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Button, IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorContext } from "../../App";

function Thoughtworks() {
	return (
		<Typography
			variant="overline"
			sx={{
				fontWeight: 400,
				textTransform: "none",
				padding: "5px",
				color: "typography.primary",
			}}
		>
			/thoughtworks
		</Typography>
	);
}

const navItems = [
	{ label: "Profile", route: "/" },
	{ label: "All Requests", route: "/employee/allrequests/12345" },
];

export default function HeaderBar() {
	const theme = useTheme();
	const navigate = useNavigate();
	const color = useContext(ColorContext);

	return (
		<Box
			component="header"
			sx={{
				pt: 2,
				pb: 1,
				px: 0,
				position: "relative",
				width: "100%",
				zIndex: 999,
				display: { xs: "none", sm: "block" },
				top: 0,
				height: "fit-content",
				fontWeight: "700px",
				margin: "0px",
				backgroundColor: "background.header",
			}}
		>
			{/* <Grid container> */}
			<Stack
				flexDirection="row"
				justifyContent="space-around"
				alignItems="center"
			>
				<Container sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
					<Typography
						variant="body1"
						sx={{
							fontSize: "28px",
							fontWeight: 700,
							justifyContent: "right",
							marginTop: "5px",
							marginLeft: "50px",
						}}
					>
						TaxiWala
						<Thoughtworks />
					</Typography>
				</Container>
				<Container
					sx={{
						float: "right",
						marginTop: 1,
						borderRight: 0,
						marginRight: "20px",
					}}
				>
					{navItems.map((item) => (
						<Button
							onClick={() => navigate(item.route)}
							key={item.label}
							sx={{
								color: "typography.primary",
								float: "right",
								padding: "auto",
								marginRight: "10px",
							}}
						>
							{item.label}
						</Button>
					))}

					<IconButton
						sx={{ color: "typography.primary", float: "right" }}
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
			</Stack>
			{/* <Grid item xs={12} md={9} lg={9}>
					<Container sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
						<Typography
							variant="body1"
							sx={{
								fontSize: "28px",
								fontWeight: 700,
								justifyContent: "right",
								marginTop: "5px",
							}}
						>
							TaxiWala
							<Thoughtworks />
						</Typography>
					</Container>
				</Grid> */}
			{/* <Grid
					item
					xs={12}
					md={3}
					lg={3}
					sx={{ marginTop: 0, display: { xs: "none", sm: "block" } }}
				>
					<Container sx={{ float: "right", marginTop: 1, borderRight: 0 }}>
						{navItems.map((item) => (
							<Button
								onClick={() => navigate(item.route)}
								key={item.label}
								sx={{
									color: "typography.primary",
									float: "right",
									paddingRight: "10%",
								}}
							>
								{item.label}
							</Button>
						))}

						<IconButton
							sx={{ color: "typography.primary", float: "right" }}
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
			</Grid> */}
		</Box>
	);
}
