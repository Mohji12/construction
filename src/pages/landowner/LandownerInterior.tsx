import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const BUILDING_TYPES = [
  "Duplex house",
  "Flat",
  "Office space",
  "Commercial buildings",
  "Ongoing project",
  "Other (free text)",
];

const COMMENCE_OPTIONS = [
  "Within a month",
  "Within 3 months",
  "Within 6 months",
  "Just here for research",
];

const LandownerInterior = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"brief" | "form" | "done">("brief");
  const [buildingType, setBuildingType] = useState("");
  const [buildingTypeOther, setBuildingTypeOther] = useState("");
  const [location, setLocation] = useState("");
  const [googleMapsLocation, setGoogleMapsLocation] = useState("");
  const [isEndToEnd, setIsEndToEnd] = useState<"yes" | "no" | "">("");
  const [scopeExplain, setScopeExplain] = useState("");
  const [commence, setCommence] = useState("");

  const handleSubmit = () => {
    const formData = {
      type: "interior",
      buildingType: buildingType === "Other (free text)" ? buildingTypeOther : buildingType,
      location: {
        address: location,
        googleMapsLocation,
      },
      projectScope: {
        isEndToEnd: isEndToEnd === "yes",
        scopeExplain: isEndToEnd === "no" ? scopeExplain : "",
      },
      timeline: commence,
      submittedAt: new Date().toISOString(),
    };
    
    const existingProjects = JSON.parse(localStorage.getItem("landownerProjects") || "[]");
    existingProjects.push(formData);
    localStorage.setItem("landownerProjects", JSON.stringify(existingProjects));
    
    setStep("done");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Link
            to="/landowner/options"
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Interior Architecture / Designer
              </h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Interior architecture and design focus on planning, designing, and enhancing interior spaces to improve functionality, aesthetics, and comfort—covering layout planning, materials, finishes, and execution coordination.
                </p>
              </div>
              <Button size="lg" onClick={() => setStep("form")} className="w-full sm:w-auto">
                Continue
              </Button>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Tell us about your project
              </h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    What type of building are you looking to build or do interiors? *
                  </Label>
                  <Select value={buildingType} onValueChange={setBuildingType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUILDING_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {buildingType === "Other (free text)" && (
                    <Input
                      placeholder="Specify building type"
                      value={buildingTypeOther}
                      onChange={(e) => setBuildingTypeOther(e.target.value)}
                      className="mt-3"
                    />
                  )}
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">Location *</Label>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-1 block">Property location</Label>
                      <Input
                        placeholder="Address or area"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-1 block">
                        Google Maps location/pin (Optional)
                      </Label>
                      <Input
                        placeholder="Paste Google Maps link or coordinates"
                        value={googleMapsLocation}
                        onChange={(e) => setGoogleMapsLocation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Is this a complete new end-to-end interior project? *
                  </Label>
                  <RadioGroup value={isEndToEnd} onValueChange={(v) => setIsEndToEnd(v as "yes" | "no")} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="e2e-yes" />
                      <Label htmlFor="e2e-yes" className="font-normal cursor-pointer">Yes → Proceed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="e2e-no" />
                      <Label htmlFor="e2e-no" className="font-normal cursor-pointer">No → Explain the scope of work and specific needs</Label>
                    </div>
                  </RadioGroup>
                  {isEndToEnd === "no" && (
                    <div className="mt-3">
                      <Label className="text-sm text-muted-foreground mb-2 block">Explain the scope of work and specific needs</Label>
                      <Textarea
                        placeholder="Describe what you need"
                        value={scopeExplain}
                        onChange={(e) => setScopeExplain(e.target.value)}
                        rows={4}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    When do you want to commence the work? *
                  </Label>
                  <Select value={commence} onValueChange={setCommence}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMENCE_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("brief")}>Back</Button>
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={
                    !buildingType ||
                    !location ||
                    !isEndToEnd ||
                    !commence ||
                    (buildingType === "Other (free text)" && !buildingTypeOther.trim()) ||
                    (isEndToEnd === "no" && !scopeExplain.trim())
                  }
                >
                  Publish to Marketplace
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Project Published!</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-foreground font-medium">Your interior project has been published</p>
                    <p className="text-sm text-muted-foreground">Interior project published in marketplace</p>
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm font-medium text-primary mb-2">What happens next:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                    <li>Interior project published in marketplace</li>
                    <li>Matched with interior designers based on project type and requirements</li>
                    <li>You'll be notified when designers respond</li>
                  </ul>
                </div>
              </div>
              <Button size="lg" onClick={() => navigate("/landowner/dashboard")} className="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandownerInterior;
