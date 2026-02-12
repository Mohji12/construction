import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Hammer,
  Handshake,
  Palette,
  Wrench,
  Home,
  Building2,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { path: "/builder/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/builder/my-projects", label: "My Projects", icon: FolderOpen },
  { path: "/builder/matches", label: "Matches & Opportunities", icon: Users },
];

const profileItems = [
  { path: "/builder/contract-construction", label: "Contract construction", icon: Hammer },
  { path: "/builder/joint-venture", label: "JV / JD developer", icon: Handshake },
  { path: "/builder/interior", label: "Interior architect", icon: Palette },
  { path: "/builder/reconstruction", label: "Reconstruction / Repair", icon: Wrench },
];

const BuilderLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path || (path !== "/builder/dashboard" && location.pathname.startsWith(path));
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Modern Sidebar */}
      <aside className="w-72 shrink-0 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/builder/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center group-hover:bg-green-700 transition-colors">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-black text-lg">Builder</div>
              <div className="text-xs text-gray-500">Construction Company</div>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <div className="mb-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
              Main
            </div>
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                    active
                      ? "bg-green-50 text-green-700 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-black"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 shrink-0", active ? "text-green-600" : "text-gray-500 group-hover:text-gray-700")} />
                  <span className="flex-1">{item.label}</span>
                  {active && <ChevronRight className="w-4 h-4 text-green-600" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
              Profiles
            </div>
            {profileItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                    active
                      ? "bg-green-50 text-green-700 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-black"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 shrink-0", active ? "text-green-600" : "text-gray-500 group-hover:text-gray-700")} />
                  <span className="flex-1">{item.label}</span>
                  {active && <ChevronRight className="w-4 h-4 text-green-600" />}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-all group"
          >
            <Home className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
            <span>Back to home</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all group"
          >
            <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-600" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Mobile header */}
        <header className="lg:hidden border-b border-gray-200 bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <Link to="/builder/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-black">Builder</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/builder/dashboard"
              className="text-sm text-gray-600 hover:text-black"
            >
              Dashboard
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default BuilderLayout;
