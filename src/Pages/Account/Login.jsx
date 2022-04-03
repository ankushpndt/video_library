import { useAuth } from "../../Context/AuthContext";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TextField } from "@mui/material";
import "./Account.css";
import { validateForm } from "../../Components/ValidateForm";
import { useData } from "../../Context/DataContext";
import { Loader } from "../../Components/Loader";
export const Login = () => {
	const { loginWithCredentials, error, setError } = useAuth();
	const { setLoader, loader } = useData();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const submitHandler = (e) => {
		e.preventDefault();

		validateForm({ email, password, setErrorMessage }) &&
			loginWithCredentials(email, password, setLoader);
		setError("");
	};

	return (
		<div className="login">
			{!loader ? (
				<form
					onSubmit={submitHandler}
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
				>
					<h2>Login</h2>
					<br />
					<TextField
						id="standard__basic"
						label="Email"
						type="text"
						name="email"
						helperText="Enter your email here"
						onChange={(e) => setEmail(e.target.value)}
						required
						value={email}
					/>

					<br />
					<br />

					<TextField
						id="standard__basic"
						label="Password"
						type="password"
						name="password"
						helperText="Enter your password here"
						onChange={(e) => setPassword(e.target.value)}
						required
						value={password}
					/>
					<br />
					<div className="name__error">
						{errorMessage !== "" && errorMessage}
					</div>
					<div>{error?.message}</div>
					<br />
					{/*Login button*/}
					<input type="submit" value="LOGIN" id="login__btn__outlined" />
					<button
						id="login__btn__outlined"
						onClick={() =>
							loginWithCredentials("a@gmail.com", "12345678", setLoader)
						}
						style={{ margin: "1rem 0" }}
					>
						Guest Login
					</button>
					<br />
					<p>
						<NavLink
							style={{
								textDecoration: "none",
								color: "black",
							}}
							to="/signup"
						>
							Create an account
						</NavLink>
					</p>
				</form>
			) : (
				<Loader />
			)}
		</div>
	);
};
