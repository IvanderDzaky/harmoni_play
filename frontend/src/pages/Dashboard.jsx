import DashboardLayout from "../components/layout/DashboardLayout";
import {getAllSongs} from "../services/songsService"
import {useEffect,useState} from "react";
import Loader from "../components/layout/Loader";
import "../styles/loader.css"
import SongSection from "../components/SongSection";

export default function Dashboard() {
  const [songs,setSongs] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchAllSongs = async () => { 
      try{
        const songs = await getAllSongs()
        console.log(songs)
        setSongs(songs)
      }catch (error) {
        console.log(error)
      }finally {
        setLoading(false)
      }
    }
    fetchAllSongs()
  },[])

  if(loading) {
    return (
      
      <DashboardLayout>
        <div className="loader-overlay">
          <Loader />
        </div>
      </DashboardLayout>
    )
  }

  
  return (
    <DashboardLayout>
      <SongSection songs={songs} titleSection="Popular Song"/>
    </DashboardLayout>
  );
}
