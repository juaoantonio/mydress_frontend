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
      },{
        protocol: "https",
        hostname: 'my-dress-dev.s3.amazonaws.com'
      },{
        protocol: "http",
        hostname: 'localhost'
      },{
        protocol: "https",
        hostname: 'my-dress-prod.s3.amazonaws.com'
      },
    ]
  }
};

export default nextConfig;
