import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/image-removebg-preview.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Story", href: "/about#story" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Press Kit", href: "/press" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/legal/terms" },
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "LegalAID", href: "/legal/legal-aid" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Documentation", href: "/docs" },
        { label: "API Reference", href: "/api" },
        { label: "Community", href: "/community" },
        { label: "Partners", href: "/partners" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Support", href: "/contact" },
        { label: "Sales", href: "/contact?type=sales" },
        { label: "Feedback", href: "/contact?type=feedback" },
        { label: "Report Issue", href: "/contact?type=issue" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/company/jointlly", label: "LinkedIn" },
    { icon: Facebook, href: "https://facebook.com/jointlly", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/jointlly", label: "Instagram" },
  ];

  return (
    <footer 
      className="relative border-t border-white/20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/5" />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            
            <p className="text-sm text-white/90 mb-6 max-w-xs">
            The Validation Report is based on publicly available government records.<br></br>While
            Jointlly strives for accuracy, users are advised to conduct independent legal due diligence
            before entering into any binding agreements.
            </p>
            
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:contact@jointlly.com"
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>contact@jointlly.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-white/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Construction Ave, Building City, BC 12345</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="text-sm font-semibold text-white mb-4 font-heading">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors inline-block hover:translate-x-1 transition-transform"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-sm text-white/80 text-center md:text-left"
          >
            <p>© {currentYear} Jointlly. All rights reserved.</p>
            <p className="mt-1 text-xs text-white/70">
              Jointlly is a registered trademark. All product names, logos, and brands are property of their respective owners.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Legal Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-white/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-xs text-white/70">
            <Link to="/legal/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="hidden md:inline text-white/50">•</span>
            <Link to="/legal/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden md:inline text-white/50">•</span>
            <span>
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
