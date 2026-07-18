# iPhone 17 Pro Max — Luxury Digital Exhibition

An immersive, premium interactive digital exhibition for the **matte black iPhone 17 Pro Max**, designed to look and feel like a high-end product film combined with a luxury watch installation.

Live Demo: [http://localhost:3000](http://localhost:3000)

---

## ✦ The Concept & Quality Bar

This experience is built on the philosophy of a luxury digital exhibition rather than a standard landing page.

- **Atmosphere:** Inspired by Christopher Nolan sequences, luxury watch installations, and futuristic technology galleries.
- **Colorway:** Monochromatic theme leveraging deep space blacks, satin charcoals, titanium grays, and glowing blue intelligence highlights.
- **Typography:** Outfit & Playfair Display typography systems creating clean editorial structures.

---

## ✦ Key Features

### 1. High-Performance Canvas Scrollytelling
- **300-Frame Image Sequence:** Uses a custom, responsive 2D canvas player to draw high-fidelity, pre-rendered frames of the matte black iPhone in motion (rotation, exploded engineering views, lens separation).
- **Responsive Scaling:** Keeps the phone centered and scales dynamically (`cover` aspect ratio logic) across any viewport size.

### 2. Micro-Interactions & Floating Overlays
- **Detailed Glass Cards:** As you scroll through specific chapters (Material, Optics, Interface), floating glassmorphic information cards slide in with micro-annotations and high-res asset screenshots.
- **Chapter Markers:** Interactive side dot indicators mapping out the 8 narrative stages.

### 3. Procedural Audio Synth
- **Web Audio API Drone:** Synthesizes an ambient low-frequency drone (A1 bass note, detuned double oscillator, LFO filter breathing sweeps) on-the-fly inside the browser to avoid network asset delays.
- **Engagement Trigger:** Blocks page scroll during preloading and lets the user trigger the exhibition via an "Enter Exhibition" action, cleanly initializing the browser audio context.

---

## ✦ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Animations:** Framer Motion, CSS Variables
- **Rendering:** Responsive 2D Canvas (Drawing cached image frames)
- **Styling:** Tailwind CSS, PostCSS
- **Sound:** Web Audio API (Procedural synthesiser)

---

## ✦ Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Dhanushh2006/-iphone_17pro_max_interactive_exhibition.git
cd -iphone_17pro_max_interactive_exhibition
npm install --legacy-peer-deps
```

### 2. Development Server
Run the local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the exhibition.

### 3. Production Build
Build for production:
```bash
npm run build
```

---

## ✦ Deployment to Vercel

The repository is fully ready for zero-downtime deployment to Vercel. 

1. Push this codebase to your GitHub repository.
2. Link your repository in Vercel.
3. Vercel will auto-detect Next.js and build the application cleanly.
