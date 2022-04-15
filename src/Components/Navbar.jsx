import React from "react";
import { NavLink } from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import "./Navbar.css";
export const Navbar = () => {
	return (
		<div className="bottom__navbar__container">
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "#e74c3c" : "white" };
				}}
				to="/"
				className="bottom__navbar__route"
			>
				<HomeIcon />
				<span
					style={{
						fontSize: "small",
						textAlign: "center",
						width: "50px",
						lineHeight: "0.75rem",
						fontWeight: "bold",
					}}
				>
					Home
				</span>
			</NavLink>
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "#e74c3c" : "white" };
				}}
				to="/playlist"
				className="bottom__navbar__route"
			>
				<PlaylistAddIcon />
				<span
					style={{
						fontSize: "small",
						textAlign: "center",
						width: "50px",
						lineHeight: "0.75rem",
						fontWeight: "bold",
					}}
				>
					Playlist
				</span>
			</NavLink>
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "#e74c3c" : "white" };
				}}
				to="/history"
				className="bottom__navbar__route"
			>
				<HistoryIcon />
				<span
					style={{
						fontSize: "small",
						textAlign: "center",
						width: "50px",
						lineHeight: "0.75rem",
						fontWeight: "bold",
					}}
				>
					History
				</span>
			</NavLink>
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "#e74c3c" : "white" };
				}}
				to="/watchLater"
				className="bottom__navbar__route"
			>
				<WatchLaterIcon />
				<span
					style={{
						fontSize: "small",
						textAlign: "center",
						width: "50px",
						lineHeight: "0.85rem",
						fontWeight: "bold",
					}}
				>
					Later
				</span>
			</NavLink>
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "#e74c3c" : "white" };
				}}
				to="/likedVideos"
				className="bottom__navbar__route"
			>
				<ThumbUpIcon />{" "}
				<span
					style={{
						fontSize: "small",
						textAlign: "center",
						width: "50px",
						lineHeight: "0.75rem",
						fontWeight: "bold",
					}}
				>
					Liked
				</span>
			</NavLink>{" "}
		</div>
	);
};
