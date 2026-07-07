const backendUrl =
    process.env.BACKEND_URL ||
    "http://localhost:5000";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },

    async rewrites() {
        return [
            {
                source: "/api/auth/:path*",
                destination: `${backendUrl}/api/auth/:path*`,
            },
            {
                source: "/api/:path*",
                destination: `${backendUrl}/api/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
