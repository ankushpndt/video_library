import { useAuth } from "../../Context/AuthContext";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TextField } from "@mui/material";
import "./Account.css";
import { validateForm } from "../../Components/ValidateForm";
import { useData } from "../../Context/DataContext";
import { Loader } from "../../Components/Loader";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
export const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [showPass, setShowPass] = useState(false);
	const { signUpWithCredentials, error, setError } = useAuth();
	const { loader, setLoader } = useData();
	const [errorMessage, setErrorMessage] = useState("");
	const submitHandler = async (e) => {
		e.preventDefault();

		validateForm({ name, email, password, setErrorMessage }) &&
			signUpWithCredentials(name, email, password, setLoader);
		setError("");
	};

	return (
		<div className="signup">
			{!loader ? (
				<form
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						margin: "1rem auto",
						padding: "4rem",
						border: "2px solid #f0f0f0",
						width: "20rem",
					}}
					onSubmit={submitHandler}
				>
					<h2>Sign Up</h2>
					<br />
					<TextField
						type="text"
						label="Name"
						name="fullName"
						helperText="Enter your name here"
						onChange={(e) => setName(e.target.value)}
						required
						value={name}
					/>

					<br />
					<TextField
						type="text"
						label="Email"
						name="email"
						helperText="Enter your email here"
						onChange={(e) => setEmail(e.target.value)}
						required
						value={email}
					/>
					<br />
					<TextField
						id="standard__basic"
						label="Password"
						type={showPass ? "text" : "password"}
						name="password"
						helperText="Enter your password here"
						onChange={(e) => setPassword(e.target.value)}
						required
						value={password}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => setShowPass(!showPass)}
										onMouseDown={(e) => e.preventDefault()}
										edge="end"
									>
										{showPass ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<br />
					<div className="name__error">
						{errorMessage !== "" && errorMessage}
					</div>
					<div>{error?.message}</div>
					<br />
					<input type="submit" value="SIGN UP" id="login__btn__outlined" />
					<br />
					<p>
						<NavLink
							style={{
								textDecoration: "none",
								color: "black",
							}}
							to="/login"
						>
							Login instead
						</NavLink>
					</p>
				</form>
			) : (
				<Loader />
			)}
		</div>
	);
};
