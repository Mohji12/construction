import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, FileText } from "lucide-react";

const BuilderMatches = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Matches & <span className="text-gradient-primary">Opportunities</span>
            </h1>
            <p className="text-muted-foreground">
              Landowner requests that match your profile, location, and expertise. Submit your profile first to see relevant opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-2xl p-8 border border-glass-border text-center"
          >
            <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">No matches yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Once you submit at least one profile (Contract construction, JV/JD, Interior, or Reconstruction), we will show landowner requests that align with your capabilities and preferred locations.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/builder/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/builder/contract-construction"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                <FileText className="w-4 h-4" />
                Submit profile
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BuilderMatches;
