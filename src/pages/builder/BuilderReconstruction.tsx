import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PROJECT_CAPS = [
  "Residential Construction – Duplexes, villas, multi-story buildings",
  "Commercial Construction – Hotels, offices, schools, rental/PG spaces",
  "Industrial Construction – Warehouses, factories, industrial buildings",
];

const SUBCONTRACTOR_SCOPES = [
  "Civil Works",
  "Flooring & Finishing Works",
  "Painting & Surface Coatings",
  "Carpentry & Woodwork",
  "Other (please specify)",
];

const TYPICAL_SIZE_OPTIONS = ["Up to 500 sft", "500 – 2,500 sft", "2,500 – 10,000 sft", "10,000+ sft", "Other (Free text)"];

const WORK_TYPE_OPTIONS = [
  "Major Reconstruction / Renovation: Adding a new floor or room, full house repaint, structural modifications (walls, partitions)",
  "Minor Repair & Maintenance: Kitchen plumbing or water leakage repairs, bathroom flooring replacement, electrical or fixture repairs",
  "Painting & Finishing Works: Interior painting (walls, ceilings), exterior painting, surface coatings, touch-ups",
  "Other / Custom Work",
];

const BuilderReconstruction = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"brief" | "form" | "done">("brief");
  const [companyName, setCompanyName] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [entityType, setEntityType] = useState("");
  const [licenseRera, setLicenseRera] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [projectCaps, setProjectCaps] = useState<string[]>([]);
  const [preferredLocations, setPreferredLocations] = useState("");
  const [projectsCompleted, setProjectsCompleted] = useState("");
  const [similarProjectsDesc, setSimilarProjectsDesc] = useState("");
  const [teamType, setTeamType] = useState<"in-house" | "subcontractors" | "">("");
  const [subcontractorScopes, setSubcontractorScopes] = useState<string[]>([]);
  const [subOther, setSubOther] = useState("");
  const [typicalSize, setTypicalSize] = useState("");
  const [typicalSizeOther, setTypicalSizeOther] = useState("");
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [workTypeOther, setWorkTypeOther] = useState("");
  const [pricingNote, setPricingNote] = useState("");

  const toggleCap = (t: string) => {
    setProjectCaps((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };
  const toggleSub = (s: string) => {
    setSubcontractorScopes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };
  const toggleWork = (w: string) => {
    setWorkTypes((prev) => (prev.includes(w) ? prev.filter((x) => x !== w) : [...prev, w]));
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Reconstruction / Repair / Painter</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Reconstruction includes work that involves repairing, renovating, or painting existing structures. It’s ideal for clients looking for maintenance, minor upgrades, or complete refurbishments.
                </p>
              </div>
              <Button size="lg" onClick={() => setStep("form")}>Continue to form</Button>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Company & Capabilities</h1>

              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <h3 className="text-lg font-semibold text-foreground">1. Basic Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-2 block">Name of your construction company or sole proprietorship</Label>
                    <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company name" />
                  </div>
                  <div>
                    <Label className="mb-2 block">How long has your company been in business, or your individual work experience?</Label>
                    <Input value={yearsExperience} onChange={(e) => setYearsExperience(e.target.value)} placeholder="Years" />
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Business entity type</Label>
                  <Select value={entityType} onValueChange={setEntityType}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Partnership">Partnership</SelectItem>
                      <SelectItem value="LLP">LLP</SelectItem>
                      <SelectItem value="Private Limited">Private Limited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground">Licenses & Registrations (optional): Builder/Contractor License (e.g., KPWD), RERA, GST number</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="License / RERA" value={licenseRera} onChange={(e) => setLicenseRera(e.target.value)} />
                  <Input placeholder="GST number" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
                </div>
                <div>
                  <Label className="mb-2 block">Registered office / physical address in Bangalore (optional Google Maps location)</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-6">2. Project Capabilities</h3>
                <div>
                  <Label className="mb-2 block">Which types of projects do you typically undertake? (Select all that apply)</Label>
                  <div className="space-y-2">
                    {PROJECT_CAPS.map((t) => (
                      <div key={t} className="flex items-center space-x-2">
                        <Checkbox id={`rec-cap-${t.slice(0, 15)}`} checked={projectCaps.includes(t)} onCheckedChange={() => toggleCap(t)} />
                        <Label htmlFor={`rec-cap-${t.slice(0, 15)}`} className="font-normal cursor-pointer text-sm">{t}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Preferred project locations (multiple areas with optional radius in km)</Label>
                  <Input value={preferredLocations} onChange={(e) => setPreferredLocations(e.target.value)} placeholder="Areas" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-6">3. Experience & Portfolio</h3>
                <div>
                  <Label className="mb-2 block">Total number of projects completed</Label>
                  <Input value={projectsCompleted} onChange={(e) => setProjectsCompleted(e.target.value)} placeholder="Number" />
                </div>
                <div>
                  <Label className="mb-2 block">Have you handled similar reconstruction or repair projects before? If yes, please briefly describe</Label>
                  <Textarea value={similarProjectsDesc} onChange={(e) => setSimilarProjectsDesc(e.target.value)} placeholder="Brief description" rows={3} />
                </div>
                <p className="text-sm text-muted-foreground">Brief details and images of your most recent projects (up to 5 images) – upload placeholder</p>
                <h3 className="text-lg font-semibold text-foreground mt-6">4. Execution Approach & Capacity</h3>
                <div>
                  <Label className="mb-2 block">Team structure: In-house team or subcontractors? If subcontractors, scope outsourced:</Label>
                  <RadioGroup value={teamType} onValueChange={(v) => setTeamType(v as "in-house" | "subcontractors")} className="space-y-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-house" id="rec-inhouse" />
                      <Label htmlFor="rec-inhouse" className="font-normal cursor-pointer">In-house</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="subcontractors" id="rec-sub" />
                      <Label htmlFor="rec-sub" className="font-normal cursor-pointer">Subcontractors</Label>
                    </div>
                  </RadioGroup>
                  {teamType === "subcontractors" && (
                    <div className="space-y-2 pl-4">
                      {SUBCONTRACTOR_SCOPES.map((s) => (
                        <div key={s} className="flex items-center space-x-2">
                          <Checkbox id={`recsub-${s.slice(0, 10)}`} checked={subcontractorScopes.includes(s)} onCheckedChange={() => toggleSub(s)} />
                          <Label htmlFor={`recsub-${s.slice(0, 10)}`} className="font-normal cursor-pointer text-sm">{s}</Label>
                        </div>
                      ))}
                      {subcontractorScopes.includes("Other (please specify)") && (
                        <Input placeholder="Specify" value={subOther} onChange={(e) => setSubOther(e.target.value)} className="mt-2" />
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <Label className="mb-2 block">Typical project size handled</Label>
                  <Select value={typicalSize} onValueChange={setTypicalSize}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {TYPICAL_SIZE_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {typicalSize === "Other (Free text)" && (
                    <Input placeholder="Specify" value={typicalSizeOther} onChange={(e) => setTypicalSizeOther(e.target.value)} className="mt-2" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-6">5. Work Type Preferences</h3>
                <p className="text-sm text-muted-foreground mb-2">How do you usually prefer your work type? (Select all that apply)</p>
                <div className="space-y-2">
                  {WORK_TYPE_OPTIONS.map((w) => (
                    <div key={w} className="flex items-center space-x-2">
                      <Checkbox id={`work-${w.slice(0, 15)}`} checked={workTypes.includes(w)} onCheckedChange={() => toggleWork(w)} />
                      <Label htmlFor={`work-${w.slice(0, 15)}`} className="font-normal cursor-pointer text-sm">{w}</Label>
                    </div>
                  ))}
                  {workTypes.includes("Other / Custom Work") && (
                    <Input placeholder="Specify" value={workTypeOther} onChange={(e) => setWorkTypeOther(e.target.value)} className="mt-2 ml-6" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-6">6. Tentative Pricing</h3>
                <p className="text-sm text-muted-foreground mb-2">Approximate pricing range for typical projects (reference only – per sft or total project)</p>
                <Textarea value={pricingNote} onChange={(e) => setPricingNote(e.target.value)} placeholder="e.g. ₹/sft or total project range" rows={2} />
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("brief")}>Back</Button>
                <Button size="lg" onClick={() => setStep("done")} disabled={!companyName.trim() || !yearsExperience.trim() || projectCaps.length === 0}>
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

export default BuilderReconstruction;
