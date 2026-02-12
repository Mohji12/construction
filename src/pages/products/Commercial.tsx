import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Briefcase, GraduationCap, Users, ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import commercialVideo from "@/assets/commercial.mp4";

const Commercial = () => {
  const categories = [
    {
      icon: Briefcase,
      title: "Corporate Hubs",
      description: "Massive office towers and IT parks built to sustain the city's status as a global tech capital.",
    },
    {
      icon: GraduationCap,
      title: "Education & Hospitality",
      description: "Expansive school campuses and luxury hotels that require specialized layouts for high-volume traffic.",
    },
    {
      icon: Users,
      title: "Managed Living (PGs)",
      description: "Strategic, multi-story developments designed to house the city's massive influx of young professionals.",
    },
  ];

  const keyPoints = [
    "Large-scale buildings designed for business, education, and hospitality",
    "Must meet stricter safety and government regulations (like BBMP and fire safety codes)",
    "Designed to handle heavy daily use and high-volume traffic",
    "Built to generate professional revenue and serve the public",
    "Require specialized layouts and engineering for maximum utility",
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
                <span className="text-gradient-primary">Commercial</span>
                <br />
                <span className="text-foreground">Construction</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                High-capacity, income-driven assets that power business growth and recurring cash flows. 
                Built to meet the highest regulatory standards for safety and public use.
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
                  <source src={commercialVideo} type="video/mp4" />
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
              Commercial construction is the backbone of the economy, focusing on large-scale buildings designed for business, 
              education, and hospitality. Unlike smaller homes, these projects—ranging from Grade-A tech parks along the Outer Ring 
              Road to modern co-living PG hubs—must meet much stricter safety and government regulations (like BBMP and fire safety codes) 
              to handle heavy daily use.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Essentially, while residential building is about personal comfort, commercial construction is about building high-performance 
              infrastructure that serves the public and generates professional revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Business Breakdown */}
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
              <span className="text-gradient-primary">Business Breakdown</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To understand how this looks in our current real estate climate, we categorize these structures by their specific function
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{category.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features */}
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
              <span className="text-gradient-primary">Key Features</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {keyPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-glass-border"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-gradient-primary">Project Examples</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Multi-storey hotels with specialized layouts for high-volume traffic",
                "Corporate office towers and IT parks built for tech capital status",
                "School campuses requiring specialized educational infrastructure",
                "PG buildings designed to house young professionals efficiently",
              ].map((example, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5"
                >
                  <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">{example}</p>
                </div>
              ))}
            </div>
          </motion.div>
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
              Ready to Build Your Commercial Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Commercial construction drives growth by delivering high-capacity structures engineered for maximum business utility 
              while adhering to the highest regulatory standards for safety and public use.
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

export default Commercial;
