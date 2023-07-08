import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://gyunznagrwoifalxfods.supabase.co";
const SUPABASE_KEY = 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5dW56bmFncndvaWZhbHhmb2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1ODE0NjMsImV4cCI6MjAwNDE1NzQ2M30.jGLJzpLMa5bs8N3QBOGYL-id-adg4gXX8qvHwWFMw2U";  

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
