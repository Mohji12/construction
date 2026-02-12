import { motion } from "framer-motion";
import residentialVideo from "@/assets/residential.mp4";
import commercialVideo from "@/assets/commercial.mp4";
import industrialVideo from "@/assets/industrial.mp4";
import interiorVideo from "@/assets/interior.mp4";

const sections = [
  {
    id: "residential",
    tag: "Residential Construction",
    video: residentialVideo,
    highlight: "Residential",
    rest: "construction done right",
    strapline:
      "Low-rise homes that balance personal living comfort with long‑term investment potential.",
    body: "Residential construction focuses on developing low‑rise structures like villas and duplexes that are designed for both everyday living and wealth creation.",
    bullets: [
      "The Structure: Privately owned 2–3 storey structures like duplexes, villas, or low‑rise apartments where owners can live or rent.",
      "Examples: A duplex with separate units for rental income or a villa designed for family living with private gardens, strategically planned to maximize land utility.",
    ],
  },
  {
    id: "commercial",
    tag: "Commercial Construction",
    video: commercialVideo,
    highlight: "Commercial",
    rest: "spaces that scale",
    strapline:
      "High‑capacity, income‑driven assets that power business growth and recurring cash flows.",
    body: "Commercial construction focuses on creating high‑capacity spaces like office hubs, hotels, and specialized rental complexes that serve businesses and communities.",
    bullets: [
      "The Structure: Expertly engineered non‑residential structures, typically larger and built to stricter regulations than residential projects.",
      "Examples: Multi‑storey hotels, corporate office towers, school campuses, or PG buildings—projects that maximize functional utility while meeting the highest safety and government standards.",
    ],
  },
  {
    id: "industrial",
    tag: "Industrial Construction",
    video: industrialVideo,
    highlight: "Industrial",
    rest: "power shells for scale",
    strapline:
      "Structures where strength, safety, and durability take precedence over aesthetics.",
    body: "In industrial construction, each structure is engineered as a high‑performance power shell that protects massive machinery and supports extreme operating conditions.",
    bullets: [
      "The Structure: Reinforced foundations and massive steel frames built for high‑volume operations rather than appearance.",
      "Utility: Safely houses heavy machinery and handles the intense physical demands of large‑scale production and logistics.",
    ],
  },
  {
    id: "interior",
    tag: "Interior Architecture / Designer",
    video: interiorVideo,
    highlight: "Interior",
    rest: "architecture with intent",
    strapline:
      "Transforming internal volume into functional, high‑value environments tailored to real users.",
    body: "Interior Architecture is the strategic process of turning a building’s internal volume into a space that is both operationally efficient and visually refined.",
    bullets: [
      "The Discipline: Blends structural knowledge with modern aesthetics so internal spaces function as smoothly as they look.",
      "Focus: Optimizes spatial flow, material selection, and detailing to create interiors that balance usability with design.",
    ],
  },
];

const StorytellingSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#f7fef9]">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section heading – big and centered like other sections */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">Problems we</span>
            <br />
            <span className="text-foreground">solve every day</span>
          </h2>
        </div>

        <div className="space-y-20 md:space-y-24">
          {sections.map((section, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={section.id} className="relative">
                {/* Per-block green half background */}
                <div
                  className={`absolute inset-y-[-32px] w-full md:w-1/2 bg-[#064e3b] rounded-[40px] md:rounded-[48px] ${
                    isEven ? "left-0" : "right-0"
                  }`}
                />

                <div className="relative grid gap-20 md:gap-32 lg:gap-40 xl:gap-48 md:grid-cols-2 items-stretch">
                  {/* Image side — video fills entire block with 1px padding on three sides */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.4 }}
                    className={`order-1 relative w-full min-h-[240px] md:min-h-0 md:h-full rounded-[40px] md:rounded-[48px] overflow-hidden ${isEven ? "md:order-1" : "md:order-2"}`}
                  >
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        paddingTop: 1,
                        paddingBottom: 1,
                        paddingLeft: isEven ? 1 : 0,
                        paddingRight: isEven ? 0 : 1,
                      }}
                    >
                      {"video" in section && section.video ? (
                        <video
                          src={section.video}
                          className="w-full h-full object-cover rounded-[38px] md:rounded-[46px]"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={(section as { image: string }).image}
                          alt={section.tag}
                          className="w-full h-full object-cover rounded-[38px] md:rounded-[46px]"
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Text side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    className={`order-2 ${isEven ? "md:order-2" : "md:order-1"}`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#059669]">
                      {section.tag}
                    </p>

                    <h3 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      <span className="text-[#059669]">{section.highlight}</span>{" "}
                      <span className="text-foreground">{section.rest}</span>
                    </h3>

                    <p className="mt-3 text-sm md:text-base font-semibold text-foreground">
                      {section.strapline}
                    </p>

                    <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                      {section.body}
                    </p>

                    <ul className="mt-5 space-y-2 text-sm md:text-base text-muted-foreground">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#059669]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StorytellingSection;
