import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, X } from "lucide-react";
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

const PROJECT_TYPES = [
  "Residential – Duplexes, villas, multi-story buildings",
  "Commercial – Hotels, offices, schools, rental/PG spaces",
  "Industrial – Warehouses, factories, industrial buildings",
  "Interior Design – Homes, commercial spaces, apartments",
];

const SUBCONTRACTOR_SCOPES = [
  "Civil Works",
  "Flooring & Finishing Works",
  "Painting & Surface Coatings",
  "Carpentry & Woodwork",
  "Other (Please Specify)",
];

const TYPICAL_SIZE_OPTIONS = [
  "Up to 5,000 sft",
  "5,000 – 25,000 sft",
  "25,000 – 1,00,000 sft",
  "1,00,000+ sft",
  "Other (free text)",
];

const BuilderContractConstruction = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"brief" | "form" | "done">("brief");
  const [companyName, setCompanyName] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [licenseRera, setLicenseRera] = useState("");
  const [address, setAddress] = useState("");
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [preferredLocation, setPreferredLocation] = useState("");
  const [projectsCompleted, setProjectsCompleted] = useState("");
  const [teamType, setTeamType] = useState<"in-house" | "subcontractors" | "">("");
  const [subcontractorScopes, setSubcontractorScopes] = useState<string[]>([]);
  const [subcontractorOther, setSubcontractorOther] = useState("");
  const [typicalSize, setTypicalSize] = useState("");
  const [typicalSizeOther, setTypicalSizeOther] = useState("");
  const [resBasic, setResBasic] = useState("");
  const [resStandard, setResStandard] = useState("");
  const [resLuxury, setResLuxury] = useState("");
  const [comBasic, setComBasic] = useState("");
  const [comStandard, setComStandard] = useState("");
  const [comLuxury, setComLuxury] = useState("");
  const [indBasic, setIndBasic] = useState("");
  const [indStandard, setIndStandard] = useState("");
  const [projectImages, setProjectImages] = useState<File[]>([]);
  const [projectDetails, setProjectDetails] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (projectImages.length + files.length <= 5) {
      setProjectImages([...projectImages, ...files]);
    } else {
      alert("Maximum 5 images allowed");
    }
  };

  const removeImage = (index: number) => {
    setProjectImages(projectImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Store form data in localStorage
    const formData = {
      type: "contract-construction",
      companyName,
      yearsExperience,
      licenseRera,
      address,
      projectTypes,
      preferredLocation,
      projectsCompleted,
      projectDetails,
      teamType,
      subcontractorScopes,
      subcontractorOther,
      typicalSize,
      typicalSizeOther,
      pricing: {
        residential: { basic: resBasic, standard: resStandard, luxury: resLuxury },
        commercial: { basic: comBasic, standard: comStandard, luxury: comLuxury },
        industrial: { basic: indBasic, standard: indStandard },
      },
      imageCount: projectImages.length,
      submittedAt: new Date().toISOString(),
    };
    
    const existingProfiles = JSON.parse(localStorage.getItem("builderProfiles") || "[]");
    existingProfiles.push(formData);
    localStorage.setItem("builderProfiles", JSON.stringify(existingProfiles));
    
    setStep("done");
  };

  const toggleProjectType = (t: string) => {
    setProjectTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };
  const toggleSubcontractorScope = (s: string) => {
    setSubcontractorScopes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Link
            to="/builder/options"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to options
          </Link>

          {step === "brief" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Contract construction</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Projects are executed under a clear legal contract defining scope, cost, timelines, and quality standards—ensuring smooth delivery and transparency.
                </p>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Contract Construction Workflow</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                    <li>Contract Finalization – Scope, cost, and timelines agreed.</li>
                    <li>Execution – Follow approved plans and standards.</li>
                    <li>Milestones – Progress in stages with clear payments.</li>
                    <li>Quality Check – Ensure compliance and standards.</li>
                    <li>Handover – Timely delivery with documented closure.</li>
                  </ul>
                </div>
              </div>
              <Button size="lg" onClick={() => setStep("form")}>
                Continue to form
              </Button>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Tell us about your company</h1>

              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Name of your construction company / sole proprietor?
                  </Label>
                  <Input
                    placeholder="Company or sole proprietor name (verified online where available)"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    How many years of company existence / if sole proprietor work experience?
                  </Label>
                  <Input
                    placeholder="Years (verified with online data if available)"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    If available, please provide your Builder/Contractor License (e.g., KPWD or equivalent) and any relevant approvals such as RERA registration
                  </Label>
                  <Input placeholder="License / RERA details" value={licenseRera} onChange={(e) => setLicenseRera(e.target.value)} />
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Please provide the registered office or physical address in Bangalore.
                  </Label>
                  <Input placeholder="Address (verified by name/address online)" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    What type of construction projects do you work on or specialize in? (Select all that apply)
                  </Label>
                  <div className="space-y-2">
                    {PROJECT_TYPES.map((t) => (
                      <div key={t} className="flex items-center space-x-2">
                        <Checkbox id={`pt-${t}`} checked={projectTypes.includes(t)} onCheckedChange={() => toggleProjectType(t)} />
                        <Label htmlFor={`pt-${t}`} className="font-normal cursor-pointer text-sm">{t}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">Preferred project location to work on?</Label>
                  <Input placeholder="Location (suggestions as you type)" value={preferredLocation} onChange={(e) => setPreferredLocation(e.target.value)} />
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    To help us understand your experience, please share the total number of projects you have completed along with details and images of your most recent projects. (5 pictures max)
                  </Label>
                  <Input 
                    placeholder="Total number of projects completed" 
                    value={projectsCompleted} 
                    onChange={(e) => setProjectsCompleted(e.target.value)}
                    className="mb-3"
                  />
                  <Textarea
                    placeholder="Brief details about your most recent projects..."
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    className="mb-3"
                  />
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Upload project images (up to 5)</Label>
                    <div className="flex flex-wrap gap-2">
                      {projectImages.map((img, idx) => (
                        <div key={idx} className="relative w-24 h-24 rounded-lg border border-border overflow-hidden group">
                          <img src={URL.createObjectURL(img)} alt={`Project ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {projectImages.length < 5 && (
                        <label className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                          <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                          <span className="text-xs text-muted-foreground">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{projectImages.length} / 5 images uploaded</p>
                  </div>
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Do you execute projects with an in-house team or engage subcontractors? If subcontractors, specify scope outsourced.
                  </Label>
                  <RadioGroup value={teamType} onValueChange={(v) => setTeamType(v as "in-house" | "subcontractors")} className="space-y-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-house" id="team-inhouse" />
                      <Label htmlFor="team-inhouse" className="font-normal cursor-pointer">In-house team</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="subcontractors" id="team-sub" />
                      <Label htmlFor="team-sub" className="font-normal cursor-pointer">Subcontractors</Label>
                    </div>
                  </RadioGroup>
                  {teamType === "subcontractors" && (
                    <div className="space-y-2 pl-4">
                      {SUBCONTRACTOR_SCOPES.filter((s) => s !== "Other (Please Specify)").map((s) => (
                        <div key={s} className="flex items-center space-x-2">
                          <Checkbox id={`sub-${s}`} checked={subcontractorScopes.includes(s)} onCheckedChange={() => toggleSubcontractorScope(s)} />
                          <Label htmlFor={`sub-${s}`} className="font-normal cursor-pointer text-sm">{s}</Label>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sub-other"
                          checked={subcontractorScopes.includes("Other (Please Specify)")}
                          onCheckedChange={() => toggleSubcontractorScope("Other (Please Specify)")}
                        />
                        <Label htmlFor="sub-other" className="font-normal cursor-pointer text-sm">Other</Label>
                      </div>
                      {subcontractorScopes.includes("Other (Please Specify)") && (
                        <Input placeholder="Specify" value={subcontractorOther} onChange={(e) => setSubcontractorOther(e.target.value)} className="mt-2" />
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Typical project size handled (built-up area)?
                  </Label>
                  <Select value={typicalSize} onValueChange={setTypicalSize}>
                    <SelectTrigger><SelectValue placeholder="Choose one" /></SelectTrigger>
                    <SelectContent>
                      {TYPICAL_SIZE_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {typicalSize === "Other (free text)" && (
                    <Input placeholder="Specify" value={typicalSizeOther} onChange={(e) => setTypicalSizeOther(e.target.value)} className="mt-2" />
                  )}
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Indicative pricing range (₹ per sft) for the types of construction you undertake. (Reference only.)
                  </Label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Residential</p>
                      <Input placeholder="Basic/Regular ₹/sft" value={resBasic} onChange={(e) => setResBasic(e.target.value)} />
                      <Input placeholder="Standard ₹/sft" value={resStandard} onChange={(e) => setResStandard(e.target.value)} />
                      <Input placeholder="Luxury ₹/sft" value={resLuxury} onChange={(e) => setResLuxury(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Commercial</p>
                      <Input placeholder="Basic/Regular ₹/sft" value={comBasic} onChange={(e) => setComBasic(e.target.value)} />
                      <Input placeholder="Standard ₹/sft" value={comStandard} onChange={(e) => setComStandard(e.target.value)} />
                      <Input placeholder="Luxury ₹/sft" value={comLuxury} onChange={(e) => setComLuxury(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Industrial</p>
                      <Input placeholder="Basic/Regular ₹/sft" value={indBasic} onChange={(e) => setIndBasic(e.target.value)} />
                      <Input placeholder="Standard ₹/sft" value={indStandard} onChange={(e) => setIndStandard(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("brief")}>Back</Button>
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!companyName.trim() || !yearsExperience.trim() || !address.trim() || projectTypes.length === 0}
                >
                  Submit
                </Button>
              </div>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Thank you</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-4">
                <p className="text-foreground leading-relaxed">
                  After collecting the required information, we assign a credibility score and align you with suitable landowners or property owners based on your location preferences, pricing range, and areas of expertise.
                </p>
                <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
                  <p className="text-sm font-medium text-primary">Profile submitted</p>
                  <p className="text-sm text-muted-foreground mt-1">We will match you with relevant projects.</p>
                </div>
              </div>
              <Button size="lg" onClick={() => navigate("/builder/dashboard")} className="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BuilderContractConstruction;
