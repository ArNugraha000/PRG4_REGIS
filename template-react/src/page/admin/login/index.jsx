import React, { useRef, useState } from "react";
import {
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	Grid,
	Link,
} from "@mui/material";
import { number, object, string } from "yup";
import {
	validateAllInputs,
	validateInput,
} from "../../../component/form/ValidateForm";
import { fetchData } from "../../../api/ApiServices";
import Loading from "../../../component/Loading";
import Cookies from "js-cookie";
import { encryptId } from "../../../utils/encryptor";
import Logo from "../../../assets/IMG_Logo.png";

const Login = () => {
	const [activeTab, setActiveTab] = useState("Admin");
	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
	};
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const formDataRef = useRef({
		username: "",
		password: "",
	});

	const [isCorrect, setIsCorrect] = useState(true);

	const userSchema = object({
		username: string().required(),
		password: string().required(),
	});
	const handleLogin = async (e) => {
		e.preventDefault();

		const validationErrors = await validateAllInputs(
			formDataRef.current,
			userSchema,
			setErrors
		);

		console.log(validationErrors);
		if (Object.values(validationErrors).every((error) => !error)) {
			setLoading(true);

			fetchData("Login", {
				params: {
					...formDataRef.current,
					role: activeTab,
				},
			})
				.then((response) => {
					if (response.length > 0) {
						const userInfo = {
							username: response[0].usr_username,
							role: response[0].usr_role,
							nama: response[0].nama,
						};
						let user = encryptId(JSON.stringify(userInfo));
						Cookies.set("user", user, { expires: 1 });
						window.location.href = "/admin";
					} else {
						setIsCorrect(false);
					}
				})
				.finally(() => setLoading(false));
		}
	};

	const handleInputChange = async (e) => {
		const { name, value } = e.target;
		const validationError = await validateInput(name, value, userSchema);
		console.log(validationError);
		setErrors((prevErrors) => ({
			...prevErrors,
			[validationError.name]: validationError.error,
		}));
		formDataRef.current[name] = value;
	};

	if (loading) return <Loading />;

	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			style={{ minHeight: "80vh" }}
		>
			<Grid item xs={10} sm={6} md={4}>
				<Card elevation={3}>
					<CardContent>
						<Typography variant="h5" align="center" gutterBottom>
							<img
								src={Logo}
								alt="Logo"
								style={{
									maxWidth: "40%",
									marginBottom: "1rem",
									marginTop: "1rem",
								}}
							/>
						</Typography>
						<Grid container spacing={2} direction="column">
							<div className="align-self-center text-center">
								<label className="fw-bold mb-2">Login as</label>
								<br />
								<div className="tab-buttons">
									<button
										className={activeTab === "Admin" ? "active" : ""}
										onClick={() => handleTabClick("Admin")}
									>
										Admin
									</button>
									<button
										className={activeTab === "Contributor" ? "active" : ""}
										onClick={() => handleTabClick("Contributor")}
									>
										Contributor
									</button>
								</div>
							</div>
							<Grid item>
								<TextField
									label="Username"
									name="username"
									variant="outlined"
									error={errors.username ? true : false}
									onChange={handleInputChange}
									fullWidth
								/>
							</Grid>
							<Grid item>
								<TextField
									label="Password"
									type="password"
									name="password"
									variant="outlined"
									onChange={handleInputChange}
									error={errors.password ? true : false}
									fullWidth
								/>
							</Grid>
							{!isCorrect && (
								<Grid item>
									<label className="text-danger" style={{ fontSize: "12px" }}>
										Username or password incorrect!
									</label>
								</Grid>
							)}

							<Grid item>
								<Button
									variant="contained"
									fullWidth
									color="primary"
									onClick={handleLogin}
								>
									Login
								</Button>
							</Grid>
							<Grid item>
								<Typography variant="body2" align="center">
									Belum punya akun? Hubungi DPP
								</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default Login;
