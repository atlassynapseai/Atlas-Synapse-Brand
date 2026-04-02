/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/Atlas-Synapse-Brand',
  assetPrefix: '/Atlas-Synapse-Brand',
  async redirects() {
    return [
      { source: "/platform", destination: "/solutions", permanent: true },
      { source: "/security", destination: "/solutions", permanent: true },
      { source: "/portal", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

