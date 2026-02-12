import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Building2, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const CTASection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBuilderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/auth", { state: { userType: "builder" } });
    } else {
      navigate("/builder/options");
    }
  };

  const handleLandownerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/auth", { state: { userType: "landowner" } });
    } else {
      navigate("/landowner/options");
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      
      {/* Glow effects */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-glow-gradient blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-3xl"
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

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Ready to Build</span>
            <br />
            <span className="text-gradient-primary">With Confidence?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of landowners and builders who trust Jointlly for transparent, AI-powered real estate decisions.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          {/* Landowner Button */}
          <div onClick={handleLandownerClick} className="w-full md:w-auto block cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
              <div className="relative glass-card px-12 py-8 rounded-2xl flex items-center gap-6 border border-glass-border group-hover:border-primary/30 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-foreground">Landowner</h3>
                  <p className="text-sm text-muted-foreground">Property Owner</p>
                </div>
                <svg className="w-6 h-6 text-primary ml-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-20 bg-border" />
          <div className="block md:hidden h-px w-20 bg-border" />

          {/* Builder Button */}
          <div onClick={handleBuilderClick} className="w-full md:w-auto block cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-primary opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
              <div className="relative glass-card px-12 py-8 rounded-2xl flex items-center gap-6 border border-glass-border group-hover:border-accent/30 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-accent" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-foreground">Construction Company</h3>
                  <p className="text-sm text-muted-foreground">Builder</p>
                </div>
                <svg className="w-6 h-6 text-accent ml-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;
