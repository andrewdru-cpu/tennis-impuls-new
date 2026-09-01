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
      /**
       * www → апекс. HTTP → HTTPS выполняет сам Vercel на уровне домена,
       * здесь его дублировать нельзя (в проде запрос уже приходит по https).
       */
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.tennis-impuls.ru" }],
        destination: "https://tennis-impuls.ru/:path*",
        permanent: true,
      },
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
      {
        source: "/price",
        destination: "/#pricing",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/#contacts",
        permanent: true,
      },
      {
        source: "/offer",
        destination: "/oferta",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
