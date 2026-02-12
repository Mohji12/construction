import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Hammer, Handshake, Palette, Wrench, Edit, Calendar, MapPin, Calculator, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const TYPE_ICONS = {
  "contract-construction": Hammer,
  "joint-venture": Handshake,
  "interior": Palette,
  "reconstruction": Wrench,
};

const TYPE_LABELS = {
  "contract-construction": "Contract Construction",
  "joint-venture": "Joint Venture / JD",
  "interior": "Interior Architecture",
  "reconstruction": "Reconstruction / Repair",
};

const TYPE_PATHS = {
  "contract-construction": "/landowner/contract-construction",
  "joint-venture": "/landowner/joint-venture",
  "interior": "/landowner/interior",
  "reconstruction": "/landowner/reconstruction",
};

const TYPE_COLORS = {
  "contract-construction": "bg-green-500",
  "joint-venture": "bg-green-600",
  "interior": "bg-green-500",
  "reconstruction": "bg-green-600",
};

const LandownerMyProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [propertyType, setPropertyType] = useState<string>("all");
  const [verified, setVerified] = useState<string>("all");

  useEffect(() => {
    const stored = localStorage.getItem("landownerProjects");
    if (stored) {
      const parsed = JSON.parse(stored);
      setProjects(parsed);
      setFilteredProjects(parsed);
    }
  }, []);

  useEffect(() => {
    let filtered = [...projects];
    
    if (propertyType !== "all") {
      filtered = filtered.filter(p => p.type === propertyType);
    }
    
    if (verified === "yes") {
      filtered = filtered.filter(p => p.pidValidation);
    } else if (verified === "no") {
      filtered = filtered.filter(p => !p.pidValidation);
    }
    
    setFilteredProjects(filtered);
  }, [propertyType, verified, projects]);

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Header */}
      <header className="bg-black text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-xl font-bold">Jointlly</Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/landowner/dashboard" className="text-sm font-medium hover:text-green-400 transition-colors">Dashboard</Link>
                <Link to="/landowner/my-projects" className="text-sm font-medium text-green-400">My Projects</Link>
                <Link to="/landowner/options" className="text-sm font-medium hover:text-green-400 transition-colors">New Request</Link>
              </nav>
            </div>
            <Link to="/landowner/dashboard">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-gray-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">My Projects</h1>
          <p className="text-gray-600">Your published requests and their status. Builders can view and respond to these.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-black mb-6">Filter</h2>
              
              <div className="space-y-6">
                {/* Property Type */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Property Type</label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="contract-construction">Contract Construction</SelectItem>
                      <SelectItem value="joint-venture">Joint Venture</SelectItem>
                      <SelectItem value="interior">Interior</SelectItem>
                      <SelectItem value="reconstruction">Reconstruction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Verified */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Verified</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="verified-yes" 
                        checked={verified === "yes"}
                        onCheckedChange={() => setVerified(verified === "yes" ? "all" : "yes")}
                      />
                      <label htmlFor="verified-yes" className="text-sm text-gray-600 cursor-pointer">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="verified-no" 
                        checked={verified === "no"}
                        onCheckedChange={() => setVerified(verified === "no" ? "all" : "no")}
                      />
                      <label htmlFor="verified-no" className="text-sm text-gray-600 cursor-pointer">No</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Projects Grid */}
          <div className="flex-1">
            {filteredProjects.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <p className="text-gray-600 mb-4">No projects found</p>
                <Link to="/landowner/options">
                  <Button className="bg-black text-white hover:bg-gray-800">
                    Create New Project
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => {
                  const Icon = TYPE_ICONS[project.type as keyof typeof TYPE_ICONS] || Hammer;
                  const label = TYPE_LABELS[project.type as keyof typeof TYPE_LABELS] || project.type;
                  const path = TYPE_PATHS[project.type as keyof typeof TYPE_PATHS] || "/landowner/dashboard";
                  const color = TYPE_COLORS[project.type as keyof typeof TYPE_COLORS] || "bg-green-500";
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow group"
                    >
                      {/* Project Image */}
                      <div className={`h-48 ${color} flex items-center justify-center relative`}>
                        <Icon className="w-16 h-16 text-white opacity-80" />
                        {project.pidValidation && (
                          <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                            Verified
                          </div>
                        )}
                      </div>
                      
                      {/* Project Details */}
                      <div className="p-5">
                        <h3 className="font-semibold text-black text-lg mb-2">{label}</h3>
                        
                        {project.propertyLocation && (
                          <div className="flex items-start gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-600">
                              {project.propertyLocation.city}, {project.propertyLocation.ward}
                            </p>
                          </div>
                        )}
                        
                        {project.propertyDetails && (
                          <div className="space-y-1 mb-4 text-xs text-gray-500">
                            <p><span className="font-medium">Size:</span> {project.propertyDetails.dimensions}</p>
                            <p><span className="font-medium">Facing:</span> {project.propertyDetails.facing}</p>
                            {project.far && (
                              <div className="flex items-center gap-1">
                                <Calculator className="w-3 h-3" />
                                <span><span className="font-medium">FAR:</span> {project.far}</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {project.submittedAt && (
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(project.submittedAt).toLocaleDateString()}</span>
                          </div>
                        )}
                        
                        <Link to={path}>
                          <Button variant="outline" className="w-full group-hover:bg-black group-hover:text-white transition-colors">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Project
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandownerMyProjects;
