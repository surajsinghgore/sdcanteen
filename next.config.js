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
        {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
       
      },
        {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
       
      },
         {
        protocol: 'https',
        hostname: 'res.cloudinary.com/dnxv21hr0/image/upload',
       
      },
    ],
  },
}

module.exports = nextConfig
