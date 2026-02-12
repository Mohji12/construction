import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import isometricCityGlobe from "@/assets/isometric+city+globe+3d+model.glb";
import ThreeDModelViewer from "./ThreeDModelViewer";

const MODEL_VIEWER_ID = "hero-3d-model";

const CONTENT_BY_CATEGORY = {
  residential: {
    heading: "Residential",
    content:
      "Residential construction focuses on developing low‑rise structures like villas and duplexes that are designed for both everyday living and wealth creation.",
  },
  commercial: {
    heading: "Commercial",
    content:
      "Commercial construction focuses on creating high‑capacity spaces like office hubs, hotels, and specialized rental complexes that serve businesses and communities.",
  },
  industrial: {
    heading: "Industrial",
    content:
      "In industrial construction, each structure is engineered as a high‑performance power shell that protects massive machinery and supports extreme operating conditions.",
  },
  interior: {
    heading: "Interior Architecture",
    content:
      "Interior Architecture is the strategic process of turning a building's internal volume into a space that is both operationally efficient and visually refined.",
  },
} as const;

type Category = keyof typeof CONTENT_BY_CATEGORY;

const CATEGORIES: Category[] = ["residential", "commercial", "industrial", "interior"];

const HeroSection = () => {
  const [category, setCategory] = useState<Category>("residential");

  // Sync content with 3D model rotation (model-viewer auto-rotates ~30s per 360°, ~7.5s per face)
  useEffect(() => {
    const interval = setInterval(() => {
      setCategory((prev) => CATEGORIES[(CATEGORIES.indexOf(prev) + 1) % 4]);
    }, 7500);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Light green gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-green-50/60 to-teal-50/70" />

      {/* Connected Nodes Grid System - Jointlly Brand Identity */}
      <div className="absolute inset-0 jointlly-grid opacity-40" />

      {/* Floating glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-glow-gradient blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{ background: "var(--gradient-accent-glow)" }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content — Proper 55/45 layout: text left, 3D model right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-20 xl:px-32">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-16">
          {/* Text Content - 55% width, left-aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-[55%] text-center lg:text-left flex flex-col justify-center"
          >
            {/* Jointlly intro — always shown first */}
            <div className="max-w-[600px] mx-auto lg:mx-0">
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-6">
                Jointlly: <span className="power-word">Transparent.</span> <span className="power-word">Trusted.</span> Real Estate.
              </h1>
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                Tired of opaque intermediaries, unverified partners, and hidden regulations in joint development or construction deals
              </p>
            </div>

            {/* Dynamic 3D model content — cycles with rotation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="max-w-[600px] mx-auto lg:mx-0"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mb-4">
                  {CONTENT_BY_CATEGORY[category].heading}
                </h2>
                <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
                  {CONTENT_BY_CATEGORY[category].content}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* 3D model — 45% width, right side, centered with content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end"
          >
            <div className="w-full max-w-[540px] lg:max-w-[600px] aspect-square relative lg:-translate-y-4">
              <ThreeDModelViewer
                id={MODEL_VIEWER_ID}
                src={isometricCityGlobe}
                alt="Isometric city globe 3D model"
                className="w-full h-full"
                transparent
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
