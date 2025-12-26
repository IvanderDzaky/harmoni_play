
import {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { getSongsByCategoryId } from "../services/songsService";
import DashboardLayout from "../components/layout/DashboardLayout";
import Loader from "../components/layout/Loader";
import SongSection from "../components/SongSection";

const Genre = () => {
    const {id} = useParams()
    const [songs,setSongs] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() =>{

        const fetchSongsByCategoryId = async () => {
            try{
                const data = await getSongsByCategoryId(id)
                if(!data || data.length === 0) {
                    setSongs([])
                }
                setSongs(data)
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        }

        fetchSongsByCategoryId()
    },[id])

    if(loading) {
        return (
            <DashboardLayout>
                <div className="loader-overlay">
                    <Loader />
                </div>
            </DashboardLayout>
        )
    }
    return  (
        <DashboardLayout>
        <div className="genres-page">

            {songs && songs.length > 0 ? (
                <SongSection songs={songs} titleSection={"genres"}/>
            )
            :
            (
                <p>
                    Songs not found
                </p>
            )
            }
        </div>
        </DashboardLayout>
    )
}

export default Genre