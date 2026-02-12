import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calculator, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROPERTY_DIMENSIONS = [
  "30×40",
  "20×30",
  "30×50",
  "20×40",
  "40×60",
  "50×60",
  "50×80",
  "Other (free text)",
];

const TIMELINE_OPTIONS = [
  "Within a month",
  "Within 3 months",
  "Within this year",
  "Exploring options",
];

const PROJECT_TYPES = {
  residential: ["Duplex house", "Villa", "Multi-storey structure", "Others (free text)"],
  commercial: ["Rental / PG", "Hotel", "Office space", "School", "Others (free text)"],
  industrial: ["Warehouse", "Factory", "Eccentric structure", "Others (free text)"],
};

const LandownerContractConstruction = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"brief" | "property" | "far" | "pid" | "intent" | "done">("brief");
  
  // Property Details
  const [landownerName, setLandownerName] = useState("");
  const [city, setCity] = useState("Bangalore");
  const [ward, setWard] = useState("");
  const [landmark, setLandmark] = useState("");
  const [googleMapsLocation, setGoogleMapsLocation] = useState("");
  const [propertyDimensions, setPropertyDimensions] = useState("");
  const [propertyDimensionsOther, setPropertyDimensionsOther] = useState("");
  const [propertyFacing, setPropertyFacing] = useState("");
  const [isCornerProperty, setIsCornerProperty] = useState(false);
  const [cornerFacings, setCornerFacings] = useState("");
  const [roadWidth, setRoadWidth] = useState("");
  
  // Project Intent
  const [timeline, setTimeline] = useState("");
  const [projectCategory, setProjectCategory] = useState<"residential" | "commercial" | "industrial">("residential");
  const [projectType, setProjectType] = useState("");
  const [projectTypeOther, setProjectTypeOther] = useState("");
  
  // PID Validation (Optional)
  const [pidNumber, setPidNumber] = useState("");
  const [wantPidValidation, setWantPidValidation] = useState(false);

  const calculateFAR = () => {
    // Simplified FAR calculation - in real app, this would use actual BBMP rules
    const roadWidthNum = parseFloat(roadWidth) || 0;
    let far = 1.5; // Base FAR
    
    if (roadWidthNum >= 40) far = 3.25;
    else if (roadWidthNum >= 30) far = 2.75;
    else if (roadWidthNum >= 20) far = 2.0;
    else if (roadWidthNum >= 12) far = 1.75;
    
    return far.toFixed(2);
  };

  const handleSubmit = () => {
    const formData = {
      type: "contract-construction",
      landownerName,
      propertyLocation: {
        city,
        ward,
        landmark,
        googleMapsLocation,
      },
      propertyDetails: {
        dimensions: propertyDimensions === "Other (free text)" ? propertyDimensionsOther : propertyDimensions,
        facing: propertyFacing,
        isCornerProperty,
        cornerFacings: isCornerProperty ? cornerFacings : "",
        roadWidth,
      },
      far: calculateFAR(),
      pidValidation: wantPidValidation ? { pidNumber, validated: false } : null,
      projectIntent: {
        timeline,
        category: projectCategory,
        type: projectType === "Others (free text)" ? projectTypeOther : projectType,
      },
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Contract Construction</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Contract construction means outsourcing the entire construction process to a professional external agency. 
                  The contractor signs a legal agreement and takes responsibility for execution, materials, approvals, quality, 
                  and timelines in exchange for an agreed-upon price.
                </p>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">What you'll provide:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                    <li>Property details and specifications</li>
                    <li>Free FAR calculation report</li>
                    <li>Optional property validation (PID)</li>
                    <li>Project intent and timeline</li>
                  </ul>
                </div>
              </div>
              <Button size="lg" onClick={() => setStep("property")} className="w-full sm:w-auto">
                Start - Property Details
              </Button>
            </motion.div>
          )}

          {step === "property" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Step 1: Property Details</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Name of landowner/property owner *
                  </Label>
                  <Input
                    placeholder="Your full name"
                    value={landownerName}
                    onChange={(e) => setLandownerName(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-2 block">Property Location *</Label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm text-muted-foreground mb-1 block">City</Label>
                        <Input value={city} disabled />
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground mb-1 block">Ward</Label>
                        <Input
                          placeholder="Ward number/name"
                          value={ward}
                          onChange={(e) => setWard(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-1 block">Nearby landmark</Label>
                      <Input
                        placeholder="e.g., Near Metro Station, Opposite Park"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-1 block">
                        Google Maps location & pin (Optional)
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
                  <Label className="text-base font-semibold mb-2 block">Property dimensions *</Label>
                  <Select value={propertyDimensions} onValueChange={setPropertyDimensions}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dimensions" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_DIMENSIONS.map((dim) => (
                        <SelectItem key={dim} value={dim}>{dim}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {propertyDimensions === "Other (free text)" && (
                    <Input
                      placeholder="Specify dimensions (e.g., 60×80)"
                      value={propertyDimensionsOther}
                      onChange={(e) => setPropertyDimensionsOther(e.target.value)}
                      className="mt-3"
                    />
                  )}
                </div>

                <div>
                  <Label className="text-base font-semibold mb-2 block">Property facing *</Label>
                  <Select value={propertyFacing} onValueChange={setPropertyFacing}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select facing direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="North">North</SelectItem>
                      <SelectItem value="South">South</SelectItem>
                      <SelectItem value="East">East</SelectItem>
                      <SelectItem value="West">West</SelectItem>
                      <SelectItem value="North-East">North-East</SelectItem>
                      <SelectItem value="North-West">North-West</SelectItem>
                      <SelectItem value="South-East">South-East</SelectItem>
                      <SelectItem value="South-West">South-West</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox
                      id="corner-property"
                      checked={isCornerProperty}
                      onCheckedChange={(checked) => setIsCornerProperty(checked as boolean)}
                    />
                    <Label htmlFor="corner-property" className="font-normal cursor-pointer">
                      Is this a corner property?
                    </Label>
                  </div>
                  {isCornerProperty && (
                    <Input
                      placeholder="Specify all facings (e.g., North & East)"
                      value={cornerFacings}
                      onChange={(e) => setCornerFacings(e.target.value)}
                      className="mt-2"
                    />
                  )}
                </div>

                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Road width in front of the property (feet) *
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter road width"
                    value={roadWidth}
                    onChange={(e) => setRoadWidth(e.target.value)}
                  />
                  {isCornerProperty && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Mention the widest road if corner plot
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Note: These inputs are used to calculate FAR/FSI.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("brief")}>Back</Button>
                <Button
                  size="lg"
                  onClick={() => setStep("far")}
                  disabled={!landownerName || !ward || !propertyDimensions || !propertyFacing || !roadWidth}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === "far" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Step 2: FAR & Zoning Intelligence
              </h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    What is FAR (Floor Area Ratio / FSI)?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    FAR is a zoning regulation in real estate and construction that determines the maximum buildable area 
                    relative to the plot size. In India, it is often called Floor Space Index (FSI) and varies by city, 
                    road width, and usage type.
                  </p>
                  <div className="bg-primary/5 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium mb-2">Calculation Formula:</p>
                    <p className="text-sm text-muted-foreground">FAR = Total built-up area of all floors ÷ Plot area</p>
                  </div>
                  <div className="bg-accent/5 rounded-lg p-4">
                    <p className="text-sm font-medium mb-2">Example:</p>
                    <p className="text-sm text-muted-foreground">
                      Plot size: 1,500 sq ft<br />
                      Total built-up area: 3,000 sq ft<br />
                      FAR = 3,000 ÷ 1,500 = 2.0
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      This means the building can cover twice the plot area across multiple floors.
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-3">Your Calculated FAR</h3>
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Property Dimensions</p>
                        <p className="text-lg font-semibold">
                          {propertyDimensions === "Other (free text)" ? propertyDimensionsOther : propertyDimensions}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Road Width</p>
                        <p className="text-lg font-semibold">{roadWidth} feet</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-muted-foreground">Calculated FAR</p>
                        <p className="text-3xl font-bold text-primary">{calculateFAR()}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Bengaluru FAR typically ranges from 1.5 to 3.25 for residential zones
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("property")}>Back</Button>
                <Button size="lg" onClick={() => setStep("pid")}>
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === "pid" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Step 3: Optional Property Validation
              </h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    PID Number Verification
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    PID Number Verification (BBMPTAX.KARNATAKA.GOV.IN) provides:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-4">
                    <li>Owner name (government verified)</li>
                    <li>Property location (Ward, Street ID, Plot No.)</li>
                    <li>Tax payment history (dues and receipts)</li>
                    <li>E-Khatha status/information</li>
                  </ul>
                  <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                    <p className="text-sm font-medium text-accent mb-1">Validation Fee: ₹1,999 – ₹2,999</p>
                    <p className="text-xs text-muted-foreground">Optional for Contract Construction</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox
                      id="want-pid"
                      checked={wantPidValidation}
                      onCheckedChange={(checked) => setWantPidValidation(checked as boolean)}
                    />
                    <Label htmlFor="want-pid" className="font-normal cursor-pointer">
                      I want to verify my property with PID Number
                    </Label>
                  </div>
                  {wantPidValidation && (
                    <div className="mt-3">
                      <Label className="text-sm text-muted-foreground mb-1 block">PID Number</Label>
                      <Input
                        placeholder="Enter your PID number"
                        value={pidNumber}
                        onChange={(e) => setPidNumber(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        You will be redirected to payment after submission
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("far")}>Back</Button>
                <Button size="lg" onClick={() => setStep("intent")}>
                  Continue to Project Intent
                </Button>
              </div>
            </motion.div>
          )}

          {step === "intent" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Step 4: Project Intent</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    What is your expected timeline to begin the work? *
                  </Label>
                  <RadioGroup value={timeline} onValueChange={setTimeline} className="space-y-2">
                    {TIMELINE_OPTIONS.map((opt) => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`timeline-${opt}`} />
                        <Label htmlFor={`timeline-${opt}`} className="font-normal cursor-pointer">
                          {opt}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    What type of project are you planning to build? *
                  </Label>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Category</Label>
                      <Select
                        value={projectCategory}
                        onValueChange={(v) => {
                          setProjectCategory(v as "residential" | "commercial" | "industrial");
                          setProjectType("");
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential Project</SelectItem>
                          <SelectItem value="commercial">Commercial Project</SelectItem>
                          <SelectItem value="industrial">Industrial Project</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Type</Label>
                      <Select value={projectType} onValueChange={setProjectType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROJECT_TYPES[projectCategory].map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {(projectType === "Others (free text)" || projectType?.toLowerCase().includes("other")) && (
                      <div>
                        <Label className="text-sm text-muted-foreground mb-2 block">Specify</Label>
                        <Input
                          placeholder="Describe your project type"
                          value={projectTypeOther}
                          onChange={(e) => setProjectTypeOther(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("pid")}>Back</Button>
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!timeline || !projectType}
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Request Published!</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-foreground font-medium">Your project has been published</p>
                    <p className="text-sm text-muted-foreground">Contractors can now discover and bid on your project</p>
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm font-medium text-primary mb-2">What happens next:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                    <li>Free FAR calculation report provided</li>
                    <li>Project published in the marketplace</li>
                    <li>Contractors can discover and bid on the project</li>
                    <li>You'll be notified when contractors respond</li>
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

export default LandownerContractConstruction;
