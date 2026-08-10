/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    /**
     * Корпоративные прокси часто ломают /_next/image (400 Bad Request).
     * unoptimized → прямые /images/...webp без ?url= optimizer.
     */
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/personal",
        destination: "/#booking",
        permanent: true,
      },
      {
        source: "/personal/:path*",
        destination: "/#booking",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
