/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use experimental.optimizePackageImports feature to optimize package imports
  // Especially for Chakra UI, can significantly reduce bundle size
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  // Enable webpack5 features and React strict mode
  reactStrictMode: true,
  // Add Chakra UI transpilation configuration
  transpilePackages: ['@chakra-ui/react'],
};

export default nextConfig;
