const BASE_URL = "http://localhost:5000/api/playlists";

// Ambil token dari localStorage untuk Authorization
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// ==============================
// GET semua playlist milik user
// ==============================
export const getAllPlayListByUser = async () => {
  try {
    const headers = getAuthHeader();
    if (!headers.Authorization) throw new Error("User tidak login");

    const response = await fetch(`${BASE_URL}/user/me`, { headers });

    if (!response.ok) {
      const text = await response.text();
      console.error("Error response:", response.status, text);
      throw new Error("Gagal fetch playlist");
    }

    const data = await response.json();

    // Pastikan setiap playlist punya properti "id" untuk React key
    if (Array.isArray(data)) {
      return data.map((playlist) => ({
        ...playlist,
        id: playlist.playlist_id, // tambahkan id = playlist_id
      }));
    }

    return [];
  } catch (err) {
    console.error("getAllPlayListByUser error:", err.message);
    return [];
  }
};

// ==============================
// Tambah playlist baru
// ==============================
export const addPlaylist = async ({ name, description }) => {
  try {
    const headers = getAuthHeader();
    if (!headers.Authorization) throw new Error("User tidak login");

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Error response:", response.status, text);
      throw new Error("Gagal tambah playlist");
    }

    const result = await response.json();
    return result.data || null;
  } catch (err) {
    console.error("addPlaylist error:", err.message);
    return null;
  }
};

// ==============================
// GET playlist user yang mengandung lagu tertentu
// ==============================
export const getPlaylistsContainingSong = async (song_id) => {
  try {
    const headers = getAuthHeader();
    if (!headers.Authorization) throw new Error("User tidak login");

    const response = await fetch(`${BASE_URL}/song/${song_id}`, { headers });

    if (!response.ok) {
      const text = await response.text();
      console.error("Error response:", response.status, text);
      throw new Error("Gagal fetch playlist lagu");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("getPlaylistsContainingSong error:", err.message);
    return [];
  }
};
