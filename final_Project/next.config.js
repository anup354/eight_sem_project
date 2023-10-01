/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    
    domains: ['localhost', 'api.devsrvofads.com', 'devsrvofads.com', "cdn.devsrvofads.com", "cdn.adsaro.com"],
    remotePatterns: [
      {
          protocol: 'https',
          hostname: '**',
          port: '',
          pathname: '**',
      },
  ],
  },
}


module.exports = nextConfig
