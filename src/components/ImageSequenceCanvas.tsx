"use client";

import { useEffect, useRef } from "react";

interface ImageSequenceCanvasProps {
  progress: number;
  preloadedImages: HTMLImageElement[];
}

export default function ImageSequenceCanvas({ progress, preloadedImages }: ImageSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || preloadedImages.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalFrames = preloadedImages.length;
    // Normalized scroll progress maps directly to the 300 frames of the video sequence
    const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * (totalFrames - 1)));
    const img = preloadedImages[frameIndex];

    if (!img) return;

    const drawFrame = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      // Draw centered image with "cover" layout
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;
      if (imgWidth === 0 || imgHeight === 0) return;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio < imgRatio) {
        // Canvas is narrower than the image
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        // Canvas is shorter than the image
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    if (img.complete) {
      drawFrame();
    } else {
      img.onload = drawFrame;
    }

    window.addEventListener("resize", drawFrame);
    return () => window.removeEventListener("resize", drawFrame);
  }, [progress, preloadedImages]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
