/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages with @cloudflare/next-on-pages uses standard build.
  // We do NOT set output: 'export' to keep API routes working via the adapter.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;