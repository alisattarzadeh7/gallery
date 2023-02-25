/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})
const {i18n} = require("./next-i18next.config");
const nextSafe = require('next-safe')





const isDev = process.env.NODE_ENV !== 'production'

const nextConfig = {

  async headers () {
    return [
      {
        source: '/:path*',
        headers: nextSafe({ isDev,
          contentSecurityPolicy:{
            "default-src": ["'self'"],
            "img-src": ["*","'self'",'blob:'],
            "connect-src":["*","'self'"],
            "font-src": ["'self'","data:"],
            "style-src": ["'self'","'unsafe-inline'","'unsafe-eval'" ,"'strict-dynamic'"],
            "base-uri": "'none'",
            "child-src": "'none'",
            "form-action": "'self'",
            "frame-ancestors": "'none'",
            "frame-src": [],
            "manifest-src": "'self'",
            "media-src": "'self'",
            "object-src": "'none'",
            "prefetch-src": "'self'",
            "script-src": [],
            "worker-src": "'self'",
            reportOnly: false,
          }
        }),
      },
    ]
  },
  reactStrictMode: true,
  // trailingSlash:true,
  i18n,
  images: {
    domains: ['localhost'],
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = withPWA(nextConfig)