import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
const PROJECT_TYPES = [
  "Residential – Duplex houses, villas, flats",
  "Commercial – Hotels, office spaces, schools, rental/PG",
  "Industrial – Warehouses, factories, industrial buildings",
];

const BuilderInterior = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"brief" | "form" | "done">("brief");
  const [companyName, setCompanyName] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [address, setAddress] = useState("");
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [price1200, setPrice1200] = useState("");
  const [price1500, setPrice1500] = useState("");
  const [price1800, setPrice1800] = useState("");
  const [priceOther, setPriceOther] = useState("");
  const [loc1, setLoc1] = useState("");
  const [rad1, setRad1] = useState("");
  const [loc2, setLoc2] = useState("");
  const [rad2, setRad2] = useState("");
  const [loc3, setLoc3] = useState("");
  const [rad3, setRad3] = useState("");

  const toggleType = (t: string) => {
    setProjectTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Link to="/builder/options" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to options
          </Link>

          {step === "brief" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Interior Architect / Designer</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Interior architecture and design involve planning and enhancing interior spaces to maximize functionality, aesthetics, and comfort. This includes layout planning, selection of materials and finishes, and coordination during execution, ensuring spaces are both beautiful and practical.
                </p>
              </div>
              <Button size="lg" onClick={() => setStep("form")}>Continue to form</Button>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Company & Project Details</h1>

              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <h3 className="text-lg font-semibold text-foreground">1. Company Details</h3>
                <div>
                  <Label className="mb-2 block">Name of your company or sole proprietorship</Label>
                  <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company name" />
                </div>
                <div>
                  <Label className="mb-2 block">How long has your company been in business, or your individual work experience?</Label>
                  <Input value={yearsExperience} onChange={(e) => setYearsExperience(e.target.value)} placeholder="Years" />
                </div>
                <div>
                  <Label className="mb-2 block">Office or physical address (optional Google Maps location)</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-6">2. Types of Projects</h3>
                <div>
                  <Label className="mb-2 block">Which types of projects do you typically undertake? (Select all that apply)</Label>
                  <div className="space-y-2">
                    {PROJECT_TYPES.map((t) => (
                      <div key={t} className="flex items-center space-x-2">
                        <Checkbox id={`int-${t}`} checked={projectTypes.includes(t)} onCheckedChange={() => toggleType(t)} />
                        <Label htmlFor={`int-${t}`} className="font-normal cursor-pointer text-sm">{t}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-6">3. Previous Project Experience</h3>
                <p className="text-sm text-muted-foreground">Details of your last 3 completed projects, with up to 2 images each (Location, Type, Built-up sft, Duration) – form/upload placeholder</p>
                <h3 className="text-lg font-semibold text-foreground mt-6">4. Tentative Pricing</h3>
                <p className="text-sm text-muted-foreground mb-2">Approximate starting price for reference only (complete set)</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-1 block text-sm">1200 sft flat – End-to-end interior (2 wooden cupboards, false ceiling, kitchen countertop)</Label>
                    <Input placeholder="₹" value={price1200} onChange={(e) => setPrice1200(e.target.value)} />
                  </div>
                  <div>
                    <Label className="mb-1 block text-sm">1500 sft Duplex – Living, bedrooms, kitchen (2 wardrobes, false ceiling, wardrobe units)</Label>
                    <Input placeholder="₹" value={price1500} onChange={(e) => setPrice1500(e.target.value)} />
                  </div>
                  <div>
                    <Label className="mb-1 block text-sm">1800 sft Commercial/office – Complete fit-out (false ceiling, reception desk, basic partitions)</Label>
                    <Input placeholder="₹" value={price1800} onChange={(e) => setPrice1800(e.target.value)} />
                  </div>
                  <div>
                    <Label className="mb-1 block text-sm">Other project types / notes</Label>
                    <Input placeholder="₹ or description" value={priceOther} onChange={(e) => setPriceOther(e.target.value)} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-6">5. Preferred Project Locations</h3>
                <p className="text-sm text-muted-foreground mb-2">Locations you are most comfortable working in (multiple areas with radius in km)</p>
                <div className="space-y-3">
                  <div className="flex gap-2 flex-wrap items-center">
                    <Input placeholder="Location 1" value={loc1} onChange={(e) => setLoc1(e.target.value)} className="flex-1 min-w-[120px]" />
                    <Input type="number" placeholder="Radius (km)" value={rad1} onChange={(e) => setRad1(e.target.value)} className="w-24" />
                  </div>
                  <div className="flex gap-2 flex-wrap items-center">
                    <Input placeholder="Location 2" value={loc2} onChange={(e) => setLoc2(e.target.value)} className="flex-1 min-w-[120px]" />
                    <Input type="number" placeholder="Radius (km)" value={rad2} onChange={(e) => setRad2(e.target.value)} className="w-24" />
                  </div>
                  <div className="flex gap-2 flex-wrap items-center">
                    <Input placeholder="Location 3" value={loc3} onChange={(e) => setLoc3(e.target.value)} className="flex-1 min-w-[120px]" />
                    <Input type="number" placeholder="Radius (km)" value={rad3} onChange={(e) => setRad3(e.target.value)} className="w-24" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("brief")}>Back</Button>
                <Button size="lg" onClick={() => setStep("done")} disabled={!companyName.trim() || !yearsExperience.trim() || projectTypes.length === 0}>
                  Submit
                </Button>
              </div>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Thank you</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-4">
                <p className="text-foreground leading-relaxed">
                  After collecting the required information, we assign a credibility score and align you with suitable landowners or property owners based on your location preferences, pricing range, and areas of expertise.
                </p>
                <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
                  <p className="text-sm font-medium text-primary">Profile submitted</p>
                </div>
              </div>
              <Button size="lg" onClick={() => navigate("/builder/dashboard")}>Go to Dashboard</Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BuilderInterior;
