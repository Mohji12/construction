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

const SUBCONTRACTOR_SCOPES = ["Civil Works", "Flooring Works", "Painting Works", "Carpentry & Woodwork", "Other (please specify)"];
const TYPICAL_SIZE_OPTIONS = ["Up to 5,000 sft", "5,000 – 25,000 sft", "25,000 – 1,00,000 sft", "1,00,000+ sft", "Other (please specify)"];
const PROJECT_SCALE_OPTIONS = [
  "Small-scale projects (up to ₹5 Cr)",
  "Medium-scale projects (₹5 – 20 Cr)",
  "Large-scale projects (₹20 – 50 Cr)",
  "Very large-scale projects (above ₹50 Cr)",
];
const TEAM_SIZE_OPTIONS = ["Small (1–20 members)", "Medium (21–50 members)", "Large (51–100 members)", "Very Large (100+ members)"];
const JV_ARRANGEMENT_OPTIONS = [
  "Revenue Sharing – Share rental income from the project with the landowner",
  "Built-up Area (SFT) Sharing – Allocate a pre-agreed portion of the constructed area to the landowner",
  "Sell and Share Entire Project – Sell the project and share the total proceeds with the landowner",
];

const BuilderJointVenture = () => {
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
  const [teamType, setTeamType] = useState<"in-house" | "subcontractors" | "">("");
  const [subcontractorScopes, setSubcontractorScopes] = useState<string[]>([]);
  const [typicalSize, setTypicalSize] = useState("");
  const [reraProjects, setReraProjects] = useState("");
  const [reraYesNo, setReraYesNo] = useState<"yes" | "no" | "">("");
  const [projectScale, setProjectScale] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [jvArrangements, setJvArrangements] = useState<string[]>([]);
  const [location1, setLocation1] = useState("");
  const [radius1, setRadius1] = useState("");
  const [location2, setLocation2] = useState("");
  const [radius2, setRadius2] = useState("");
  const [location3, setLocation3] = useState("");
  const [radius3, setRadius3] = useState("");

  const toggleProjectCap = (t: string) => {
    setProjectCaps((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };
  const toggleSub = (s: string) => {
    setSubcontractorScopes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };
  const toggleJv = (j: string) => {
    setJvArrangements((prev) => (prev.includes(j) ? prev.filter((x) => x !== j) : [...prev, j]));
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">JV / JD Development</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  A Joint Venture (JV) / Joint Development (JD) is a structured development model where the landowner contributes the land, and the developer manages project capital, statutory approvals, design, and construction. Project returns are shared through a predefined structure—typically revenue sharing or built-up area allocation—as outlined in the development agreement. This model allows developers to execute projects without upfront land acquisition while leveraging their financial strength and execution capability.
                </p>
              </div>
              <Button size="lg" onClick={() => setStep("form")}>Continue to form</Button>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Builder / Construction Company Information</h1>

              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Basic Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-2 block">Name of your construction company or sole proprietorship</Label>
                    <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company name" />
                  </div>
                  <div>
                    <Label className="mb-2 block">Number of years in operation or individual work experience</Label>
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
                <h3 className="text-lg font-semibold text-foreground mt-6">Licenses & Registrations (Optional)</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-2 block">Builder/Contractor License (e.g., KPWD) & RERA if applicable</Label>
                    <Input value={licenseRera} onChange={(e) => setLicenseRera(e.target.value)} placeholder="License / RERA" />
                  </div>
                  <div>
                    <Label className="mb-2 block">GST registration number</Label>
                    <Input value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} placeholder="GST number" />
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Registered office or physical address in Bangalore</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-6">Project Capabilities</h3>
                <div>
                  <Label className="mb-2 block">Types of projects you work on (Select all that apply)</Label>
                  <div className="space-y-2">
                    {PROJECT_CAPS.map((t) => (
                      <div key={t} className="flex items-center space-x-2">
                        <Checkbox id={`cap-${t}`} checked={projectCaps.includes(t)} onCheckedChange={() => toggleProjectCap(t)} />
                        <Label htmlFor={`cap-${t}`} className="font-normal cursor-pointer text-sm">{t}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Preferred project locations (areas where you prefer to take up projects)</Label>
                  <Textarea value={preferredLocations} onChange={(e) => setPreferredLocations(e.target.value)} placeholder="Areas" rows={2} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-6">Experience & Portfolio</h3>
                <div>
                  <Label className="mb-2 block">Total number of projects completed</Label>
                  <Input value={projectsCompleted} onChange={(e) => setProjectsCompleted(e.target.value)} placeholder="Number" />
                </div>
                <p className="text-sm text-muted-foreground">Brief details and images of your most recent projects (up to 5 images) – upload placeholder</p>
                <h3 className="text-lg font-semibold text-foreground mt-6">Execution Approach & Capacity</h3>
                <div>
                  <Label className="mb-2 block">Team structure: In-house team or subcontractors? If subcontractors, scope outsourced:</Label>
                  <RadioGroup value={teamType} onValueChange={(v) => setTeamType(v as "in-house" | "subcontractors")} className="space-y-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-house" id="jv-inhouse" />
                      <Label htmlFor="jv-inhouse" className="font-normal cursor-pointer">In-house</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="subcontractors" id="jv-sub" />
                      <Label htmlFor="jv-sub" className="font-normal cursor-pointer">Subcontractors</Label>
                    </div>
                  </RadioGroup>
                  {teamType === "subcontractors" && (
                    <div className="space-y-2 pl-4">
                      {SUBCONTRACTOR_SCOPES.map((s) => (
                        <div key={s} className="flex items-center space-x-2">
                          <Checkbox id={`jvsub-${s}`} checked={subcontractorScopes.includes(s)} onCheckedChange={() => toggleSub(s)} />
                          <Label htmlFor={`jvsub-${s}`} className="font-normal cursor-pointer text-sm">{s}</Label>
                        </div>
                      ))}
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
                </div>
                <div>
                  <Label className="mb-2 block">Have you commenced any RERA-registered projects?</Label>
                  <RadioGroup value={reraYesNo} onValueChange={(v) => setReraYesNo(v as "yes" | "no")} className="space-y-2 flex flex-row gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="rera-yes" />
                      <Label htmlFor="rera-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="rera-no" />
                      <Label htmlFor="rera-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                  {reraYesNo === "yes" && (
                    <Input className="mt-2" placeholder="How many?" value={reraProjects} onChange={(e) => setReraProjects(e.target.value)} />
                  )}
                </div>
                <div>
                  <Label className="mb-2 block">Typical size of projects you handle? (Reference only)</Label>
                  <Select value={projectScale} onValueChange={setProjectScale}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {PROJECT_SCALE_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground">Details and images for up to 3 of your most recently completed projects (name/location, built-up sft, type, duration, up to 2 images each) – form fields / upload placeholder</p>
                <div>
                  <Label className="mb-2 block">Which locations are you most comfortable undertaking a JV/JD project in? (Multiple areas with radius)</Label>
                  <div className="space-y-3">
                    <div className="flex gap-2 flex-wrap items-center">
                      <Input placeholder="Location 1" value={location1} onChange={(e) => setLocation1(e.target.value)} className="flex-1 min-w-[120px]" />
                      <Input type="number" placeholder="Radius (km)" value={radius1} onChange={(e) => setRadius1(e.target.value)} className="w-24" />
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                      <Input placeholder="Location 2" value={location2} onChange={(e) => setLocation2(e.target.value)} className="flex-1 min-w-[120px]" />
                      <Input type="number" placeholder="Radius (km)" value={radius2} onChange={(e) => setRadius2(e.target.value)} className="w-24" />
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                      <Input placeholder="Location 3" value={location3} onChange={(e) => setLocation3(e.target.value)} className="flex-1 min-w-[120px]" />
                      <Input type="number" placeholder="Radius (km)" value={radius3} onChange={(e) => setRadius3(e.target.value)} className="w-24" />
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">What size of team do you typically deploy for your projects?</Label>
                  <Select value={teamSize} onValueChange={setTeamSize}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {TEAM_SIZE_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2 block">Which type of arrangement do you usually follow in JV/JD projects? (Select all that apply)</Label>
                  <div className="space-y-2">
                    {JV_ARRANGEMENT_OPTIONS.map((j) => (
                      <div key={j} className="flex items-center space-x-2">
                        <Checkbox id={`jv-${j.slice(0, 20)}`} checked={jvArrangements.includes(j)} onCheckedChange={() => toggleJv(j)} />
                        <Label htmlFor={`jv-${j.slice(0, 20)}`} className="font-normal cursor-pointer text-sm">{j}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("brief")}>Back</Button>
                <Button size="lg" onClick={() => setStep("done")} disabled={!companyName.trim() || !yearsExperience.trim() || !address.trim() || projectCaps.length === 0}>
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

export default BuilderJointVenture;
