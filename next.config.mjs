/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com", "api.slingacademy.com"],
  },
  typescript:{
    ignoreBuildErrors: true
  },
  eslint:{
    ignoreDuringBuilds: true
  }

  // webpack(config, { isServer }) {
  //   // Mock fs module for client-side code to prevent bundling errors
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       fs: false,
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;
