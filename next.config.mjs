/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.valorant-api.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'valorao-cdn.rtrampox.cloud',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;