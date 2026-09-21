# 🌍 Interactive 3D Dot Globe

An interactive, high-performance 3D Earth visualization built with **React 19**, **Three.js**, **React Three Fiber (R3F)**, and **ThreeGlobe**.

Featuring custom Fibonacci landmass point sampling, instanced mesh rendering for thousands of twinkling dots, dynamic flight arcs connecting global metropolitan hubs, and interactive tactile drag physics.

---

## ✨ Features

- **🌐 Fibonacci Landmass Point Sampling**: Generates over 200,000 equidistant points on a sphere mapped against real-world Earth landmask raster data.
- **⚡ High-Performance Instanced Rendering**: Uses Three.js `InstancedMesh` to render tens of thousands of animated dots at 60+ FPS without bogging down the GPU.
- **✈️ Dynamic Animated Flight Arcs**: Real-time staggered flight paths between world cities (Nagpur, New York, Tokyo, Sydney, Dubai, São Paulo, and more) with auto-scaling altitudes.
- **📡 Synchronized Radar Rings & HTML Markers**: Pulsing beacon rings and styled HTML markers dynamically triggered whenever arc dashes reach their targets.
- **🕹️ Tactile Drag Physics & Pop-out Animations**: Smooth elevation displacement where land dots pop out in 3D waves upon user interaction and snap back smoothly when released.
- **✨ Organic Twinkling & Dynamic Lighting**: Individual dot scale/opacity oscillations and a directional light source tracking camera movement to maintain cinematic edge illumination.
- **🎨 Modern Glass & Deep-Space Aesthetic**: Framed against a panoramic night sky with custom opacity and specular material tuning.

---

## 🛠️ Tech Stack

### Core Framework & Build Tooling

| Technology                                                                      | Version   | Purpose                                                    |
| :------------------------------------------------------------------------------ | :-------- | :--------------------------------------------------------- |
| **[React](https://react.dev/)**                                                 | `^19.2.0` | UI architecture and component state management             |
| **[TypeScript](https://www.typescriptlang.org/)**                               | `~5.9.3`  | Type safety, matrix manipulation interfaces, and contracts |
| **[Vite](https://vite.dev/)**                                                   | `^7.3.1`  | Next-generation frontend bundler with lightning-fast HMR   |
| **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)** | `^4.2.2`  | Ultra-fast SWC compiler for React Fast Refresh             |

### 3D Graphics & Visualization

| Technology                                                   | Version    | Purpose                                                     |
| :----------------------------------------------------------- | :--------- | :---------------------------------------------------------- |
| **[Three.js](https://threejs.org/)**                         | `^0.183.1` | WebGL 3D scene graph, math primitives, and renderer         |
| **[@react-three/fiber](https://r3f.docs.pmnd.rs/)**          | `^9.5.0`   | Declarative Three.js scene management inside React          |
| **[@react-three/drei](https://github.com/pmndrs/drei)**      | `^10.7.7`  | Camera controls (`OrbitControls`) and R3F ecosystem helpers |
| **[three-globe](https://github.com/vasturiano/three-globe)** | `^2.45.0`  | Geo-projected spherical visualizations, arcs, and rings     |
| **[three-stdlib](https://github.com/pmndrs/three-stdlib)**   | `^2.36.1`  | Three.js shader and utility extensions                      |

### Geospatial Math & Offline Pipeline

| Technology                                    | Version     | Purpose                                                          |
| :-------------------------------------------- | :---------- | :--------------------------------------------------------------- |
| **[Sharp](https://sharp.pixelplumbing.com/)** | `^0.34.5`   | Fast Node.js image processing to sample Earth landmask rasters   |
| **[D3-Geo](https://d3js.org/d3-geo)**         | `^3.1.1`    | Spherical projections and spherical polygon contains tests       |
| **Fibonacci Sphere Distribution**             | Custom Math | Generates uniform dot distributions across spherical coordinates |

### Styling & Animation

| Technology                                   | Version   | Purpose                                                         |
| :------------------------------------------- | :-------- | :-------------------------------------------------------------- |
| **[Tailwind CSS](https://tailwindcss.com/)** | `^4.2.1`  | Modern zero-runtime CSS utility styling via `@tailwindcss/vite` |
| **[GSAP](https://gsap.com/)**                | `^3.14.2` | High-performance tweening and timing curves                     |

---

## 📁 Project Structure

```
globe/
├── data/
│   ├── landmask.jpg            # High-res equirectangular land-sea binary mask
│   └── world-ash-ms.json       # GeoJSON world topology dataset
├── scripts/
│   └── generate.js             # Land point extraction & Fibonacci sphere script
├── src/
│   ├── assets/                 # Static visual assets
│   ├── validPoints.json        # Precomputed valid landmass coordinate indices
│   ├── App.tsx                 # Fullscreen canvas host & starfield background
│   ├── Globe.tsx               # 3D Globe component, InstancedMesh, and animation loops
│   ├── index.css               # Global styling & Tailwind CSS imports
│   └── main.tsx                # React entry root
├── eslint.config.js            # ESLint flat config
├── package.json                # Project dependencies & scripts
├── tsconfig.json               # TypeScript configurations
└── vite.config.ts              # Vite plugins (React SWC + Tailwind v4)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm**, **pnpm**, or **bun**

### Installation

1. **Clone repository:**

   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## ⚙️ Available Scripts

| Command                    | Action                                                                      |
| :------------------------- | :-------------------------------------------------------------------------- |
| `npm run dev`              | Starts Vite local development server with Hot Module Replacement            |
| `npm run build`            | Type-checks via `tsc -b` and compiles optimized production build to `dist/` |
| `npm run preview`          | Locally serves the production build for testing                             |
| `npm run lint`             | Runs ESLint to check code quality and formatting                            |
| `node scripts/generate.js` | Re-generates `validPoints.json` by sampling `landmask.jpg`                  |

---

## 🧠 How It Works

1. **Fibonacci Distribution & Landmask Sampling**:
   - `scripts/generate.js` divides the sphere into 200,000 equidistant points using the Fibonacci golden spiral algorithm:
     $$\phi = \arccos\left(-1 + \frac{2i}{N}\right), \quad \theta = \sqrt{N\pi}\cdot \phi$$
   - Each spherical coordinate is mapped to $(x, y)$ pixel coordinates on an equirectangular land-sea mask (`landmask.jpg`). Only coordinates falling on land pixels are preserved and stored in `validPoints.json`.
2. **Instanced Mesh Rendering**:
   - `Globe.tsx` loads the precalculated points into a single `THREE.InstancedMesh` with a low-poly circle geometry.
   - Using instancing allows rendering thousands of distinct dots with individual scales, transforms, and colors in a single GPU draw call.
3. **Interactive Frame Loop**:
   - In `useFrame`, every dot is modulated by a sine wave for ambient twinkling and elevation displacement.
   - When the user clicks and drags the globe with `OrbitControls`, an interactive spring transitions the dots outward away from the globe surface.

---

## 🌐 Pushing to GitHub

If you are pushing this project to GitHub for the first time:

```bash
# 1. Initialize git repository
git init

# 2. Stage files (respecting .gitignore)
git add .

# 3. Create initial commit
git commit -m "feat: initial commit with interactive 3D dot globe"

# 4. Rename default branch to main
git branch -M main

# 5. Add your GitHub repository remote
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push your branch
git push -u origin main
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
# threejs-3D-globe
