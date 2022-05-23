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
			toast.error(error.response.data.message, {
				position: "bottom-center",
			});
			setLoader(false);
		}
	};
	const signUpUser = ({ token, userName, userid }) => {
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

		toast.success("Signed Up successfully!", {
			position: "bottom-center",
		});
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
			toast.error(error.response.data.message, {
				position: "bottom-center",
			});
			setLoader(false);
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
		toast.success("Signed in successfully!", {
			position: "bottom-center",
		});
	};
	const userLogout = async () => {
		localStorage.removeItem("login");
		setLogin(false);
		setToken("");
		setUser("");
		setUserId("");
		toast.success("Logged out successfully");
		navigate("/login");
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				loginWithCredentials,
				signUpWithCredentials,
				token,
				userLogout,
				user,
				userId,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuth = () => useContext(AuthContext);
