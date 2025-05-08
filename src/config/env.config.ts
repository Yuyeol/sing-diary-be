export const envConfig = {
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  port: parseInt(process.env.PORT, 10) || 3000,
};
