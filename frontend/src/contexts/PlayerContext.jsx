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

    // klik lagu yang sama → toggle play
    if (currentSong?.song_id === song.song_id) {
      togglePlay();
      return;
    }

    setCurrentSong(song);

    // tambahkan ke playlist jika belum ada
    setPlaylist((prev) =>
      prev.find((s) => s.song_id === song.song_id)
        ? prev
        : [...prev, song]
    );

    setIsPlaying(true);
  };

  /* ================= NEXT / PREV ================= */
  const nextSong = () => {
    if (!playlist.length || !currentSong) return;

    const idx = playlist.findIndex(
      (s) => s.song_id === currentSong.song_id
    );
    const nextIdx = (idx + 1) % playlist.length;

    setCurrentSong(playlist[nextIdx]);
    setIsPlaying(true);
  };

  const prevSong = () => {
    if (!playlist.length || !currentSong) return;

    const idx = playlist.findIndex(
      (s) => s.song_id === currentSong.song_id
    );
    const prevIdx = (idx - 1 + playlist.length) % playlist.length;

    setCurrentSong(playlist[prevIdx]);
    setIsPlaying(true);
  };

  /* ================= TOGGLE PLAY ================= */
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  /* ================= LOAD SONG ================= */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.file_audio) return;

    audio.src = currentSong.file_audio;
    audio.load();
  }, [currentSong]);

  /* ================= PLAY / PAUSE ================= */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  /* ================= AUTOPLAY NEXT ================= */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => nextSong();
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playlist, currentSong]);

  /* ================= RESET PLAYER ================= */
  const resetPlayer = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = "";
    }

    setPlaylist([]);
    setCurrentSong(null);
    setIsPlaying(false);
  };

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
        resetPlayer,
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
