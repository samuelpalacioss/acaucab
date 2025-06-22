/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Suppress the critical dependency warning from @supabase/realtime-js
    config.module.exprContextCritical = false;
    return config;
  },
}

export default nextConfig
