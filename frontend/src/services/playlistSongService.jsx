const BASE_URL = "http://localhost:5000/api/playlist-songs";
import axios from "axios";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export const getAllPlaylistSongs = async (playlistId) => {
  const res = await axios.get(
    `http://localhost:5000/api/playlist-songs/${playlistId}`
  );

  const playlistSongs = res.data.data || [];

  return playlistSongs.map((item) => ({
    song_id: item.song.song_id,
    title: item.song.title,
    cover_image: item.song.cover_image,
    artist: item.song.artist?.name || "-",
    album: item.song.album?.title || "-",
    duration: "-",
    added_at: item.added_at,
  }));
};

export const addSongToPlaylist = async (payload) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to add song to playlist");
  }

  return response.json();
};

export const getPlaylistsContainingSong = async (songId) => {
  const response = await fetch(`${BASE_URL}/song/${songId}`, {
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playlists containing song");
  }

  return response.json();
};
