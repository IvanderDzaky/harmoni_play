import { useRef, useState, useEffect } from "react";
import "../../styles/Player.css";

export default function Player() {
  const audioRef = useRef(null);

  // Sample playlist
  // Nanti dari backend
  const playlist = [
    {
      id: 1,
      title: "Midnight Drive",
      artist: "Luxe Beats",
      cover: "https://i.scdn.co/image/ab67616d0000b273e73e9377a1c75f1ef5e3f6b0",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "Dreamscape",
      artist: "Synthwave",
      cover: "https://i.scdn.co/image/ab67616d0000b273c60211472edbba7d6851124c",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentSong = playlist[currentIndex];

  useEffect(() => {
    if (isPlaying) audioRef.current.play();
  }, [currentIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const percent =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percent);
  };

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const seekTime =
      ((e.clientX - rect.left) / rect.width) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
  };

  const nextSong = () => {
    setCurrentIndex((currentIndex + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentIndex(
      currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    );
    setIsPlaying(true);
  };

  return (
    <div className="player-container">
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
      />

      {/* LEFT — song info */}
      <div className="player-left">
        <img src={
        currentSong?.cover_image?.startsWith("http")
        ? currentSong.cover_image
        : "/default-cover.png"
        } 
        alt="" className="player-cover" />
        <div>
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      {/* CENTER — controls */}
      <div className="player-center">
        <div className="player-controls">
          <button onClick={prevSong}>⏮</button>
          <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶️"}</button>
          <button onClick={nextSong}>⏭</button>
        </div>

        <div className="player-progress" onClick={handleSeek}>
          <div className="player-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* RIGHT — volume */}
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
