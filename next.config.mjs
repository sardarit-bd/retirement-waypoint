if (!process.env.BACKEND_URL) {
  throw new Error("BACKEND_URL must be configured");
}

const backendUrl = new URL(process.env.BACKEND_URL);

if (!['http:', 'https:'].includes(backendUrl.protocol)) {
  throw new Error("BACKEND_URL must use http or https");
}

const backendOrigin = backendUrl.origin;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${backendOrigin}/api/auth/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${backendOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
