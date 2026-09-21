// import fs from 'fs';
// import { geoContains } from 'd3-geo';

// const worldData = JSON.parse(fs.readFileSync('../data/world-ash-ms.json', 'utf8'));

// const DOT_COUNT = 150000;
// const validIndices = [];

// console.log("start");

// for (let i = DOT_COUNT; i >= 0; i--) {
//     const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
//     const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

//     const lat = 90 - (phi * 180) / Math.PI;
//     let lng = (theta * 180) / Math.PI;

//     lng = lng % 360;
//     if (lng > 180) lng -= 360;
//     else if (lng < -180) lng += 360;

//     if (geoContains(worldData, [lng, lat])) {
//         validIndices.push(i);
//     }
// }

// fs.writeFileSync('../src/validIndices.json', JSON.stringify(validIndices));
// console.log(`Done! Filtered ${DOT_COUNT} raycasts to exactly ${validIndices.length} valid landmass points.`);


import fs from "fs";
import sharp from "sharp";

const DOT_COUNT = 200000;
const LAND_THRESHOLD = 128; // adjust if needed
const MASK_PATH = "../data/landmask.jpg";
const OUTPUT_PATH = "../src/validPoints.json";

async function generateLandDots() {
  console.log("Loading land mask...");

  const { data, info } = await sharp(MASK_PATH)
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  console.log(`Mask Loaded: ${width}x${height}`);
  console.log("Generating land dots...");

  const validPoints = [];

  for (let i = 0; i <= DOT_COUNT; i++) {

    // Fibonacci sphere distribution
    const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
    const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

    // Convert to lat/lng
    const lat = 90 - (phi * 180) / Math.PI;
    let lng = (theta * 180) / Math.PI;

    // Normalize longitude
    lng = ((lng + 180) % 360) - 180;

    // Convert lat/lng → pixel
    const x = Math.floor(((lng + 180) / 360) * width);
    const y = Math.floor(((90 - lat) / 180) * height);

    const pixelIndex = (y * width + x) * 4;

    const red = data[pixelIndex]; // R channel

    // -----
    // IF LAND IS WHITE:
    // if (red > LAND_THRESHOLD)

    // IF LAND IS BLACK:
    if (red < LAND_THRESHOLD) {
      validPoints.push(i);
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(validPoints));

  console.log(
    `Done! ${validPoints.length} land points out of ${DOT_COUNT}`
  );
}

generateLandDots();