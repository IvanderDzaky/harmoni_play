import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export const supabase = createClient(
  process.env.SUPABASE_URL, // URL Supabase
  process.env.SUPABASE_KEY  // Service Role Key atau anon key
);
