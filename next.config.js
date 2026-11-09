const fs = require('fs')
const path = require('path')

// The image files in public/images, read when the site is built (or the dev server starts).
// Case studies have optional pictures ("visual slots", components/CaseStudyParts.jsx) that
// stay hidden until their file is added here, then show on the next build.
const imageFiles = (() => {
  try {
    return fs.readdirSync(path.join(__dirname, 'public', 'images'))
      .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f))
      .join('|')
  } catch {
    return ''
  }
})()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    NEXT_PUBLIC_IMAGE_FILES: imageFiles,
  },
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
