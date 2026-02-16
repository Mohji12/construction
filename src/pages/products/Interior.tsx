import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Palette, Layout, Zap, Layers, ArrowRight, CheckCircle2, Shield, AlertCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import interiorVideo from "@/assets/interior.mp4";

const Interior = () => {
  const pillars = [
    {
      icon: Layout,
      title: "Spatial Optimization",
      description: "Designing the 'flow' of a space to maximize every square foot for its intended purpose.",
    },
    {
      icon: Zap,
      title: "Technical Integration",
      description: "Managing internal systems such as lighting, acoustics, and climate control within the architectural layout.",
    },
    {
      icon: Layers,
      title: "Material Selection",
      description: "Specifying finishes and furnishings that meet durability requirements and design philosophies.",
    },
    {
      icon: Palette,
      title: "Human-Centric Design",
      description: "Prioritizing ergonomics and psychological comfort to enhance the user experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-green-50 to-teal-50/90" />
        <div className="absolute inset-0 jointlly-grid opacity-30" />
        
        {/* Glow effects */}
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-gradient-primary">Interior</span>
                <br />
                <span className="text-foreground">Architecture</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                Transform raw internal spaces into functional, high-value environments by balancing technical structural needs 
                with modern design. Create interiors that are both operationally efficient and aesthetically refined.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-premium inline-flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/landowner" className="btn-premium-outline inline-flex items-center justify-center gap-2">
                  Explore Options
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card rounded-3xl overflow-hidden aspect-video">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={interiorVideo} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-green-50/60 to-teal-50/70" />
        <div className="absolute inset-0 jointlly-grid opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-gradient-primary">Overview</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Interior Architecture is the strategic process of transforming a building's internal volume into a functional, 
              high-value environment tailored to specific user needs. This discipline blends technical structural knowledge with 
              modern aesthetics to ensure that internal spaces are as operationally efficient as they are visually balanced.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-green-50/60 to-teal-50/70" />
        <div className="absolute inset-0 jointlly-grid opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-primary">Key Components of Interior Architecture</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To understand the discipline from a results-oriented perspective, it is broken down into four core pillars:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Problem Context & Solution */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-green-50/60 to-teal-50/70" />
        <div className="absolute inset-0 jointlly-grid opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10 border-l-4 border-purple-500"
          >
            {/* Problem Context */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-7 h-7 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    Problem Context (Regulatory-Safe Framing)
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed ml-4 md:ml-6">
                Interior design selection is often influenced by brand visibility rather than suitability. Pricing opacity and limited exposure to independent designers reduce informed choice, though execution responsibility remains entirely with the contracting parties.
              </p>
            </div>

            {/* Jointlly's Solution */}
            <div className="pt-8 border-t border-purple-500/20">
              <h4 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                Jointlly's Role & Solution
              </h4>
              <p className="text-muted-foreground mb-4">
                Jointlly functions as a design discovery and comparison platform, helping owners explore a broader range of professionals and styles.
              </p>
              <p className="text-sm font-semibold text-foreground mb-3">The platform offers:</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Designer and architect profiles with declared specialization areas and portfolio references
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Indicative scope-based pricing ranges (non-binding, non-contractual) to aid expectation setting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Material and design preference visibility to support better alignment discussions
                  </span>
                </li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs text-muted-foreground mb-2">
                  <strong className="text-foreground">Jointlly does not:</strong>
                </p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">Fix prices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">Endorse design outcomes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">Procure materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">Manage execution or timelines</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  Final quotations, contracts, warranties, and site coordination are solely between the owner and the selected professional.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Interior;
