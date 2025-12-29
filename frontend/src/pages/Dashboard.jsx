import { getAllSongs } from "../services/songsService";
import { useEffect, useState } from "react";
import Loader from "../components/layout/Loader";
import SongSection from "../components/SongSection";
import { usePlayer } from "../contexts/PlayerContext";

export default function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { playSong } = usePlayer(); // 🔥 pakai context

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const data = await getAllSongs();
        setSongs(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllSongs();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <SongSection
      songs={songs}
      titleSection="Popular Song"
      onPlay={(index) => playSong(songs[index])}
    />
  );
}
