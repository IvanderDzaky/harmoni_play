import axios from "axios";

const ARTIST_BASE_URL = "http://localhost:5000/api/artists";
const SONG_BASE_URL = "http://localhost:5000/api/songs";

// ================= AUTH HEADER =================
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token tidak ditemukan. Silakan login.");
  return { Authorization: `Bearer ${token}` };
};

// ================= FETCH LAGU MILIK MUSISI =================
export const getMySongs = async () => {
  const headers = getAuthHeader();
  const res = await axios.get(`${ARTIST_BASE_URL}/my-songs`, { headers });
  return res.data;
};

// ================= AJUKAN MENJADI ARTIST =================
export const ajukanMusisi = async (formData) => {
  const headers = getAuthHeader();
  const res = await axios.post(`${ARTIST_BASE_URL}/ajukan`, formData, {
    headers,
  });

  // update localStorage dengan artist_id baru
  const user = JSON.parse(localStorage.getItem("user"));
  if (res.data.artist && user) {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, artist_id: res.data.artist.artist_id })
    );
  }

  return res.data;
};


// ================= ADMIN VERIFIKASI ARTIST =================
export const adminVerifyArtist = async (artist_id, verified) => {
  const headers = { ...getAuthHeader(), "Content-Type": "application/json" };
  const res = await axios.put(
    `${ARTIST_BASE_URL}/verify/${artist_id}`,
    { verified },
    { headers }
  );
  return res.data;
};

// ================= UPLOAD SONG =================
export const uploadSong = async (formData) => {
  // Ambil data user dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) throw new Error("User tidak ditemukan. Silakan login ulang.");

  // Validasi field wajib
  if (!formData.get("title")) throw new Error("Title wajib diisi!");
  if (!formData.get("file_audio")) throw new Error("Audio file wajib diisi!");
  if (!user.artist_id) throw new Error("Artist ID tidak ditemukan.");
  if (!user.user_id) throw new Error("User ID tidak ditemukan.");

  formData.set("artist_id", user.artist_id);
  formData.set("uploaded_by", user.user_id);

  try {
    const headers = getAuthHeader(); 
    const res = await axios.post(`${SONG_BASE_URL}/`, formData, { headers });
    return res.data;
  } catch (err) {
    console.error("Upload song error:", err.response?.data || err.message);
    throw err;
  }
};