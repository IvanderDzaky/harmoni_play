import { createContext, useContext, useRef, useState, useEffect } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  /* ================= PLAY SONG ================= */
  const playSong = (song) => {
    if (!song) return;

    // Klik lagu sama → toggle
    if (currentSong?.song_id === song.song_id) {
      togglePlay();
      return;
    }

    setCurrentSong(song);

    // Tambahkan lagu ke playlist jika belum ada
    if (!playlist.find((s) => s.song_id === song.song_id)) {
      setPlaylist([...playlist, song]);
    }

    setIsPlaying(true);
  };

  /* ================= NEXT / PREV ================= */
  const nextSong = () => {
    if (!playlist.length || !currentSong) return;
    const idx = playlist.findIndex((s) => s.song_id === currentSong.song_id);
    const nextIdx = (idx + 1) % playlist.length;
    setCurrentSong(playlist[nextIdx]);
    setIsPlaying(true);
  };

  const prevSong = () => {
    if (!playlist.length || !currentSong) return;
    const idx = playlist.findIndex((s) => s.song_id === currentSong.song_id);
    const prevIdx = (idx - 1 + playlist.length) % playlist.length;
    setCurrentSong(playlist[prevIdx]);
    setIsPlaying(true);
  };

  /* ================= TOGGLE PLAY ================= */
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();

    setIsPlaying((prev) => !prev);
  };

  /* ================= LOAD SONG ================= */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.file_audio) return;

    audio.src = currentSong.file_audio;
    audio.load();

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, [currentSong]);

  /* ================= AUTOPLAY NEXT ================= */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => nextSong();
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [playlist]);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        playlist,
        currentSong,
        isPlaying,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        setPlaylist,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer harus di dalam PlayerProvider");
  return ctx;
}
