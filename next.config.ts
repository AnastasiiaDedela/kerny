import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Next 16 allowlists optimizer qualities; 100 is for the detailed illustrations,
    // whose dark gradients band badly at the default 75.
    qualities: [75, 100],
    // Our SVGs (payment badges, flag icons, rack icon) are trusted local assets.
    // Allow next/image to serve them; harden with a sandboxing CSP.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
