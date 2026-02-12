import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PROPERTY_TYPES = {
  residential: ["Duplex house", "Villa", "Flat", "Other (free text)"],
  commercial: ["Rental", "Hotels", "Office space", "Other (free text)"],
  industrial: ["Warehouse", "Factories", "Other (free text)"],
};

const SCOPE_OPTIONS = [
  "Repair work",
  "Add a new floor",
  "Repaint",
  "Redo of flooring",
  "Other (free text)",
];

const SCOPE_DETAILS = {
  "Repair work": "Kitchen plumbing or water leakage repairs, bathroom flooring replacement, electrical or fixture repairs",
  "Add a new floor": "Adding a new floor or room, full house repaint, structural modifications (walls, partitions)",
  "Repaint": "Interior painting (walls, ceilings), exterior painting, surface coatings, touch-ups",
  "Redo of flooring": "Flooring replacement, upgrades, or refurbishments",
};

const COMMENCE_OPTIONS = [
  "Within a month",
  "Within 3 months",
  "Within 6 months",
  "Just for research purpose",
];

const LandownerReconstruction = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"brief" | "form" | "done">("brief");
  const [propertyCategory, setPropertyCategory] = useState<"residential" | "commercial" | "industrial" | "other">("residential");
  const [propertyType, setPropertyType] = useState("");
  const [otherProperty, setOtherProperty] = useState("");
  const [location, setLocation] = useState("");
  const [googleMapsLocation, setGoogleMapsLocation] = useState("");
  const [scope, setScope] = useState<string[]>([]);
  const [scopeOther, setScopeOther] = useState("");
  const [commence, setCommence] = useState("");

  const types = propertyCategory === "other" ? ["Other (free text)"] : PROPERTY_TYPES[propertyCategory as keyof typeof PROPERTY_TYPES] || [];

  const toggleScope = (s: string) => {
    setScope((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const handleSubmit = () => {
    const formData = {
      type: "reconstruction",
      propertyType: {
        category: propertyCategory,
        type: propertyType === "Other (free text)" || propertyCategory === "other" ? otherProperty : propertyType,
      },
      location: {
        address: location,
        googleMapsLocation,
      },
      scopeOfWork: {
        selected: scope,
        other: scope.includes("Other (free text)") ? scopeOther : "",
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
                Reconstruction / Renovation
              </h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                Reconstruction includes renovations, repairs, extensions, repainting, flooring
                upgrades, or adding new floors to existing structures.


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
                Tell us about your property
              </h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    What type of property do you want to reconstruct?
                  </Label>
                  <div className="space-y-3">
                    <Select
                      value={propertyCategory}
                      onValueChange={(v) => {
                        setPropertyCategory(v as "residential" | "commercial" | "industrial" | "other");
                        setPropertyType("");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential building</SelectItem>
                        <SelectItem value="commercial">Commercial building</SelectItem>
                        <SelectItem value="industrial">Industrial building</SelectItem>
                        <SelectItem value="other">Any others (free text)</SelectItem>
                      </SelectContent>
                    </Select>
                    {propertyCategory !== "other" && (
                      <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {types.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {(propertyType === "Other (free text)" || propertyCategory === "other") && (
                      <Input
                        placeholder="Specify (free text)"
                        value={otherProperty}
                        onChange={(e) => setOtherProperty(e.target.value)}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">Location *</Label>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-1 block">Where is the property located?</Label>
                      <Input
                        placeholder="Address or area"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-1 block">
                        Google location pin (Optional)
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
                    How do you usually prefer your work type? (Select all that apply) *
                  </Label>
                  <div className="space-y-3">
                    {SCOPE_OPTIONS.filter((s) => s !== "Other (free text)").map((option) => (
                      <div key={option} className="space-y-1">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id={`scope-${option}`}
                            checked={scope.includes(option)}
                            onCheckedChange={() => toggleScope(option)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label htmlFor={`scope-${option}`} className="font-normal cursor-pointer">
                              {option}
                            </Label>
                            {SCOPE_DETAILS[option as keyof typeof SCOPE_DETAILS] && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {SCOPE_DETAILS[option as keyof typeof SCOPE_DETAILS]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="scope-other"
                        checked={scope.includes("Other (free text)")}
                        onCheckedChange={() => toggleScope("Other (free text)")}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor="scope-other" className="font-normal cursor-pointer">
                          Other / Custom Work
                        </Label>
                        {scope.includes("Other (free text)") && (
                          <Input
                            placeholder="Specify anything not covered above"
                            value={scopeOther}
                            onChange={(e) => setScopeOther(e.target.value)}
                            className="mt-2"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    You can select multiple options or provide your own details to help us understand the full scope of services you need.
                  </p>
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    When do you want to commence the work?
                  </Label>
                  <Select value={commence} onValueChange={setCommence}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
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
                    !propertyCategory ||
                    (propertyCategory !== "other" && !propertyType) ||
                    (propertyCategory === "other" && !otherProperty.trim()) ||
                    !location ||
                    scope.length === 0 ||
                    !commence ||
                    (scope.includes("Other (free text)") && !scopeOther.trim())
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
                    <p className="text-foreground font-medium">Your reconstruction project has been published</p>
                    <p className="text-sm text-muted-foreground">Reconstruction project published in marketplace</p>
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm font-medium text-primary mb-2">What happens next:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                    <li>Reconstruction project published in marketplace</li>
                    <li>Connected with relevant professionals based on scope and property type</li>
                    <li>You'll be notified when professionals respond</li>
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

export default LandownerReconstruction;
