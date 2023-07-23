/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'img9.doubanio.com',
      //   port: '',
      //   pathname: '/view/**',
      // },
      {
        protocol: 'https',
        hostname: 'bkimg.cdn.bcebos.com',
        port: '',
        pathname: '/pic/**',
      },
    ],
  },
}

module.exports = nextConfig
