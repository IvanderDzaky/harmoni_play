const BASE_URL = "http://localhost:5000/api/artists";

// Ajukan musisi (PAKAI FORM DATA)
export const ajukanMusisi = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/ajukan`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // JANGAN set Content-Type
    },
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Gagal mengirim pengajuan musisi");
  }

  return res.json();
};

// Admin verifikasi artist (TETAP JSON, INI BENAR)
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
