import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Palette, Layout, Zap, Layers, ArrowRight, CheckCircle2, Shield } from "lucide-react";
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

  const benefits = [
    "Transforms raw internal spaces into functional, high-value environments",
    "Balances technical structural needs with modern design aesthetics",
    "Optimizes spatial flow to maximize operational efficiency",
    "Selects materials that meet durability requirements and design philosophies",
    "Creates interiors that are both operationally efficient and aesthetically refined",
    "Enhances user experience through ergonomic and psychological comfort",
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Interior Architecture is the strategic process of transforming a building's internal volume into a functional, 
              high-value environment tailored to specific user needs. This discipline blends technical structural knowledge with 
              modern aesthetics to ensure that internal spaces are as operationally efficient as they are visually balanced.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Interior architecture transforms raw internal spaces into functional, high-value environments by balancing technical 
              structural needs with modern design. This discipline focuses on optimizing spatial flow and material selection to create 
              interiors that are both operationally efficient and aesthetically refined.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-primary">Core Pillars</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To understand the discipline from a results-oriented perspective, it is broken down into four core pillars
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

      {/* Key Components */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="text-gradient-primary">Key Components</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Spatial Flow Design",
                  description: "Maximizing every square foot for its intended purpose through strategic layout planning",
                },
                {
                  title: "System Integration",
                  description: "Seamlessly managing lighting, acoustics, and climate control within architectural constraints",
                },
                {
                  title: "Material Expertise",
                  description: "Selecting finishes and furnishings that balance durability with design aesthetics",
                },
                {
                  title: "User Experience Focus",
                  description: "Creating environments that enhance both physical comfort and psychological well-being",
                },
              ].map((component, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-glass-border"
                >
                  <h3 className="text-lg font-semibold mb-3">{component.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{component.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-primary">Key Benefits</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 flex items-start gap-4"
              >
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground leading-relaxed">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20"
          >
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Interior Space?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with expert interior architects who understand how to balance technical requirements with modern design 
              to create spaces that are both beautiful and functional.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/landowner" className="btn-premium flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-premium-outline flex items-center gap-2">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Interior;
