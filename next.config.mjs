/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/tickets-go-528dd.appspot.com/**'
      }
    ],
    domains: ['t.kfs.io']
  }
}

export default nextConfig
