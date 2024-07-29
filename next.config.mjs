/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'randomuser.me'
      }, {
        protocol: "https",
        hostname: 'images.tcdn.com.br'
      }
    ]
  }
};

export default nextConfig;
