import { getAllSongs } from "../services/songsService";
import { useEffect, useState } from "react";
import SongSection from "../components/SongSection";
import { usePlayer } from "../contexts/PlayerContext";
import { useLoader } from "../contexts/LoaderContext"; // loader global

export default function Dashboard() {
  const [songs, setSongs] = useState([]);
  const { playSong } = usePlayer();
  const { setLoading } = useLoader();

  useEffect(() => {
    const fetchAllSongs = async () => {
      setLoading(true); // start loader global
      try {
        const data = await getAllSongs();
        setSongs(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // stop loader global
      }
    };
    fetchAllSongs();
  }, []);

  return (
    <SongSection
      songs={songs}
      titleSection="Popular Song"
      onPlay={(index) => playSong(songs[index])}
    />
  );
}
