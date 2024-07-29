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
      },{
        protocol: "https",
        hostname: 'img.irroba.com.br'
      },{
        protocol: "https",
        hostname: 'ae01.alicdn.com'
      }
    ]
  }
};

export default nextConfig;
