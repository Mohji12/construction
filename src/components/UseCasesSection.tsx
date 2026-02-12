import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import residentialVideo from "@/assets/residential.mp4";
import commercialVideo from "@/assets/commercial.mp4";
import industrialVideo from "@/assets/industrial.mp4";
import interiorVideo from "@/assets/interior.mp4";
import apartmentBuildingModel from "@/assets/apartment building 3d model.glb";
import ThreeDModelViewer from "./ThreeDModelViewer";

const useCases = [
  {
    id: "residential",
    title: "Residential Project",
    subtitle: "Duplex House",
    video: residentialVideo,
    icon: "🏠",
    position: "top-left" as const,
    tag: "Residential Construction",
    highlight: "Residential",
    rest: "construction done right",
    strapline: "Residential construction focuses on developing low‑rise structures like villas and duplexes that are designed for both everyday living and wealth creation.",
    body: "Residential construction focuses on developing low‑rise structures like villas and duplexes that are designed for both everyday living and wealth creation.",
    bullets: [
      "The Structure: Privately owned 2–3 storey structures like duplexes, villas, or low‑rise apartments where owners can live or rent.",
      "Examples: A duplex with separate units for rental income or a villa designed for family living with private gardens, strategically planned to maximize land utility.",
    ],
  },
  {
    id: "commercial",
    title: "Commercial Project",
    subtitle: "Multi-storey Office",
    video: commercialVideo,
    icon: "🏢",
    position: "top-right" as const,
    tag: "Commercial Construction",
    highlight: "Commercial",
    rest: "spaces that scale",
    strapline: "Commercial construction focuses on creating high‑capacity spaces like office hubs, hotels, and specialized rental complexes that serve businesses and communities.",
    body: "Commercial construction focuses on creating high‑capacity spaces like office hubs, hotels, and specialized rental complexes that serve businesses and communities.",
    bullets: [
      "The Structure: Expertly engineered non‑residential structures, typically larger and built to stricter regulations than residential projects.",
      "Examples: Multi‑storey hotels, corporate office towers, school campuses, or PG buildings—projects that maximize functional utility while meeting the highest safety and government standards.",
    ],
  },
  {
    id: "industrial",
    title: "Industrial Project",
    subtitle: "Modern Factory",
    video: industrialVideo,
    icon: "🏭",
    position: "bottom-left" as const,
    tag: "Industrial Construction",
    highlight: "Industrial",
    rest: "power shells for scale",
    strapline: "In industrial construction, each structure is engineered as a high‑performance power shell that protects massive machinery and supports extreme operating conditions.",
    body: "In industrial construction, each structure is engineered as a high‑performance power shell that protects massive machinery and supports extreme operating conditions.",
    bullets: [
      "The Structure: Reinforced foundations and massive steel frames built for high‑volume operations rather than appearance.",
      "Utility: Safely houses heavy machinery and handles the intense physical demands of large‑scale production and logistics.",
    ],
  },
  {
    id: "interior",
    title: "Interior Design",
    subtitle: "Luxury Residential",
    video: interiorVideo,
    icon: "✨",
    position: "bottom-right" as const,
    tag: "Interior Architecture / Designer",
    highlight: "Interior",
    rest: "architecture with intent",
    strapline: "Interior Architecture is the strategic process of turning a building's internal volume into a space that is both operationally efficient and visually refined.",
    body: "Interior Architecture is the strategic process of turning a building's internal volume into a space that is both operationally efficient and visually refined.",
    bullets: [
      "The Discipline: Blends structural knowledge with modern aesthetics so internal spaces function as smoothly as they look.",
      "Focus: Optimizes spatial flow, material selection, and detailing to create interiors that balance usability with design.",
    ],
  },
];

const UseCaseCard = ({
  useCase,
  index,
}: {
  useCase: (typeof useCases)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-50px" }}
    className="group w-full max-w-[240px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px] z-20"
  >
    <div className="glass-card rounded-2xl overflow-hidden relative">
      <div className="relative aspect-[3/2]">
        {"video" in useCase && useCase.video ? (
          <video
            src={useCase.video}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={"image" in useCase ? useCase.image : ""}
            alt={useCase.title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Hover overlay: one sentence */}
        <div className="absolute inset-0 bg-foreground/95 p-4 md:p-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm md:text-base text-white/95 text-center leading-relaxed">
            {useCase.strapline}
          </p>
        </div>
      </div>
      <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-white/40 rounded-tr-md" />
    </div>
  </motion.div>
);

const UseCasesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      {/* Header */}
      <motion.div
        className="relative z-10 text-center px-6 mb-8 md:mb-12"
        style={{ opacity }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span className="text-gradient-primary">One Platform,</span>
          <br />
          <span className="text-foreground">Every Project Type</span>
        </h2>
        <p className="text-base text-muted-foreground max-w-xl mx-auto">
          Explore residential, commercial, industrial, and interior projects—all from one place.
        </p>
      </motion.div>

      {/* Content area: 3x3 grid – four cards in corners, 3D in center with even gaps */}
      <div className="relative w-full max-w-5xl mx-auto flex-1 grid grid-cols-3 grid-rows-3 gap-0 sm:gap-1 md:gap-2 lg:gap-3 min-h-[480px] md:min-h-[560px] lg:min-h-[640px] px-4 items-center justify-items-center">
        {/* Top-left */}
        <div className="w-full h-full min-h-[140px] flex items-end justify-end pr-0">
          <UseCaseCard useCase={useCases[0]} index={0} />
        </div>
        <div className="w-full h-full min-h-[140px]" />
        {/* Top-right */}
        <div className="w-full h-full min-h-[140px] flex items-end justify-start pl-0">
          <UseCaseCard useCase={useCases[1]} index={1} />
        </div>

        <div className="w-full h-full" />
        {/* Center 3D – larger size, blended background */}
        <motion.div
          className="relative z-10 col-start-2 row-start-2 flex items-center justify-center w-full h-full"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-[280px] h-[200px] sm:w-[320px] sm:h-[220px] md:w-[380px] md:h-[260px] lg:w-[440px] lg:h-[300px] rounded-3xl overflow-hidden bg-background/30 backdrop-blur-md border border-white/10 shadow-2xl shadow-foreground/5">
            <ThreeDModelViewer
              src={apartmentBuildingModel}
              alt="Apartment building 3D model"
              className="w-full h-full"
            />
          </div>
        </motion.div>
        <div className="w-full h-full" />

        {/* Bottom-left */}
        <div className="w-full h-full min-h-[140px] flex items-start justify-end pr-0">
          <UseCaseCard useCase={useCases[2]} index={2} />
        </div>
        <div className="w-full h-full min-h-[140px]" />
        {/* Bottom-right */}
        <div className="w-full h-full min-h-[140px] flex items-start justify-start pl-0">
          <UseCaseCard useCase={useCases[3]} index={3} />
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
