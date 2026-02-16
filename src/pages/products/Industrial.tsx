import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Wrench, Zap, ArrowUp, ArrowRight, CheckCircle2, Shield, AlertCircle, DollarSign, Handshake, Hammer, XCircle } from "lucide-react";
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
              In industrial construction, the structure is engineered to prioritize strength over aesthetics. Unlike a house or an office, 
              an industrial building is essentially a high-performance "shell" designed to protect massive machinery and handle extreme physical stress.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Structural Components */}
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

      {/* Common Challenges Section */}
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
              <span className="text-gradient-primary">Common Challenges</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Property owners face significant hurdles when navigating industrial construction. Here are the most common scenarios and their challenges:
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Type 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10 border-l-4 border-orange-500"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-7 h-7 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    Type 1: Property Owner with Funds but No Construction Expertise
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    If someone owns land and has money to build but lacks construction know-how, options are limited and blind:
                  </p>
                </div>
              </div>
              <ul className="space-y-3 ml-4 md:ml-6">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Ask friends or family for referrals based on past experience, handing over the project without vetting the builder firsthand.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Walk into a nearby ongoing construction site with naive expectations.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Endlessly browse online portals and forums hunting for a trustworthy, experienced builder near their property.
                  </span>
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">The Reality:</strong> There are excellent small-scale or solo builders who deliver honest work with top-quality products and on-time completion at affordable prices—but online searches and social media spotlight only big companies, overshadowing these hidden gems.
                </p>
              </div>

              {/* Jointlly's Solution */}
              <div className="mt-8 pt-8 border-t border-orange-500/20">
                <h4 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  Jointlly's Role & Solution
                </h4>
                <p className="text-muted-foreground mb-4">
                  Jointlly functions as a decision-enablement and discovery platform, helping owners make more informed shortlisting decisions before engaging independently with any builder.
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">The platform provides:</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Structured profiles of builders and construction professionals, based on self-disclosed data, past work signals, and market-visible indicators
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Non-promotional comparisons across parameters such as project type experience, scale alignment, and indicative execution patterns
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Contextual information to help owners ask better technical and commercial questions during their own evaluation
                    </span>
                  </li>
                </ul>
                <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Important:</strong> Jointlly does not recommend, certify, appoint, or supervise builders. It does not validate execution quality or guarantee outcomes. Owners are advised to conduct independent technical, legal, and contractual due diligence before final engagement.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong className="text-foreground">Outcome:</strong> Reduced search opacity and improved decision clarity—without replacing the owner's responsibility or professional advisors.
                </p>
              </div>
            </motion.div>

            {/* Type 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10 border-l-4 border-blue-500"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Handshake className="w-7 h-7 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    Type 2: Property Owner Seeking Revenue via Joint Venture/Development (JV/JD)
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    For owners without full funds who want revenue or a higher-value constructed property through JV/JD, finding a reliable builder is a gamble:
                  </p>
                </div>
              </div>
              <ul className="space-y-3 ml-4 md:ml-6">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Rely on brokers or mediators (charging 2-3% commissions in Bangalore), where the landowner pays half (or full) upfront based on urgency—yet remains unsure about work quality, timelines, or key government laws. Brokers often push builders who pay them higher kickbacks, sidelining better-quality options that won't pay extra.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Cold-call builders online, who often lowball the property value with flimsy excuses, hide critical rules like FAR, height restrictions, setbacks, and bylaws (to tweak plans in their favor, risking deviations during Construction Certificate approval).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    No dedicated websites or apps exist just for JD/JV—online marketplaces focus only on buy/sell or rentals.
                  </span>
                </li>
              </ul>

              {/* Jointlly's Solution */}
              <div className="mt-8 pt-8 border-t border-blue-500/20">
                <h4 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  Jointlly's Role & Solution
                </h4>
                <p className="text-muted-foreground mb-4">
                  Jointlly acts as a neutral information and matching facilitator, enabling landowners to understand development possibilities and partner profiles before entering discussions.
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">The platform provides:</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Indicative regulatory context (such as FAR ranges, zoning references, and high-level planning constraints) sourced from publicly available government frameworks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Structured partner discovery based on stated development preferences, project scale alignment, and prior JV/JD participation signals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Comparable high-level deal structures (illustrative only) to improve conceptual understanding—not legal or financial advice
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
                      <span className="text-xs text-muted-foreground">Value land or projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">Advise on deal terms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">Negotiate, mediate, or conclude agreements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">Replace legal, financial, or planning consultants</span>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    All JV/JD decisions, valuations, approvals, and agreements must be independently assessed by qualified professionals.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong className="text-foreground">Outcome:</strong> Better-informed partner exploration with reduced dependence on opaque intermediaries—while preserving full owner control and accountability.
                </p>
              </div>
            </motion.div>

            {/* Type 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10 border-l-4 border-purple-500"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <Hammer className="w-7 h-7 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    Type 3: House/Flat Owner Needing Partial Reconstruction
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Renovating part of an existing house or flat often means settling for unvetted small-scale operators:
                  </p>
                </div>
              </div>
              <ul className="space-y-3 ml-4 md:ml-6">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Ask nearby under-construction workers, who may override engineers for quick cash—lacking real expertise in load-bearing beams/columns, they alter walls or add weight to slab roofs without support, causing major structural damage.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Turn to a "known circle" builder, who exploits the trust to charge inflated prices, hiking overall costs and leaving the owner at a loss.
                  </span>
                </li>
              </ul>

              {/* Jointlly's Solution */}
              <div className="mt-8 pt-8 border-t border-purple-500/20">
                <h4 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  Jointlly's Role & Solution
                </h4>
                <p className="text-muted-foreground mb-4">
                  Jointlly provides a discovery and filtering layer to help owners identify professionals whose declared experience aligns with the stated nature of work.
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">The platform enables:</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Categorized discovery of professionals based on renovation type (non-structural, interior-only, structural modification, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Experience indicators and scope disclosures shared by professionals to help owners assess relevance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Information prompts that encourage owners to seek structural engineers, approvals, and drawings where applicable
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
                      <span className="text-xs text-muted-foreground">Approve structural changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">Validate technical safety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">Replace engineers, architects, or statutory authorities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">Supervise on-site work</span>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    Owners remain fully responsible for ensuring compliance with building laws, society rules, and local authority approvals.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Industrial;
