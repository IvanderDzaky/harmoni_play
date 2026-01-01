import { useState } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import "../../styles/Player.css";

export default function Player() {
  const {
    audioRef,
    currentSong,
    playlist,
    isPlaying,
    togglePlay,
    nextSong,
    prevSong,
  } = usePlayer();

  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  if (!currentSong) return null;

  /* ================= PROGRESS ================= */
  const handleTimeUpdate = () => {
    if (!audioRef.current?.duration) return;
    const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percent);
  };

  const handleSeek = (e) => {
    if (!audioRef.current?.duration) return;
    const value = Number(e.target.value);
    audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    setProgress(value);
  };

  /* ================= VOLUME ================= */
  const handleVolume = (e) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  /* ================= NEXT SONG INFO ================= */
  const currentIndex = playlist.findIndex((s) => s.song_id === currentSong.song_id);
  const nextSongInfo =
    playlist.length > 1
      ? playlist[(currentIndex + 1) % playlist.length]
      : null;

  return (
    <div className="player-container">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={nextSong} />

      {/* LEFT */}
      <div className="player-left">
        <img src={currentSong.cover_image} alt={currentSong.title} className="player-cover" />
        <div className="player-info">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist_name || "Unknown Artist"}</p>

          {/* NEXT SONG INFO */}
          {nextSongInfo && (
            <p className="player-next">
              Next: {nextSongInfo.title} — {nextSongInfo.artist_name || "Unknown Artist"}
            </p>
          )}
        </div>
      </div>

      {/* CENTER */}
      <div className="player-center">
        <div className="player-controls">
          <button onClick={prevSong}>⏮</button>
          <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶️"}</button>
          <button onClick={nextSong}>⏭</button>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="player-progress"
        />
      </div>

      {/* RIGHT */}
      <div className="player-right">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
        />
      </div>
    </div>
  );
}
