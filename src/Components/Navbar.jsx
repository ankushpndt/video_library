import React from "react";
import { NavLink } from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useAuth } from "../Context/AuthContext";
import "./Navbar.css";
export const Navbar = () => {
	const { userLogout, login } = useAuth();

	return (
		<div className="bottom__navbar__container">
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "red" : "white" };
				}}
				to="/"
				className="bottom__navbar__route"
			>
				<HomeIcon />
				<span style={{ fontSize: "small" }}>Home</span>
			</NavLink>
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "red" : "white" };
				}}
				to="/playlist"
				className="bottom__navbar__route"
			>
				<PlaylistAddIcon />
				<span style={{ fontSize: "small" }}>Playlist</span>
			</NavLink>
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "red" : "white" };
				}}
				to="/history"
				className="bottom__navbar__route"
			>
				<HistoryIcon />
				<span style={{ fontSize: "small" }}>History</span>
			</NavLink>
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "red" : "white" };
				}}
				to="/watchLater"
				className="bottom__navbar__route"
			>
				<WatchLaterIcon />
				<span style={{ fontSize: "small" }}>Watch Later</span>
			</NavLink>
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "red" : "white" };
				}}
				to="/likedVideos"
				className="bottom__navbar__route"
			>
				<ThumbUpIcon /> <span style={{ fontSize: "small" }}>Liked Videos</span>
			</NavLink>{" "}
		</div>
	);
};
