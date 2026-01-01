import { useEffect, useState } from "react";
import { getAllSongs } from "../services/songsService";
import SongSection from "../components/SongSection";
import { usePlayer } from "../contexts/PlayerContext";
import { useLoader } from "../contexts/LoaderContext";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [songs, setSongs] = useState([]);
  const { playSong } = usePlayer();
  const { setLoading } = useLoader();

  useEffect(() => {
    const fetchAllSongs = async () => {
      setLoading(true);
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

  return (
    <div className="dashboard-content">
      <SongSection
        songs={songs}
        titleSection="Popular Songs"
        onPlay={(index) => playSong(songs[index])}
      />
    </div>
  );
}
