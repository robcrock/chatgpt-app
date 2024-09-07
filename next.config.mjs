/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Attempt to resolve the punycode deprecation warning
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }

    // Attempt to address util._extend deprecation
    config.module.rules.push({
      test: /\.js$/,
      loader: "string-replace-loader",
      options: {
        search: "util._extend",
        replace: "Object.assign",
      },
    });

    return config;
  },
};

export default nextConfig;
