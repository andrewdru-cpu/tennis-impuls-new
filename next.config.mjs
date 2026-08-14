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
  /**
   * CSP намеренно НЕ задаём: style-src/default-src ломают Tailwind + inline critical CSS
   * и дают «текстовый» сайт. Не добавлять Content-Security-Policy без style-src 'unsafe-inline'
   * и разрешения /_next/static.
   */
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/personal",
        destination: "/account",
        permanent: true,
      },
      {
        source: "/personal/:path*",
        destination: "/account",
        permanent: true,
      },
      {
        source: "/lk",
        destination: "/account",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
