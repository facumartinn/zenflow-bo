/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zenflowimg.nyc3.cdn.digitaloceanspaces.com'
      }
    ]
  }
};

export default nextConfig;
