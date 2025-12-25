import multer from "multer";

// Memory storage supaya file bisa langsung diupload ke Supabase
export const upload = multer({ storage: multer.memoryStorage() });
