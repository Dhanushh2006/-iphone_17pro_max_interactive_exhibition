"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageSequenceCanvas from "@/components/ImageSequenceCanvas";
import InteractiveUI from "@/components/InteractiveUI";
import AudioSystem from "@/components/AudioSystem";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>([]);
  const [entered, setEntered] = useState(false);

  // Preload all 300 image frames
  useEffect(() => {
    const totalFrames = 300;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Preload loop
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/assets/frames/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / totalFrames) * 100);
        setLoadProgress(pct);

        if (loadedCount === totalFrames) {
          setPreloadedImages(images);
          setLoading(false);
        }
      };

      img.onerror = () => {
        // Continue even if a frame fails
        loadedCount++;
        if (loadedCount === totalFrames) {
          setPreloadedImages(images);
          setLoading(false);
        }
      };

      images.push(img);
    }
  }, []);

  // Listen to scroll events once entered
  useEffect(() => {
    if (!entered) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const p = Math.min(1, Math.max(0, scrollY / maxScroll));
      setProgress(p);

      // Chapters mapped across scroll progress:
      // Ch 1: 0.0 - 0.125
      // Ch 2: 0.125 - 0.25
      // Ch 3: 0.25 - 0.375
      // Ch 4: 0.375 - 0.5
      // Ch 5: 0.5 - 0.625
      // Ch 6: 0.625 - 0.75
      // Ch 7: 0.75 - 0.875
      // Ch 8: 0.875 - 1.0
      const chapter = Math.min(8, Math.floor(p * 8) + 1);
      setActiveChapter(chapter);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [entered]);

  // Disable scroll when loading or before entering the exhibition
  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  return (
    <main className="relative w-full h-[800vh] bg-[#030303]">
      
      {/* Dynamic Exhibition Viewport */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden select-none">
        
        {/* Cinematic Film Grain Overlay */}
        <div 
          className="absolute inset-0 z-30 pointer-events-none opacity-[0.015] bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        {/* High-Performance responsive Image Sequence Canvas */}
        {entered && preloadedImages.length > 0 && (
          <ImageSequenceCanvas progress={progress} preloadedImages={preloadedImages} />
        )}

        {/* Floating Detail Overlay Cards (for macro inspection chapters) */}
        <AnimatePresence>
          {entered && activeChapter === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 50, filter: "blur(6px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute right-24 top-1/4 z-20 hidden md:flex flex-col p-6 rounded-2xl glass w-72 border border-white/10"
            >
              <img 
                src="/assets/iphone_titanium_edge.png" 
                alt="Titanium surface detail"
                className="w-full h-44 object-cover rounded-xl mb-4 border border-white/5"
              />
              <span className="text-[10px] tracking-[0.2em] text-white/40 mb-1">TITANIUM DETAIL</span>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Brushed micro-texture detail showing zero impurities. Specially treated with a protective physical vapor deposition coating.
              </p>
            </motion.div>
          )}

          {entered && activeChapter === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 50, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 50, filter: "blur(6px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute right-24 top-1/4 z-20 hidden md:flex flex-col p-6 rounded-2xl glass w-72 border border-white/10"
            >
              <img 
                src="/assets/iphone_camera_lens.png" 
                alt="Sapphire glass detail"
                className="w-full h-44 object-cover rounded-xl mb-4 border border-white/5"
              />
              <span className="text-[10px] tracking-[0.2em] text-white/40 mb-1">OPTICS DETAIL</span>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Multi-coated anti-reflective sapphire layers designed to guide focal rays directly onto the sub-pixel sensor grid.
              </p>
            </motion.div>
          )}

          {entered && activeChapter === 6 && (
            <motion.div
              initial={{ opacity: 0, x: 50, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 50, filter: "blur(6px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute right-24 top-1/4 z-20 hidden md:flex flex-col p-6 rounded-2xl glass w-72 border border-white/10"
            >
              <img 
                src="/assets/iphone_dynamic_island.png" 
                alt="Intelligence interface detail"
                className="w-full h-44 object-cover rounded-xl mb-4 border border-white/5"
              />
              <span className="text-[10px] tracking-[0.2em] text-white/40 mb-1">INTERFACE DETAIL</span>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Fluid, context-aware visual indicator layout adapting to active notifications and soundscapes on-the-fly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cinematic Chapter overlay titles and navigation */}
        {entered && progress > 0.005 && (
          <InteractiveUI progress={progress} activeChapter={activeChapter} />
        )}

        {/* Ambient Web Audio Synthesizer */}
        {entered && (
          <AudioSystem />
        )}
      </div>

      {/* Chapter Scroll Milestones */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <section className="h-screen w-full" />
        <section className="h-screen w-full" />
        <section className="h-screen w-full" />
        <section className="h-screen w-full" />
        <section className="h-screen w-full" />
        <section className="h-screen w-full" />
        <section className="h-screen w-full" />
        <section className="h-screen w-full" />
      </div>

      {/* Premium Loader & Exhibition Intro screen */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="preloader"
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-black p-12 text-center"
          >
            <div className="text-white/20 text-[10px] tracking-[0.4em] font-light mt-4">
               IPHONE 17 PRO MAX EXHIBITION
            </div>

            <div className="flex flex-col items-center justify-center">
              {loading ? (
                <div className="flex flex-col items-center">
                  {/* Digital clock-style thin loading number */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-7xl md:text-8xl font-thin tracking-widest text-white/90 font-sans"
                  >
                    {String(loadProgress).padStart(2, "0")}%
                  </motion.div>
                  <div className="text-white/30 text-[10px] tracking-[0.25em] font-light mt-4 uppercase">
                    Caching Cinematic Frames
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col items-center gap-4"
                >
                  <button
                    onClick={() => setEntered(true)}
                    className="px-10 py-4 rounded-full border border-white/20 bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-700 hover:bg-transparent hover:text-white hover:border-white/50 hover:scale-105"
                  >
                    ENTER EXHIBITION
                  </button>
                  <span className="text-[9px] tracking-[0.15em] text-white/40">
                    SOUND ON IS RECOMMENDED
                  </span>
                </motion.div>
              )}
            </div>

            <div className="text-white/20 text-[9px] tracking-[0.2em] font-light mb-4">
              DESIGNED BY APPLE CO. IN CALIFORNIA
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
