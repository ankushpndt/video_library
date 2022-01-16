import React from "react";
import { usePlaylist } from "./playlistContext";
import { Link } from "react-router-dom";
import "./Videos.css";
export function Playlist() {
  const { playlist } = usePlaylist();

  return (
    <main>
      <h1>Playlist</h1>
      <div className="video__item">
        <ul>
          {playlist.map((video, i) => {
            return (
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "grid",
                  marginBottom: "1rem"
                }}
                to={`/video/${video.id}`}
                key={video.id}
              >
                {" "}
                <div className="video__body">
                  <img
                    src={video.image}
                    width="370"
                    height=" auto"
                    alt="error"
                  />
                  <div style={{ marginTop: "1rem" }}>{video.title}</div>
                  <p>
                    {video.views} • <span>{video.date}</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
