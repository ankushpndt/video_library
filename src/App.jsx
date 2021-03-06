import "./styles.css";
import "./Videos.css";
import { useEffect, useState } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { Videos } from "./Videos";
import { Playlist } from "./Pages/Playlist/Playlist";
import { NavLink, Route, Routes, Link } from "react-router-dom";
import { WatchLater } from "./Pages/Watch Later/WatchLater";
import { LikedVideos } from "./Pages/Liked Videos/LikedVideos";
import { History } from "./Pages/History/History";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Login } from "./Pages/Account/Login";
import { SignUp } from "./Pages/Account/SignUp";
import { PrivateRoute } from "./Components/PrivateRoute";
import { useAuth } from "./Context/AuthContext";
import { useData } from "./Context/DataContext";
import { getHistory, getVideos } from "./utils/ApiCall";
import { Searchbar } from "./Components/Searchbar";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./Components/Navbar";
import { PageNotFound } from "./Components/PageNotFound";
export const App = () => {
	const { userLogout, login, token } = useAuth();

	const { dispatch, setLoader } = useData();

	const [open, setOpen] = useState(false);
	useEffect(() => {
		getVideos(dispatch, setLoader);
		token && getHistory(dispatch, token, setLoader);
	}, [dispatch, token, setLoader]);
	return (
		<div className="App">
			<div className="app__body">
				<header className="header">
					<Link to="/" className="logo">
						Video Library
					</Link>
					<div
						style={{ display: "flex", justifyContent: "center", width: "100%" }}
					>
						<Searchbar />
					</div>
				</header>
				<aside className="aside">
					<NavLink
						style={({ isActive }) => {
							return { color: isActive ? "rgb(231, 76, 60)" : "black" };
						}}
						className="video__route"
						to="/"
					>
						<HomeIcon />
						<span style={{ fontSize: "1.2rem", paddingLeft: "0.5rem" }}>
							Home
						</span>
					</NavLink>
					<NavLink
						style={({ isActive }) => {
							return { color: isActive ? "rgb(231, 76, 60)" : "black" };
						}}
						className="video__route"
						to="/playlist"
					>
						<PlaylistAddIcon />
						<span style={{ fontSize: "1.2rem", paddingLeft: "0.5rem" }}>
							Playlist
						</span>
					</NavLink>
					<NavLink
						style={({ isActive }) => {
							return { color: isActive ? "rgb(231, 76, 60)" : "black" };
						}}
						className="video__route"
						to="/history"
					>
						<HistoryIcon />
						<span style={{ fontSize: "1.2rem", paddingLeft: "0.5rem" }}>
							History
						</span>
					</NavLink>
					<NavLink
						style={({ isActive }) => {
							return { color: isActive ? "rgb(231, 76, 60)" : "black" };
						}}
						className="video__route"
						to="/watchLater"
					>
						<WatchLaterIcon />
						<span style={{ fontSize: "1.2rem", paddingLeft: "0.5rem" }}>
							Watch Later
						</span>
					</NavLink>
					<NavLink
						style={({ isActive }) => {
							return { color: isActive ? "rgb(231, 76, 60)" : "black" };
						}}
						className="video__route"
						to="/likedVideos"
					>
						<ThumbUpIcon />{" "}
						<span style={{ fontSize: "1.2rem", paddingLeft: "0.5rem" }}>
							Liked Videos
						</span>
					</NavLink>{" "}
					{!login && (
						<NavLink
							style={({ isActive }) => {
								return { color: isActive ? "rgb(231, 76, 60)" : "black" };
							}}
							className="video__route"
							to="/login"
						>
							<AccountCircleIcon />
							<span style={{ fontSize: "1.2rem", paddingLeft: "0.5rem" }}>
								Login
							</span>
						</NavLink>
					)}
					{!login && (
						<NavLink
							style={({ isActive }) => {
								return { color: isActive ? "rgb(231, 76, 60)" : "black" };
							}}
							className="video__route"
							to="/signup"
						>
							<AccountCircleIcon />
							<span style={{ fontSize: "1.2rem", paddingLeft: "0.5rem" }}>
								Sign Up
							</span>
						</NavLink>
					)}
					{login ? (
						<NavLink
							style={({ isActive }) => {
								return { color: isActive ? "rgb(231, 76, 60)" : "black" };
							}}
							className="video__route"
							to="/login"
							onClick={userLogout}
						>
							<LogoutIcon />
							<span style={{ fontSize: "1.2rem", paddingLeft: "0.5rem" }}>
								Logout
							</span>
						</NavLink>
					) : (
						""
					)}
				</aside>
				<div className="mobile__menu">
					<div className="m__menu">
						<Link to="/" className="logo">
							Video Library
						</Link>
						<div>
							<Searchbar />
						</div>
						<button
							className="open__menu"
							onClick={() => setOpen((open) => !open)}
						>
							<MenuIcon />
						</button>{" "}
					</div>
					<div className="bottom__navbar">
						<Navbar />
					</div>
					<div
						className={open ? "menu__drawer__active" : "menu__drawer"}
						onClick={() => setOpen(false)}
					>
						<ul className="menu">
							{!login && (
								<li>
									<NavLink
										style={({ isActive }) => {
											return { color: isActive ? "#4c1d95" : "black" };
										}}
										className="menu__link"
										to="/login"
									>
										<AccountCircleIcon />
										<span style={{ fontSize: "1.2rem", paddingLeft: "0.5rem" }}>
											Login
										</span>
									</NavLink>
								</li>
							)}
							{!login && (
								<li>
									<NavLink
										style={({ isActive }) => {
											return { color: isActive ? "#4c1d95" : "black" };
										}}
										className="menu__link"
										to="/signup"
									>
										<AccountCircleIcon />
										<span style={{ fontSize: "1.2rem", paddingLeft: "0.5rem" }}>
											Sign Up
										</span>
									</NavLink>
								</li>
							)}
							<li>
								{login ? (
									<NavLink
										className="menu__link"
										style={({ isActive }) => {
											return { color: isActive ? "#4c1d95" : "black" };
										}}
										to="/login"
										onClick={userLogout}
									>
										<LogoutIcon />
										<span style={{ fontSize: "1.2rem", paddingLeft: "0.5rem" }}>
											Logout
										</span>
									</NavLink>
								) : (
									""
								)}
							</li>
						</ul>
					</div>
				</div>

				<Routes>
					<Route
						path="/"
						element={
							<main>
								<Videos />
							</main>
						}
					/>

					<Route
						path="/playlist"
						element={
							<PrivateRoute>
								<Playlist />
							</PrivateRoute>
						}
					/>
					<Route
						path="/video/:videoId"
						element={<VideoPlayer setOpen={setOpen} />}
					/>
					<Route
						path="/history"
						element={
							<PrivateRoute>
								<History />
							</PrivateRoute>
						}
					/>
					<Route
						path="/watchLater"
						element={
							<PrivateRoute>
								<WatchLater />
							</PrivateRoute>
						}
					/>
					<Route
						path="/likedVideos"
						element={
							<PrivateRoute>
								<LikedVideos />
							</PrivateRoute>
						}
					/>

					<Route
						path="/login"
						element={
							<main>
								<Login />
							</main>
						}
					/>
					<Route
						path="/signup"
						element={
							<main>
								<SignUp />
							</main>
						}
					/>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				hideProgressBar={true}
				theme="dark"
				transition={Slide}
			/>
		</div>
	);
};
