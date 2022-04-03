import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const { state } = useLocation();
	const {
		isUserLoggedIn,
		token: savedToken,
		user: userName,
		userId: userid,
	} = JSON.parse(localStorage?.getItem("login")) || {
		isUserLoggedIn: false,
		token: null,
		user: "",
		userId: "",
	};

	const [login, setLogin] = useState(isUserLoggedIn);
	const [token, setToken] = useState(savedToken);
	const [error, setError] = useState("");
	const [user, setUser] = useState(userName);
	const [userId, setUserId] = useState(userid);
	const navigate = useNavigate();

	//signup

	const signUpWithCredentials = async (name, email, password, setLoader) => {
		try {
			setLoader(true);
			const response = await axios.post(
				"https://videoLibraryBackend.ankushpndt.repl.co/user/signup",
				{ name: name, email: email, password: password }
			);

			if (response.data.success === true) {
				signUpUser(response.data);
				navigate(state?.from ? state.from : "/");
				setLoader(false);
			}
		} catch (error) {
			setError(error.response.data);
			console.log(error.response);
		}
	};
	const signUpUser = ({ token, userName, userid }) => {
		console.log({ token, userName, userid });
		setToken(token);
		setLogin(true);
		setUser(userName);
		setUserId(userid);
		localStorage.setItem(
			"login",
			JSON.stringify({
				isUserLoggedIn: true,
				token,
				user: userName,
				userId: userid,
			})
		);

		toast.dark("Signed Up successfully!");
	};

	// login
	const loginWithCredentials = async (email, password, setLoader) => {
		try {
			setLoader(true);
			const response = await axios.post(
				"https://videoLibraryBackend.ankushpndt.repl.co/user/login",
				{
					email: email,
					password: password,
				}
			);

			if (response.data.success === true) {
				loginUser(response.data);
				navigate(state?.from ? state.from : "/");
				setLoader(false);
			}
		} catch (error) {
			console.log(error.response.data);
			setError(error.response.data);
		}
	};
	const loginUser = ({ token, userName, userid }) => {
		setToken(token);
		setLogin(true);
		setUser(userName);
		setUserId(userid);
		localStorage.setItem(
			"login",
			JSON.stringify({
				isUserLoggedIn: true,
				token,
				user: userName,
				userId: userid,
			})
		);
		toast.dark("Signed in successfully!");
	};
	const userLogout = async () => {
		localStorage.removeItem("login");
		setLogin(false);
		setToken("");
		setUser("");
		setUserId("");
		toast.dark("Logged out successfully");
		navigate("/login");
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				loginWithCredentials,
				signUpWithCredentials,
				error,
				token,
				userLogout,
				user,
				userId,
				setError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuth = () => useContext(AuthContext);
