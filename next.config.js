/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: 
        ["img.youtube.com", "res.cloudinary.com"]
    },
    async headers() {
        return [
          {
            source: "/api/:path*",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "*" },
              { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
              { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
          }
        ]
      },
      env: {
        MONGODB_URL: process.env.MONGODB_URL,
        MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,

        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

        ADMIN_LOGIN: process.env.ADMIN_LOGIN,

        JWT_SECRET: process.env.JWT_SECRET,

        AUTH_EMAIL_TEMPLATE: process.env.AUTH_EMAIL_TEMPLATE,

        EMAIL_SERVICE: process.env.EMAIL_SERVICE,
        EMAIL_TEMPLATE: process.env.EMAIL_TEMPLATE,
        EMAIL_PUBLIC: process.env.EMAIL_PUBLIC,
        EMAIL_PRIVATE: process.env.EMAIL_PRIVATE,

       NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
      }
}
module.exports = nextConfig
