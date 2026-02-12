import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Hammer, Handshake, Palette, Wrench, Plus, TrendingUp, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickActions = [
  { path: "/landowner/contract-construction", label: "Contract construction", icon: Hammer, desc: "I need a professional team to construct.", color: "bg-green-500" },
  { path: "/landowner/joint-venture", label: "Joint venture / JD", icon: Handshake, desc: "Explore JV/JD opportunities.", color: "bg-green-600" },
  { path: "/landowner/interior", label: "Interior architecture", icon: Palette, desc: "Find an interior design professional.", color: "bg-green-500" },
  { path: "/landowner/reconstruction", label: "Reconstruction / Repair", icon: Wrench, desc: "Repairs or improvements to my space.", color: "bg-green-600" },
];

const LandownerDashboard = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("landownerProjects");
    if (stored) {
      setProjects(JSON.parse(stored));
    }
  }, []);

  const getProjectStatus = (type: string) => {
    return projects.some(p => p.type === type);
  };

  const stats = [
    { label: "Active Projects", value: projects.length, icon: FileText, color: "text-green-600" },
    { label: "Published", value: projects.length, icon: CheckCircle2, color: "text-green-500" },
    { label: "In Progress", value: 0, icon: TrendingUp, color: "text-green-600" },
  ];

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
                <Link to="/landowner/my-projects" className="text-sm font-medium hover:text-green-400 transition-colors">My Projects</Link>
                <Link to="/landowner/options" className="text-sm font-medium hover:text-green-400 transition-colors">New Request</Link>
              </nav>
            </div>
            <Link to="/landowner/options">
              <Button className="bg-white text-black hover:bg-gray-100 gap-2">
                <Plus className="w-4 h-4" />
                Post Listing
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your requests and projects. Create a new request or view published projects.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-2xl font-bold text-black">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Featured Projects Section */}
        {projects.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">Featured Projects</h2>
              <Link to="/landowner/my-projects" className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project, index) => {
                const action = quickActions.find(a => a.path.includes(project.type.replace("-", "-")));
                if (!action) return null;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                  >
                    {/* Project Image Placeholder */}
                    <div className={`h-48 ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-16 h-16 text-white opacity-80" />
                    </div>
                    
                    {/* Project Details */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-black text-lg">{action.label}</h3>
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      </div>
                      
                      {project.propertyLocation && (
                        <p className="text-sm text-gray-600 mb-3">
                          {project.propertyLocation.city}, {project.propertyLocation.ward}
                        </p>
                      )}
                      
                      {project.propertyDetails && (
                        <div className="space-y-1 mb-4">
                          <p className="text-xs text-gray-500">
                            <span className="font-medium">Size:</span> {project.propertyDetails.dimensions}
                          </p>
                          <p className="text-xs text-gray-500">
                            <span className="font-medium">Facing:</span> {project.propertyDetails.facing}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-sm font-medium text-black">View Details</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* New Request Section */}
        <section>
          <h2 className="text-2xl font-bold text-black mb-6">Create New Request</h2>
          <p className="text-gray-600 mb-6">Choose the type of request you want to create.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, i) => {
              const isCompleted = getProjectStatus(action.path.split("/").pop() || "");
              return (
                <Link key={action.path} to={action.path}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`bg-white border-2 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer ${
                      isCompleted ? "border-green-500" : "border-gray-200 hover:border-green-500"
                    }`}
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-black mb-2">{action.label}</h3>
                    <p className="text-sm text-gray-600 mb-4">{action.desc}</p>
                    {isCompleted && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completed</span>
                      </div>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandownerDashboard;
