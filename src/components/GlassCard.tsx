import { motion } from "framer-motion";
import { useState } from "react";

interface GlassCardProps {
  title: string;
  image: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const GlassCard = ({ title, image, index, isActive, onClick }: GlassCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      <motion.div
        className={`relative w-64 h-80 md:w-72 md:h-96 cursor-pointer preserve-3d ${isActive ? 'z-20' : 'z-10'}`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        animate={{
          rotateX: isHovered ? -5 : 0,
          rotateY: isHovered ? 5 : 0,
          scale: isActive ? 1.1 : isHovered ? 1.05 : 1,
          z: isActive ? 50 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glass card container */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden glass-card">
          {/* Image */}
          <div className="absolute inset-0">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          </div>

          {/* Glass reflection overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"
            animate={{
              opacity: isHovered ? 0.6 : 0.3,
            }}
          />

          {/* Glow effect on hover */}
          <motion.div
            className="absolute -inset-1 rounded-3xl"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.2))",
              filter: "blur(20px)",
              zIndex: -1,
            }}
            animate={{
              opacity: isHovered || isActive ? 0.8 : 0,
              scale: isHovered || isActive ? 1.05 : 1,
            }}
          />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl md:text-2xl font-semibold text-white">
              {title}
            </h3>
          </div>

          {/* Corner accent */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-lg" />
        </div>

        {/* Shadow layer */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-foreground/20 -z-10"
          animate={{
            y: isHovered ? 20 : 10,
            opacity: isHovered ? 0.3 : 0.15,
            scale: isHovered ? 0.95 : 0.98,
          }}
          style={{ filter: "blur(20px)" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default GlassCard;
