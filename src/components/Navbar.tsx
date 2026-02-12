import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, UserPlus, LogOut, User } from "lucide-react";
import logo from "@/assets/image-removebg-preview.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="Jointlly" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent/10">
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium px-3 py-2">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/products/residential"
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">Residential</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Low-rise structures like villas and duplexes
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/products/commercial"
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">Commercial</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Office hubs, hotels, and rental complexes
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/products/industrial"
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">Industrial</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              High-performance structures for machinery
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/products/interior"
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">Interior</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Efficient and visually refined spaces
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent/10">
                    About Us
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent/10">
                    Contact Us
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/faq" className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent/10">
                    FAQ
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{user?.name || "User"}</span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/auth", { state: { userType: "builder" } })}
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/auth", { state: { userType: "builder" } })}
                    size="sm"
                    className="gap-2 btn-premium"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-foreground hover:bg-muted transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg md:hidden"
        >
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Products</div>
              <div className="pl-4 space-y-2">
                <Link
                  to="/products/residential"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-foreground hover:text-primary transition-colors"
                >
                  Residential
                </Link>
                <Link
                  to="/products/commercial"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-foreground hover:text-primary transition-colors"
                >
                  Commercial
                </Link>
                <Link
                  to="/products/industrial"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-foreground hover:text-primary transition-colors"
                >
                  Industrial
                </Link>
                <Link
                  to="/products/interior"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-foreground hover:text-primary transition-colors"
                >
                  Interior
                </Link>
              </div>
            </div>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/faq"
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              FAQ
            </Link>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-border space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 mb-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{user?.name || "User"}</span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      navigate("/auth", { state: { userType: "builder" } });
                      setIsOpen(false);
                    }}
                    variant="ghost"
                    size="sm"
                    className="w-full gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/auth", { state: { userType: "builder" } });
                      setIsOpen(false);
                    }}
                    size="sm"
                    className="w-full gap-2 btn-premium"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
