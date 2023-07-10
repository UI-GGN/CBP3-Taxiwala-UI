import React, { ReactElement } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import daycab from "../../../assets/parked_cab.jpg";
import nightcab from "../../../assets/night-cab.jpeg";
import "./Login.css";
import TextInput from "../../../Components/TextInput/TextInput";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const LoginScreen: React.FC = (): ReactElement => {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [showOTPFields, setShowOTPFields] = useState(false);
	const navigate = useNavigate();
	const theme = useTheme();

	const sendOTP = () => {
		setShowOTPFields(true);
	};

	const submitOTP = () => {
		navigate("/employee/home");
	};

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6} lg={6}>
					<Container maxWidth="md">
						<Box className="left_box login_signin_box">
							<h1 className="request_headline" style={{ margin: "0px" }}>
								Sign in!
							</h1>
							<Typography
								color="typography.primary"
								variant="h6"
								style={{ margin: "0px", marginTop: "-10px" }}
							>
								Start booking office cabs now!
							</Typography>
							<TextInput
								placeholder="Enter your work Email ID"
								type="email"
								value={email}
								disabled={showOTPFields}
								handleChange={(text: string) => setEmail(text)}
								styles={{
									width: "390px",
									height: "49.4px",
									marginTop: "40px",
									marginBottom: "10px",
									marginRight: "40px",
								}}
							/>
							{showOTPFields && (
								<>
									<TextInput
										placeholder="Enter OTP sent to your Email ID"
										type="number"
										value={otp}
										handleChange={(text: string) => setOtp(text)}
										styles={{
											width: "390px",
											height: "49.4px",
											marginTop: "10px",
											marginRight: "40px",
										}}
									/>
									<p className="login_sendOTP_text">
										Didn't receive OTP?{" "}
										<span
											onClick={() => window.location.reload()}
											style={{ color: "steelblue", cursor: "pointer" }}
										>
											Try again.
										</span>
									</p>
								</>
							)}
							<br />
							{showOTPFields ? (
								<Button
									data-testid="submitOTP_button"
									variant="contained"
									disableElevation
									style={{
										marginTop: "20px",
									}}
									onClick={() => submitOTP()}
								>
									Submit OTP
								</Button>
							) : (
								<Button
									data-testid="sendOTP_button"
									variant="contained"
									disableElevation
									style={{
										marginTop: "20px",
									}}
									onClick={() => sendOTP()}
								>
									Send OTP
								</Button>
							)}
						</Box>
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
					<img
						src={theme.palette.mode === "light" ? daycab : nightcab}
						alt="cab parked"
						className="login_coverimg"
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default LoginScreen;
