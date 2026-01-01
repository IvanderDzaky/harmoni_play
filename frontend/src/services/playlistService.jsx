const BASE_URL = "http://localhost:5000/api/playlists";

// Ambil token dari localStorage untuk Authorization
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// GET semua playlist milik user yang sedang login
export const getAllPlayListByUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/user/me`, {
      headers: getAuthHeader(),
    });

    if (!response.ok) throw new Error("Gagal fetch playlist");

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Tambah playlist baru
export const addPlaylist = async ({ name, description }) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) throw new Error("Gagal tambah playlist");

    const result = await response.json();
    return result.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// GET playlist user yang mengandung lagu tertentu
export const getPlaylistsContainingSong = async (song_id) => {
  try {
    const response = await fetch(`${BASE_URL}/song/${song_id}`, {
      headers: getAuthHeader(),
    });

    if (!response.ok) throw new Error("Gagal fetch playlist lagu");

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
