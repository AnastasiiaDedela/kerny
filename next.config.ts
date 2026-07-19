import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Our SVGs (payment badges, flag icons, rack icon) are trusted local assets.
    // Allow next/image to serve them; harden with a sandboxing CSP.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
