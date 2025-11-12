import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Buat koneksi ke Supabase PostgreSQL
export const sequelize = new Sequelize(process.env.SUPABASE_DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false,
    // },
  },
});

// Tes koneksi ke database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Berhasil konek ke Supabase Database!");
  } catch (error) {
    console.error("❌ Gagal konek ke Supabase Database:", error.message);
  }
})();
