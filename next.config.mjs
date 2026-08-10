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
   * CSP на проекте нет — не добавляем жёсткий default (ломает inline/фреймы).
   * Виджеты 1С: config.js с reservi.ru грузится через next/script без блокировок.
   * Если появится CSP — разрешить script-src/frame-src/connect-src для
   * https://reservi.ru https://*.reservi.ru https://fitness1c.ru https://*.fitness1c.ru
   */
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
