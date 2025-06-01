import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Estimate", path: "/estimate" },
    { name: "Contact", path: "/contact" },
  ];

  const serviceItems = [
    { name: "Web Development", path: "/services/web-development", description: "Modern websites and web applications" },
    { name: "Mobile Apps", path: "/services/mobile-apps", description: "iOS and Android mobile applications" },
    { name: "UI/UX Design", path: "/services/ui-ux-design", description: "Beautiful and intuitive user interfaces" },
    { name: "API Development", path: "/services/api-development", description: "Robust backend APIs and services" },
    { name: "Consulting", path: "/services/consulting", description: "Technical guidance and support" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold gradient-text">
            Hire Moeed
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`relative text-sm font-medium transition-colors duration-200 hover:text-black ${
                location.pathname === "/"
                  ? "text-black"
                  : "text-gray-600"
              } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
            >
              Home
            </Link>
            
            {/* Services Dropdown - Second position */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-600 hover:text-black bg-transparent hover:bg-transparent">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      <Link
                        to="/services"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">All Services</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View all available services and packages
                        </p>
                      </Link>
                      {serviceItems.map((service) => (
                        <NavigationMenuLink key={service.name} asChild>
                          <Link
                            to={service.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{service.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Other nav items */}
            {navItems.slice(1).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-black ${
                  location.pathname === item.path
                    ? "text-black"
                    : "text-gray-600"
                } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              asChild 
              className="bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              <Link to="/estimate">Get Estimate</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <span
                className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "transform rotate-45 translate-y-2.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "transform -rotate-45 -translate-y-2.5" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4">
            <Link
              to="/"
              className={`block text-lg font-medium transition-colors duration-200 hover:text-black ${
                location.pathname === "/"
                  ? "text-black"
                  : "text-gray-600"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Services Menu */}
            <div className="space-y-2">
              <Link
                to="/services"
                className="block text-lg font-medium text-gray-600 hover:text-black transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <div className="pl-4 space-y-2">
                {serviceItems.map((service) => (
                  <Link
                    key={service.name}
                    to={service.path}
                    className="block text-sm text-gray-500 hover:text-black transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            {navItems.slice(1).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block text-lg font-medium transition-colors duration-200 hover:text-black ${
                  location.pathname === item.path
                    ? "text-black"
                    : "text-gray-600"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <Button 
              asChild 
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              <Link to="/estimate" onClick={() => setIsMobileMenuOpen(false)}>
                Get Estimate
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
