import { useRef, useState, useEffect } from "react";
import "../../styles/Player.css";

export default function Player({ song, onNext, onPrev }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [song]);

  if (!song) return null;

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const percent =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percent || 0);
  };

  return (
    <div className="player-container">
      <audio
        ref={audioRef}
        src={song.file_audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />

      {/* LEFT */}
      <div className="player-left">
        <img
          src={song.cover_image}
          alt={song.title}
          className="player-cover"
        />
        <div className="player-meta">
          <h4 className="player-title">{song.title}</h4>
          <p className="player-artist">
            {song.artist_name || "Unknown Artist"}
          </p>
        </div>
      </div>

      {/* CENTER */}
      <div className="player-center">
        <div className="player-controls">
          <button onClick={onPrev}>⏮</button>
          <button onClick={togglePlay}>
            {isPlaying ? "⏸" : "▶️"}
          </button>
          <button onClick={onNext}>⏭</button>
        </div>

        <div className="player-progress">
          <div
            className="player-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="player-right">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={(e) => (audioRef.current.volume = e.target.value)}
        />
      </div>
    </div>
  );
}
