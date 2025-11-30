#!/usr/bin/env node
/**
 * tools/generate-raster-images.js
 *
 * Converts SVG files found in `assets/` to PNG and WebP using sharp.
 * Usage:
 *   npm install sharp
 *   node tools/generate-raster-images.js
 *
 * The script will write files alongside SVGs, e.g. `assets/logo.png` and `assets/logo.webp`.
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const ASSETS_DIR = path.join(process.cwd(), 'assets')
const SVGS = ['logo.svg', 'screenshot-placeholder.svg', 'demo-animation.svg', 'logo.min.svg', 'screenshot-placeholder.min.svg', 'demo-animation.min.svg']

async function convert(svgName) {
  const svgPath = path.join(ASSETS_DIR, svgName)
  if (!fs.existsSync(svgPath)) return
  const base = svgName.replace(/\.min\.svg$|\.svg$/,'')
  const pngOut = path.join(ASSETS_DIR, `${base}.png`)
  const webpOut = path.join(ASSETS_DIR, `${base}.webp`)
  try {
    const data = await sharp(svgPath)
      .png({ quality: 90 })
      .toFile(pngOut)
    await sharp(svgPath)
      .webp({ quality: 80 })
      .toFile(webpOut)
    console.log('Written', pngOut, webpOut)
  } catch (err) {
    console.error('Error converting', svgName, err.message)
  }
}

async function run() {
  for (const s of SVGS) {
    await convert(s)
  }
}

run()
  .then(() => console.log('Done'))
  .catch((e) => { console.error(e); process.exit(1) })
