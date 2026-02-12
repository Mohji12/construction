import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Wrench, Zap, ArrowUp, ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import industrialVideo from "@/assets/industrial.mp4";

const Industrial = () => {
  const components = [
    {
      icon: Building2,
      title: "Reinforced Concrete Flooring",
      description: "The most critical part of the structure. It is significantly thicker than standard floors to support the weight of heavy machinery and the constant movement of forklifts without cracking.",
    },
    {
      icon: ArrowUp,
      title: "Large-Span Steel Frames",
      description: "We use heavy-grade steel beams to create wide, open interior spaces with minimal pillars. This allows for unobstructed assembly lines and massive storage racks.",
    },
    {
      icon: Zap,
      title: "High-Clearance Verticality",
      description: "Structures are built with extreme 'clear heights' (often 30 to 60 feet) to accommodate vertical racking systems and specialized overhead cranes.",
    },
    {
      icon: Wrench,
      title: "Specialized MEP Systems",
      description: "The 'veins' of the building—Mechanical, Electrical, and Plumbing—are often exposed and heavy-duty, designed to handle high-voltage power for machines and advanced ventilation for chemical or heat exhaust.",
    },
  ];

  const comparison = [
    { feature: "Foundation", industrial: "High-load reinforced slabs", residential: "Standard concrete footings" },
    { feature: "Interior", industrial: "Wide-open spans (Steel)", residential: "Partitioned rooms (Brick/Concrete)" },
    { feature: "Ceilings", industrial: "30ft+ (Functional)", residential: "10ft (Comfort-based)" },
    { feature: "Utility", industrial: "High-voltage / High-exhaust", residential: "Standard residential HVAC" },
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
                <span className="text-gradient-primary">Industrial</span>
                <br />
                <span className="text-foreground">Construction</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                Precision-engineered shells built for heavy-duty performance and massive scale. 
                Structures engineered to prioritize strength over aesthetics, designed to protect massive machinery and handle extreme physical stress.
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
                  <source src={industrialVideo} type="video/mp4" />
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
              In industrial construction, the structure is engineered to prioritize strength over aesthetics. Unlike a house or an office, 
              an industrial building is essentially a high-performance "shell" designed to protect massive machinery and handle extreme physical stress.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The structure of an industrial building is a precision-engineered shell built for heavy-duty performance and massive scale. 
              These facilities feature reinforced flooring, high-clearance ceilings, and wide-span steel frames to support complex machinery and seamless logistics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Structural Components */}
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
              <span className="text-gradient-primary">Key Structural Components</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The essential elements that make industrial buildings capable of handling extreme physical stress
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {components.map((component, index) => {
              const Icon = component.icon;
              return (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{component.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{component.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Structural Comparison */}
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
              <span className="text-gradient-primary">Structural Comparison</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                    <th className="text-left py-4 px-4 font-semibold text-primary">Industrial Structure</th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Residential Structure</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-primary">{row.industrial}</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.residential}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
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
              <span className="text-gradient-primary">Why Choose Industrial Construction?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Designed to protect massive machinery and handle extreme physical stress",
              "Wide-open interior spaces with minimal pillars for unobstructed assembly lines",
              "High-clearance ceilings (30-60 feet) for vertical racking systems and overhead cranes",
              "Heavy-duty MEP systems for high-voltage power and advanced ventilation",
              "Reinforced flooring that supports constant forklift movement without cracking",
              "Built for seamless logistics and complex machinery operations",
            ].map((benefit, index) => (
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
              Ready to Build Your Industrial Facility?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with specialized industrial construction experts who understand the unique requirements 
              of heavy-duty facilities and precision engineering.
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

export default Industrial;
