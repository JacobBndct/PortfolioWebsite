import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jb-portfolio-website.s3.ca-central-1.amazonaws.com",
      },
    ],
  },
  turbopack: {
    root: "C:\\Users\\jacob\\Documents\\GitHub\\PortfolioWebsite",
  },
};

export default nextConfig;
