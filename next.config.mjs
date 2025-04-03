/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com"],
  },

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
