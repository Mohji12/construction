import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, TrendingUp, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import residentialVideo from "@/assets/residential.mp4";

const Residential = () => {
  const strategicBreakdown = [
    {
      icon: Home,
      title: "Private Estates (Villas)",
      description:
        "High-value, standalone structures focused on lifestyle amenities and private land ownership.",
    },
    {
      icon: TrendingUp,
      title: "Income-Generating Assets (Duplexes/Apartments)",
      description:
        "Multifunctional designs that allow owners to occupy one unit while leveraging the remaining units for cash flow.",
    },
    {
      icon: Building2,
      title: "Low-Rise Urban Density",
      description:
        "Scalable structures that maximize land utility without the complexity of high-rise engineering.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-green-50 to-teal-50/90" />
        <div className="absolute inset-0 jointlly-grid opacity-30" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-glow-gradient blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-gradient-primary">Residential</span>
                <br />
                <span className="text-foreground">Construction</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                Low-rise structures, typically two to three stories, designed for private ownership or investment—from villas to duplexes and low-rise apartments.
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
                  <source src={residentialVideo} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is Residential – Overview */}
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
              <span className="text-gradient-primary">What is Residential</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Residential construction focuses on the development of low-rise structures, typically two to three stories in height, designed for private ownership or investment. This category encompasses diverse housing models, including villas optimized for single-family privacy and multi-unit dwellings such as duplexes or low-rise apartments. These assets are strategically built to serve as primary residences or to generate consistent rental yields for the owner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Strategic Breakdown */}
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
              <span className="text-gradient-primary">Strategic Breakdown</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To align with a high-level business perspective, here is how we categorize these residential assets:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {strategicBreakdown.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Residential Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with verified builders and start your residential construction project with confidence.
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

export default Residential;
