const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
images: {
      remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sdcanteenspace.nyc3.cdn.digitaloceanspaces.com',
       
      },
         {
        protocol: 'https',
        hostname: 'sdcanteenspace.nyc3.digitaloceanspaces.com',
       
      },
    ],
  },
}

module.exports = nextConfig
