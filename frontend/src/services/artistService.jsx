import axios from "axios";

const BASE_URL = "http://localhost:5000/api/artists";

// ================= AUTH HEADER =================
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token tidak ditemukan. Silakan login.");
  return { Authorization: `Bearer ${token}` };
};

// ================= FETCH LAGU MILIK MUSISI =================
export const getMySongs = async () => {
  const headers = getAuthHeader();
  const res = await axios.get(`${BASE_URL}/my-songs`, { headers });
  return res.data;
};

// ================= AJUKAN MUSISI =================
export const ajukanMusisi = async (formData) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/ajukan`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // JANGAN set Content-Type, biarkan browser atur FormData
    },
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Gagal mengirim pengajuan musisi");
  }

  return res.json();
};

// ================= ADMIN VERIFIKASI ARTIST =================
export const adminVerifyArtist = async (artist_id, verified) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/verify/${artist_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ verified }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Gagal verifikasi artist");
  }

  return res.json();
};

// ================= UPLOAD SONG =================
export const uploadSong = async (formData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post("/api/songs/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
