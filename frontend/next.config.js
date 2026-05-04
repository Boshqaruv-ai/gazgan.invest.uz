const fallbackSupabaseHostname = 'ynkzcezrohjwirapxkeq.supabase.co';

function getSupabaseHostname() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return fallbackSupabaseHostname;
  }

  try {
    return new URL(supabaseUrl).hostname;
  } catch {
    return fallbackSupabaseHostname;
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: getSupabaseHostname(),
      },
    ],
  },
}

module.exports = nextConfig
