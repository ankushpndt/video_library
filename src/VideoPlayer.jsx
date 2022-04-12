import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./Videos.css";
import { useData } from "./Context/DataContext";
import { Modal } from "./Components/Modal";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import {
	addToHistory,
	addToWatchLater,
	addToLikedVideos,
	getLikedVideos,
	addToLikedByUser,
} from "./utils/ApiCall";
import { useAuth } from "./Context/AuthContext";

export const VideoPlayer = ({ setOpen }) => {
	const { videoList, dispatch, setLoader } = useData();
	const { videoId } = useParams();
	const getVideoDetails = (videos, videoId) =>
		videos?.find((video) => video.videoId === videoId);
	const video = getVideoDetails(videoList, videoId);

	const { token, login, userId } = useAuth();
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();

	const toggleModal = () => {
		setOpen(false);
		login ? setModal(!modal) : navigate("/login");
	};
	const opts = {
		playerVars: {
			autoplay: 1,
		},
	};

	useEffect(() => {
		if (token) {
			getLikedVideos(dispatch, token, setLoader);
		}
	}, [dispatch, token, userId, setLoader]);

	return (
		<main>
			<div className="video__player">
				<div className="video__responsive">
					<div className="youtube__player">
						<YouTube
							className="y__player"
							videoId={`${videoId}`}
							opts={opts}
							onPlay={() => {
								if (login) {
									addToHistory({ dispatch, _id: video?._id, token });
								}
							}}
						/>
					</div>
				</div>
				<ul>
					<div style={{ marginTop: "1rem" }}>{video?.title}</div>
					<div className="info">
						<p style={{ color: "gray" }}>
							{video?.views} • <span>{video?.date}</span>
						</p>
						<div className="info__btn">
							<span style={{ display: "flex", alignItems: "center" }}>
								{video?.likedByUser?.includes(userId) ? (
									<ThumbUpAltIcon
										onClick={() => {
											if (login) {
												addToLikedVideos({
													dispatch,
													_id: video?._id,
													token,
												});
												addToLikedByUser({
													dispatch,
													_id: video?._id,
													token,
													userId,
												});
											} else {
												navigate("/login");
											}
										}}
									/>
								) : (
									<ThumbUpAltOutlinedIcon
										onClick={() => {
											if (login) {
												addToLikedVideos({ dispatch, _id: video?._id, token });

												addToLikedByUser({
													dispatch,
													_id: video?._id,
													token,
													userId,
												});
											} else {
												navigate("/login");
											}
										}}
									/>
								)}
								<div className="like__length" style={{ paddingLeft: "0.4rem" }}>
									{video?.likedByUser?.length}
								</div>
							</span>
							<ThumbDownAltIcon />
							<WatchLaterIcon
								onClick={() =>
									addToWatchLater({ dispatch, token, _id: video?._id })
								}
							/>
							<button className="playlist__btn" onClick={toggleModal}>
								<PlaylistAddIcon />
							</button>
						</div>
					</div>
					{modal && (
						<Modal toggleModal={toggleModal} modal={modal} videoId={videoId} />
					)}
				</ul>
			</div>
		</main>
	);
};
