"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface InteractiveUIProps {
  activeChapter: number;
  progress: number;
}

const chaptersData = [
  {
    num: "01",
    title: "BIRTH FROM DARKNESS",
    tagline: "ANTICIPATION",
    desc: "Out of the void, light finds form. An organic contour of forged titanium emerges from silence, catching the glance of a moving studio arc.",
  },
  {
    num: "02",
    title: "MATERIAL SYNTHESIS",
    tagline: "MACHINED REFINE",
    desc: "Anodized brushed titanium frame, polished chamfered contours, and a fingerprint-resistant satin finish. Luxury that survives microscopic scrutiny.",
  },
  {
    num: "03",
    title: "CRAFTSMANSHIP WITHIN",
    tagline: "INTERNAL HARMONY",
    desc: "The chassis separates to reveal its organic machinery. The logic board, battery, and copper charging coils float in perfect geometric alignment.",
  },
  {
    num: "04",
    title: "A19 PRO SILICON",
    tagline: "3NM CORE ARCHITECTURE",
    desc: "The motherboard becomes a futuristic city. Streams of glowing data packets flow through logic gates, pulsing at the speed of intelligence.",
  },
  {
    num: "05",
    title: "OPTICAL INSTRUMENT",
    tagline: "LIGHT REFRACTION",
    desc: "Four custom sapphire glass lenses stack together, controlling chromatic aberrations and bending rays onto the multi-spectrum optical sensor.",
  },
  {
    num: "06",
    title: "APPLE INTELLIGENCE",
    tagline: "AESTHETIC MIND",
    desc: "Not a list of rules, but a fluid aura that adapts to your environment. Procedural interfaces that flow around the screen.",
  },
  {
    num: "07",
    title: "UNIFIED ECOSYSTEM",
    tagline: "ORGANIC CONNECTIONS",
    desc: "Resonating fields of data link your Macbook, iPad, and Apple Watch to the iPhone core. High-bandwidth communication without boundaries.",
  },
  {
    num: "08",
    title: "IPHONE 17 PRO MAX",
    tagline: "TOMORROW'S ARCHITECTURE",
    desc: "Reassembled. Complete. The definitive instrument of digital expression, forged in titanium.",
  },
];

export default function InteractiveUI({ activeChapter, progress }: InteractiveUIProps) {
  const currentChapter = chaptersData[activeChapter - 1] || chaptersData[0];

  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-16 pointer-events-none select-none">
      {/* 1. Header UI */}
      <header className="flex w-full justify-between items-center text-white/50 text-[10px] tracking-[0.25em] font-medium">
        <div className="flex items-center gap-3">
          <span className="text-white text-base"></span>
          <span className="hidden sm:inline">IPHONE 17 PRO MAX EXHIBITION</span>
        </div>
        <div>
          <span>CHAPTER {currentChapter.num} / 08</span>
        </div>
      </header>

      {/* 2. Side navigation indicator dots */}
      <div className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 pointer-events-auto">
        {chaptersData.map((ch, idx) => {
          const isActive = idx + 1 === activeChapter;
          return (
            <button
              key={ch.num}
              onClick={() => {
                const targetY = idx * window.innerHeight;
                window.scrollTo({ top: targetY, behavior: "smooth" });
              }}
              className="group relative flex items-center justify-center w-6 h-6 rounded-full"
              aria-label={`Go to chapter ${idx + 1}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  isActive ? "bg-white scale-150 shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white/20 group-hover:bg-white/50"
                }`}
              />
              <span className="absolute right-8 text-[10px] tracking-widest text-white/40 opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 whitespace-nowrap">
                {ch.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Text Overlay Content */}
      <main className="flex-1 flex flex-col justify-center max-w-xl text-left pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChapter}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">
              {currentChapter.tagline}
            </span>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-white leading-tight font-display">
              {currentChapter.title}
            </h1>
            <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed tracking-wide max-w-md">
              {currentChapter.desc}
            </p>
            
            {/* Show CTA on chapter 8 */}
            {activeChapter === 8 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-6 pointer-events-auto"
              >
                <button 
                  onClick={() => alert("Pre-orders open September 2026.")}
                  className="px-8 py-3 rounded-full border border-white/20 bg-white text-black font-semibold text-[10px] tracking-widest uppercase transition-all duration-500 hover:bg-transparent hover:text-white hover:border-white/50 hover:scale-105"
                >
                  Reserve Exhibition
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Footer scroll indicator */}
      <footer className="flex w-full justify-between items-center text-white/30 text-[9px] tracking-[0.2em] font-medium">
        <div>
          <span>© 2026 APPLE INC.</span>
        </div>
        {activeChapter < 8 && (
          <div className="flex items-center gap-1 animate-bounce">
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        )}
        {activeChapter === 8 && <div />}
        <div>
          <span>DESIGNED IN CALIFORNIA</span>
        </div>
      </footer>
    </div>
  );
}
