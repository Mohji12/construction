import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Hammer, Handshake, Palette, Wrench, Plus, TrendingUp, FileText, CheckCircle2, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickActions = [
  { path: "/builder/contract-construction", label: "Contract construction", icon: Hammer, desc: "Register or update your contract construction profile.", color: "bg-green-500" },
  { path: "/builder/joint-venture", label: "JV / JD developer", icon: Handshake, desc: "Register or update your JV/JD developer profile.", color: "bg-green-600" },
  { path: "/builder/interior", label: "Interior architect", icon: Palette, desc: "Register or update your interior design profile.", color: "bg-green-500" },
  { path: "/builder/reconstruction", label: "Reconstruction / Repair", icon: Wrench, desc: "Register or update your repair & painting profile.", color: "bg-green-600" },
];

const BuilderDashboard = () => {
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("builderProfiles");
    if (stored) {
      setProfiles(JSON.parse(stored));
    }
  }, []);

  const getProfileStatus = (type: string) => {
    return profiles.some(p => p.type === type);
  };

  const stats = [
    { label: "Active Profiles", value: profiles.length, icon: FileText, color: "text-green-600" },
    { label: "Published", value: profiles.length, icon: CheckCircle2, color: "text-green-500" },
    { label: "Matches", value: 0, icon: Users, color: "text-green-600" },
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
                <Link to="/builder/dashboard" className="text-sm font-medium hover:text-green-400 transition-colors">Dashboard</Link>
                <Link to="/builder/my-projects" className="text-sm font-medium hover:text-green-400 transition-colors">My Profiles</Link>
                <Link to="/builder/matches" className="text-sm font-medium hover:text-green-400 transition-colors">Matches</Link>
                <Link to="/builder/options" className="text-sm font-medium hover:text-green-400 transition-colors">New Profile</Link>
              </nav>
            </div>
            <Link to="/builder/options">
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
          <p className="text-gray-600">Manage your profiles and view matching opportunities. Update your capacity or browse landowner requests.</p>
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

        {/* Featured Profiles Section */}
        {profiles.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">Featured Profiles</h2>
              <Link to="/builder/my-projects" className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.slice(0, 6).map((profile, index) => {
                const action = quickActions.find(a => a.path.includes(profile.type.replace("-", "-")));
                if (!action) return null;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                  >
                    {/* Profile Image Placeholder */}
                    <div className={`h-48 ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-16 h-16 text-white opacity-80" />
                    </div>
                    
                    {/* Profile Details */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-black text-lg">{action.label}</h3>
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {profile.companyName}
                      </p>
                      
                      {profile.yearsExperience && (
                        <div className="space-y-1 mb-4">
                          <p className="text-xs text-gray-500">
                            <span className="font-medium">Experience:</span> {profile.yearsExperience} years
                          </p>
                          {profile.projectTypes && profile.projectTypes.length > 0 && (
                            <p className="text-xs text-gray-500">
                              <span className="font-medium">Types:</span> {profile.projectTypes.slice(0, 2).join(", ")}
                            </p>
                          )}
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

        {/* Register Profile Section */}
        <section>
          <h2 className="text-2xl font-bold text-black mb-6">Register or Update Profile</h2>
          <p className="text-gray-600 mb-6">Select your area of expertise to submit or update your details.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, i) => {
              const isCompleted = getProfileStatus(action.path.split("/").pop() || "");
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

export default BuilderDashboard;
