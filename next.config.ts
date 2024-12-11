import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  reactStrictMode: true, // Bật chế độ nghiêm ngặt cho React
  experimental: {
    reactMode: "concurrent", // Sử dụng chế độ concurrent cho React (nếu muốn)
  },
};
export default nextConfig;
