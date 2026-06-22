import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // Allow Next.js's <Image> component to load and optimize photos
    // from Unsplash for now. Swap/remove this once real vehicle and
    // hero photography from the client is in place.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  allowedDevOrigins: ['sliding-snagged-monotone.ngrok-free.dev'],
};

export default nextConfig;
