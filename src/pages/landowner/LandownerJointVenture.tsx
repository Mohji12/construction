import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Calculator, Handshake, CheckCircle2, AlertCircle } from "lucide-react";
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

const POST_CONSTRUCTION_OPTIONS = [
  "Built-up area sharing",
  "Revenue sharing on the property",
];

const LandownerJointVenture = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"brief" | "verification" | "preferences" | "feasibility" | "visibility" | "done">("brief");
  
  // Property Verification (Mandatory)
  const [propertyOwnerName, setPropertyOwnerName] = useState("");
  const [googleMapsLocation, setGoogleMapsLocation] = useState("");
  const [propertyDimensions, setPropertyDimensions] = useState("");
  const [propertyDimensionsOther, setPropertyDimensionsOther] = useState("");
  const [propertyFacing, setPropertyFacing] = useState("");
  const [isCornerProperty, setIsCornerProperty] = useState(false);
  const [cornerFacings, setCornerFacings] = useState("");
  const [roadWidth, setRoadWidth] = useState("");
  const [khathaType, setKhathaType] = useState("");
  const [ekhathaStatus, setEkhathaStatus] = useState("");
  const [taxPaidDetails, setTaxPaidDetails] = useState("");
  const [pidNumber, setPidNumber] = useState("");
  
  // JV Preferences
  const [postConstructionExpectation, setPostConstructionExpectation] = useState<string[]>([]);
  const [hasPresetIdea, setHasPresetIdea] = useState<"yes" | "no" | "">("");
  const [presetIdeaExplain, setPresetIdeaExplain] = useState("");

  const togglePostConstruction = (option: string) => {
    setPostConstructionExpectation((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const calculateFAR = () => {
    const roadWidthNum = parseFloat(roadWidth) || 0;
    let far = 1.5;
    if (roadWidthNum >= 40) far = 3.25;
    else if (roadWidthNum >= 30) far = 2.75;
    else if (roadWidthNum >= 20) far = 2.0;
    else if (roadWidthNum >= 12) far = 1.75;
    return far.toFixed(2);
  };

  const calculateSetbacks = () => {
    if (!propertyDimensions || propertyDimensions === "Other (free text)") return null;
    
    const dims = propertyDimensions.split("×").map(d => parseFloat(d));
    if (dims.length !== 2) return null;
    
    const areaSqFt = dims[0] * dims[1];
    const areaSqM = areaSqFt / 10.764;
    
    let setbacks = {
      front: 0,
      rear: 0,
      sides: 0,
      category: "",
    };
    
    if (areaSqM <= 60) {
      setbacks = { front: 0.7, rear: 0, sides: 0.6, category: "Up to 60 sq m" };
    } else if (areaSqM <= 150) {
      setbacks = { front: 0.9, rear: 0.7, sides: 0.7, category: "60-150 sq m" };
    } else if (areaSqM <= 250) {
      setbacks = { front: 1.0, rear: 0.8, sides: 0.8, category: "150-250 sq m" };
    } else if (areaSqM <= 4000) {
      setbacks = { front: 0.12, rear: 0.08, sides: 0.08, category: "Above 250 sq m (percentage)" };
    } else {
      setbacks = { front: 5, rear: 5, sides: 5, category: "Above 4000 sq m" };
    }
    
    return setbacks;
  };

  const calculateFeasibility = () => {
    if (!propertyDimensions || propertyDimensions === "Other (free text)") return null;
    
    const dims = propertyDimensions.split("×").map(d => parseFloat(d));
    if (dims.length !== 2) return null;
    
    const plotArea = dims[0] * dims[1];
    const far = parseFloat(calculateFAR());
    const totalBuildableArea = plotArea * far;
    
    const setbacks = calculateSetbacks();
    if (!setbacks) return null;
    
    // Simplified calculation - in real app would use actual dimensions
    const netBuildableArea = plotArea * 0.75; // Approximate after setbacks
    
    return {
      plotArea,
      far,
      totalBuildableArea,
      netBuildableArea,
      setbacks,
      allowedFloors: "Stilt + 4",
      approximateUnits: Math.floor(totalBuildableArea / 800), // Approximate
    };
  };

  const handleSubmit = () => {
    const feasibility = calculateFeasibility();
    const formData = {
      type: "joint-venture",
      propertyOwnerName,
      propertyLocation: {
        googleMapsLocation,
      },
      propertyDetails: {
        dimensions: propertyDimensions === "Other (free text)" ? propertyDimensionsOther : propertyDimensions,
        facing: propertyFacing,
        isCornerProperty,
        cornerFacings: isCornerProperty ? cornerFacings : "",
        roadWidth,
        khathaType,
        ekhathaStatus,
        taxPaidDetails,
        pidNumber,
      },
      jvPreferences: {
        postConstructionExpectation,
        hasPresetIdea,
        presetIdeaExplain: hasPresetIdea === "yes" ? presetIdeaExplain : "",
      },
      feasibility: feasibility || {},
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Joint Venture / Joint Development (JV/JD)</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  A JV/JD is a structured partnership where a landowner and a developer collaborate to develop a property 
                  and share risks and returns under a formal agreement.
                </p>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Key Features:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                    <li>Landowner contributes the land</li>
                    <li>Developer bears project costs and execution risk</li>
                    <li>Developer manages design, approvals, and construction</li>
                    <li>Returns are shared through revenue share or built-up area allocation</li>
                    <li>Legal, architectural, and feasibility terms are defined upfront</li>
                    <li>Ideal for landowners seeking development without upfront capital</li>
                  </ul>
                </div>
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-accent mb-1">Important</p>
                      <p className="text-xs text-muted-foreground">
                        FAR + PID validation is compulsory for JV/JD projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="lg" onClick={() => setStep("verification")} className="w-full sm:w-auto">
                Start - Property Verification
              </Button>
            </motion.div>
          )}

          {step === "verification" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Step 1: Mandatory Property Verification</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <div className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-accent mb-1">Mandatory Information</p>
                      <p className="text-xs text-muted-foreground">
                        All fields below are required for JV/JD projects. PID validation is compulsory.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Name of property owner *
                  </Label>
                  <Input
                    placeholder="Your full name"
                    value={propertyOwnerName}
                    onChange={(e) => setPropertyOwnerName(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Exact location with Google Maps pin *
                  </Label>
                  <Input
                    placeholder="Paste Google Maps link or coordinates"
                    value={googleMapsLocation}
                    onChange={(e) => setGoogleMapsLocation(e.target.value)}
                  />
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
                  <Label className="text-base font-semibold mb-2 block">Road width (feet) *</Label>
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
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox
                      id="corner-property-jv"
                      checked={isCornerProperty}
                      onCheckedChange={(checked) => setIsCornerProperty(checked as boolean)}
                    />
                    <Label htmlFor="corner-property-jv" className="font-normal cursor-pointer">
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
                  <Label className="text-base font-semibold mb-2 block">Khatha type *</Label>
                  <Input
                    placeholder="e.g., A-Khatha, B-Khatha"
                    value={khathaType}
                    onChange={(e) => setKhathaType(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-2 block">E-Khatha status *</Label>
                  <Select value={ekhathaStatus} onValueChange={setEkhathaStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="In Process">In Process</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-2 block">Tax paid details *</Label>
                  <Textarea
                    placeholder="Provide details about tax payments"
                    value={taxPaidDetails}
                    onChange={(e) => setTaxPaidDetails(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    PID Number (mandatory) *
                  </Label>
                  <Input
                    placeholder="Enter your PID number"
                    value={pidNumber}
                    onChange={(e) => setPidNumber(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    PID validation fee: ₹1,999 – ₹2,999 (mandatory for JV/JD)
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("brief")}>Back</Button>
                <Button
                  size="lg"
                  onClick={() => setStep("preferences")}
                  disabled={
                    !propertyOwnerName ||
                    !googleMapsLocation ||
                    !propertyDimensions ||
                    !propertyFacing ||
                    !roadWidth ||
                    !khathaType ||
                    !ekhathaStatus ||
                    !taxPaidDetails ||
                    !pidNumber
                  }
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === "preferences" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Step 2: JV Preferences</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    What is the client (landowner) seeking for post-construction? *
                  </Label>
                  <div className="space-y-2">
                    {POST_CONSTRUCTION_OPTIONS.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`post-${option}`}
                          checked={postConstructionExpectation.includes(option)}
                          onCheckedChange={() => togglePostConstruction(option)}
                        />
                        <Label htmlFor={`post-${option}`} className="font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Do you have a preset idea of what to build? *
                  </Label>
                  <RadioGroup value={hasPresetIdea} onValueChange={(v) => setHasPresetIdea(v as "yes" | "no")} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="preset-yes" />
                      <Label htmlFor="preset-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="preset-no" />
                      <Label htmlFor="preset-no" className="font-normal cursor-pointer">
                        No → System suggests best-use options based on property information
                      </Label>
                    </div>
                  </RadioGroup>
                  {hasPresetIdea === "yes" && (
                    <div className="mt-3">
                      <Label className="text-sm text-muted-foreground mb-2 block">Explain your idea</Label>
                      <Textarea
                        placeholder="Describe what you want to build"
                        value={presetIdeaExplain}
                        onChange={(e) => setPresetIdeaExplain(e.target.value)}
                        rows={4}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("verification")}>Back</Button>
                <Button
                  size="lg"
                  onClick={() => setStep("feasibility")}
                  disabled={
                    postConstructionExpectation.length === 0 ||
                    !hasPresetIdea ||
                    (hasPresetIdea === "yes" && !presetIdeaExplain.trim())
                  }
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === "feasibility" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Step 3: FAR, Setbacks & Feasibility Logic
              </h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    BBMP Setback Rules (Jan 5, 2026)
                  </h3>
                  <div className="bg-primary/5 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium mb-2">Setback Rules:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Plots up to 60 sq m: Front 0.7m, Sides 0.6m each, Rear eliminated</li>
                      <li>Plots 60-150 sq m: Front 0.9m, Rear 0.7m, One side 0.7m</li>
                      <li>Plots 150-250 sq m: Front 1m, Rear 0.8m, Sides 0.8m each</li>
                      <li>Plots above 250 sq m: Setbacks linked to dimensions (12% front, 8% rear/sides)</li>
                      <li>Plots above 4000 sq m: Minimum 5m setback on all sides</li>
                    </ul>
                  </div>
                </div>

                {calculateFeasibility() && (
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold mb-4">Your Feasibility Calculation</h3>
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20 space-y-4">
                      {(() => {
                        const feasibility = calculateFeasibility();
                        if (!feasibility) return null;
                        const setbacks = feasibility.setbacks;
                        
                        return (
                          <>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Plot Area</p>
                                <p className="text-lg font-semibold">{feasibility.plotArea.toLocaleString()} sq ft</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">FAR</p>
                                <p className="text-lg font-semibold">{feasibility.far}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Total Buildable Area</p>
                                <p className="text-lg font-semibold">{Math.round(feasibility.totalBuildableArea).toLocaleString()} sq ft</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Net Buildable Area</p>
                                <p className="text-lg font-semibold">{Math.round(feasibility.netBuildableArea).toLocaleString()} sq ft</p>
                              </div>
                            </div>
                            <div className="border-t border-border/50 pt-4">
                              <p className="text-sm text-muted-foreground mb-2">Setbacks ({setbacks.category}):</p>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div>
                                  <span className="text-muted-foreground">Front:</span>{" "}
                                  <span className="font-medium">{setbacks.front}{setbacks.category.includes("percentage") ? "%" : "m"}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Rear:</span>{" "}
                                  <span className="font-medium">{setbacks.rear}{setbacks.category.includes("percentage") ? "%" : "m"}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Sides:</span>{" "}
                                  <span className="font-medium">{setbacks.sides}{setbacks.category.includes("percentage") ? "%" : "m"} each</span>
                                </div>
                              </div>
                            </div>
                            <div className="border-t border-border/50 pt-4">
                              <p className="text-sm text-muted-foreground mb-2">Development Potential:</p>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <span className="text-muted-foreground">Allowed Floors:</span>{" "}
                                  <span className="font-medium">{feasibility.allowedFloors}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Approximate Units:</span>{" "}
                                  <span className="font-medium">{feasibility.approximateUnits}</span>
                                </div>
                              </div>
                            </div>
                            {hasPresetIdea === "no" && (
                              <div className="border-t border-border/50 pt-4">
                                <p className="text-sm font-medium mb-2">Suggested Development Options:</p>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                  <li>Apartment: {feasibility.allowedFloors} with {feasibility.approximateUnits} units as per government norms</li>
                                  <li>Commercial complex: {feasibility.allowedFloors} for rental/co-working space</li>
                                </ul>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("preferences")}>Back</Button>
                <Button size="lg" onClick={() => setStep("visibility")}>
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === "visibility" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Step 4: Visibility & Monetization</h1>
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-glass-border space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Basic Metrics (Free)</h3>
                  <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                    {calculateFeasibility() && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">FAR</span>
                          <span className="text-sm font-medium">{calculateFAR()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Built-up Area</span>
                          <span className="text-sm font-medium">
                            {Math.round(calculateFeasibility()?.totalBuildableArea || 0).toLocaleString()} sq ft
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Saleable Area</span>
                          <span className="text-sm font-medium">
                            {Math.round(calculateFeasibility()?.netBuildableArea || 0).toLocaleString()} sq ft
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Approximate Location</span>
                          <span className="text-sm font-medium">{googleMapsLocation ? "✓ Provided" : "Not provided"}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Detailed Feasibility Report (Optional)</h3>
                  <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                    <p className="text-sm font-medium text-accent mb-2">Priority Listing & Unlock Fee</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Unlock detailed feasibility report with comprehensive analysis and priority listing in marketplace.
                    </p>
                    <p className="text-xs font-medium text-accent">₹999 – ₹3,999 (based on property scale)</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      This unlocks comprehensive insights to help construction firms determine the most profitable use for your property.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setStep("feasibility")}>Back</Button>
                <Button size="lg" onClick={handleSubmit}>
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
                    <p className="text-foreground font-medium">Your JV/JD request has been published</p>
                    <p className="text-sm text-muted-foreground">Property published with verified data</p>
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm font-medium text-primary mb-2">What happens next:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                    <li>Basic information visible to potential partners</li>
                    <li>Matched with suitable JV/JD developers based on preferences</li>
                    <li>You'll be notified when developers respond</li>
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

export default LandownerJointVenture;
