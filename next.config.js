/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    cssChunking: false,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.optimization.minimizer = config.optimization.minimizer.filter(
        (minimizer) => minimizer.constructor.name !== 'CssMinimizerPlugin'
      )
    }
    return config
  },
}

module.exports = nextConfig
