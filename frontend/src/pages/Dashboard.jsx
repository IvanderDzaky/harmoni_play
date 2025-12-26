import DashboardLayout from "../components/layout/DashboardLayout";
import { getAllSongs } from "../services/songsService";
import { useEffect, useState } from "react";
import Loader from "../components/layout/Loader";
import SongSection from "../components/SongSection";

export default function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(null);

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

  const handlePlaySong = (index) => {
    setCurrentIndex(index);
  };

  const nextSong = () => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      currentSong={songs[currentIndex]}
      onNext={nextSong}
      onPrev={prevSong}
    >
      <SongSection
        songs={songs}
        titleSection="Popular Song"
        onPlay={handlePlaySong}
      />
    </DashboardLayout>
  );
}
