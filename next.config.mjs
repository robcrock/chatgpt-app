/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
};

export default nextConfig;
