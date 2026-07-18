"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioSystem() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    lfo: OscillatorNode;
    filter: BiquadFilterNode;
    gain: GainNode;
  } | null>(null);

  const startSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      // Configure low ambient frequencies (A1 and slightly detuned)
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // 55Hz

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(55.4, ctx.currentTime); // detuned beating

      // LFO to slowly modulate filter cutoff for ambient breathing effect
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // very slow 0.08Hz
      lfoGain.gain.setValueAtTime(40, ctx.currentTime); // sweep range

      // Filter settings to keep it deep and warm
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(120, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      // Volume control (fade in)
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 3); // 3s fade in

      // Connections
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency); // modulate cutoff

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      // Start nodes
      osc1.start();
      osc2.start();
      lfo.start();

      synthNodesRef.current = { osc1, osc2, lfo, filter, gain };
      setIsPlaying(true);
    } catch (e) {
      console.error("Failed to start Web Audio Synthesizer:", e);
    }
  };

  const stopSynth = () => {
    const nodes = synthNodesRef.current;
    const ctx = audioCtxRef.current;
    if (nodes && ctx) {
      try {
        nodes.gain.gain.cancelScheduledValues(ctx.currentTime);
        nodes.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8); // fade out
        setTimeout(() => {
          try {
            nodes.osc1.stop();
            nodes.osc2.stop();
            nodes.lfo.stop();
            ctx.close();
          } catch (e) {}
          audioCtxRef.current = null;
          synthNodesRef.current = null;
        }, 800);
      } catch (e) {
        console.error(e);
      }
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        stopSynth();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:text-white hover:scale-105"
      aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
      id="audio-toggle-button"
    >
      {isPlaying ? (
        <Volume2 className="h-5 w-5 animate-pulse" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </button>
  );
}
