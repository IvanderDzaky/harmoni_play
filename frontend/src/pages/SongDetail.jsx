import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Loader from "../components/layout/Loader";
import { getSongById } from "../services/songsService";
import "../styles/loader.css";
import "../styles/SongDetail.css"

export default function SongDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchSongById = async () => {
      try {
        const data = await getSongById(id);
        if (!data) return;
        setSong(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongById();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loader-overlay">
          <Loader />
        </div>
      </DashboardLayout>
    );
  }

  if (!song) {
    return (
      <DashboardLayout>
        <p>Song not found</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="song-detail">
        <div className="song-header">
          <img
            src={song.cover_image || "/default-cover.png"}
            alt={song.title || "Unknown Title"}
            className="song-cover"
          />
          <div className="song-info">
            <h1 className="song-title">{song.title || "Unknown Title"}</h1>
            <p className="song-meta">
              {song.artist || "Unknown Artist"} • {song.album || "-"} •{" "}
              {song.year || "-"} • {song.duration || "-"} •{" "}
              {(song.plays ?? 0).toLocaleString()}
            </p>
            <div className="song-actions">
              <button className="play-btn">▶️ Play</button>
              <button className="add-btn">＋</button>
              <button className="download-btn">⬇️</button>
            </div>
          </div>
        </div>

        <div className="song-lyrics">
          <h2>Lyrics</h2>
          {song.lyrics
            ? song.lyrics.split("\n").map((line, idx) => <p key={idx}>{line}</p>)
            : <p>No lyrics available</p>}
        </div>
      </div>
    </DashboardLayout>
  );
}
