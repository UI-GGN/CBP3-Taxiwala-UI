import { Button, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../../Components/Header/header";
import TextInput from "../../../Components/TextInput/TextInput";
import { PostService } from "../../../Services/ApiService/ApiUtils";
import { LoginService } from "../../../Services/LoginService";
import hdbanner from "../../../assets/banner2.jpeg";
import { userType } from "../../../constants";
import {
	getUserDetailsFromToken,
	isLoggedinUser,
} from "../../../utils/userValidation";
import "./Login.css";

const LoginScreen: React.FC = (): ReactElement => {
	const navigate = useNavigate();
	const theme = useTheme();
	const [showEmployeeid, setShowEmployeeid] = useState(false);
	const [userDetails, setUserDetails] = useState({
		name: "",
		email: "",
		employeeId: "",
	});
	const [authloading, setAuthloading] = useState(false);
	const [authError, setAuthError] = useState(false);
	const [loginEnabled, setLoginEnabled] = useState(false);
	const { postApi, isError } = PostService(LoginService.login);

	const isLoginDisabled = () => {
		if (!showEmployeeid) {
			return !loginEnabled;
		} else {
			return !(userDetails.employeeId && userDetails.employeeId.length >= 5);
		}
	};

	useEffect(() => {
		if (isLoggedinUser()) {
			const userTokenDecoded = getUserDetailsFromToken();
			if (userTokenDecoded.usertype === userType.Admin) {
				navigate("/admin/home");
			}
			if (userTokenDecoded.usertype === userType.Employee)
				navigate("/employee/home");
		}
	}, []);

	const login = () => {
		console.log(userDetails);
		postApi(userDetails, undefined, (data) => {
			localStorage.setItem("usertoken", data.token);
			const usertoken = jwt_decode(data.token);
			if (usertoken.usertype === userType.Admin) {
				navigate("/admin/home");
				window.location.reload();
			}
			if (usertoken.usertype === userType.Employee) {
				navigate("/employee/home");
				window.location.reload();
			}
		});
	};

	// const googleAuthResponse = (response) => {
	// 	const userObject = jwt_decode(response.credential);
	// 	const { name, email } = userObject;
	// 	console.log(userObject);
	// 	setUserDetails({ name, email });
	// 	setShowEmployeeid(true);
	// };

	const googleAuthResponse = (response) => {
		setAuthloading(true);
		const userObject = jwt_decode(response.credential);
		const { name, email } = userObject;
		console.log(userObject);
		setUserDetails({ name, email });
		LoginService.getUser(email)
			.then((data) => {
				console.log(data);
				if (data.data.employeeId) {
					setShowEmployeeid(false);
					setLoginEnabled(true);
				} else {
					setShowEmployeeid(true);
					setLoginEnabled(false);
				}
				setAuthloading(false);
			})
			.catch(() => {
				setLoginEnabled(false);
				setAuthError(true);
				setAuthloading(false);
			});
	};

	return (
		<>
			<HeaderBar />
			<Grid container spacing={2}>
				<Grid item xs={12} md={4} lg={4}>
					<Container maxWidth="md">
						<Box className="left_box login_signin_box">
							<br />
							<h1 className="request_headline" style={{ margin: "0px" }}>
								Sign in
							</h1>
							<Typography
								color="typography.primary"
								variant="h7"
								style={{ margin: "0px", marginTop: "-10px" }}
							>
								Start booking office cabs now!
							</Typography>
							<br />
							<br />
							{isError && (
								<Alert severity="error">
									<AlertTitle>Error</AlertTitle>
									Something went wrong. Try again!
								</Alert>
							)}

							<GoogleOAuthProvider clientId="993661792510-ijjr431srdei4root779d4qrc3srar9n.apps.googleusercontent.com">
								<GoogleLogin
									render={(renderProps) => (
										<button
											type="button"
											className=""
											onClick={renderProps.onClick}
											disabled={renderProps.disabled}
										>
											<FcGoogle className="" /> Sign in with google
										</button>
									)}
									onSuccess={googleAuthResponse}
									onFailure={googleAuthResponse}
									cookiePolicy="single_host_origin"
								/>
							</GoogleOAuthProvider>

							{showEmployeeid && (
								<>
									<TextInput
										placeholder="Enter Employee Id"
										type="string"
										value={userDetails.employeeId || ""}
										handleChange={(text: string) => {
											setUserDetails((userdetail) => {
												return {
													...userdetail,
													employeeId: text,
												};
											});
										}}
										styles={{
											width: "390px",
											height: "49.4px",
											marginTop: "10px",
											marginRight: "40px",
										}}
									/>
								</>
							)}

							<Button
								data-testid="login_button"
								variant="contained"
								size="large"
								disabled={isLoginDisabled()}
								style={{
									width: "221px",
									marginTop: "20px",
								}}
								onClick={() => login()}
							>
								LOGIN
							</Button>
						</Box>
					</Container>
				</Grid>
				<Grid
					item
					xs={12}
					md={8}
					lg={8}
					className="login_img_grid"
					sx={{ display: { xs: "none", sm: "block" } }}
				>
					<img
						src={theme.palette.mode === "light" ? hdbanner : hdbanner}
						alt="cab parked"
						className="login_coverimg"
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default LoginScreen;
