import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, MessageSquare, Globe, Linkedin, Twitter, Facebook, Instagram, Send, Building2, Users, Headphones } from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Drop us a line anytime",
      contact: "contact@jointlly.com",
      link: "mailto:contact@jointlly.com",
      color: "from-primary/20 to-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      contact: "+1 (234) 567-890",
      link: "tel:+1234567890",
      color: "from-accent/20 to-accent/10",
      iconColor: "text-accent",
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      description: "Come say hello",
      contact: "123 Construction Ave, Building City, BC 12345",
      link: "#",
      color: "from-primary/20 to-accent/20",
      iconColor: "text-primary",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with support",
      contact: "Available 24/7",
      link: "#",
      color: "from-accent/20 to-primary/20",
      iconColor: "text-accent",
    },
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/company/jointlly", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/jointlly", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com/jointlly", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/jointlly", label: "Instagram" },
  ];

  const departments = [
    {
      title: "General Inquiries",
      email: "info@jointlly.com",
      description: "Questions about our services",
    },
    {
      title: "Sales & Partnerships",
      email: "sales@jointlly.com",
      description: "Business opportunities",
    },
    {
      title: "Support",
      email: "support@jointlly.com",
      description: "Technical assistance",
    },
    {
      title: "Press & Media",
      email: "press@jointlly.com",
      description: "Media inquiries",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-green-50 to-teal-50/90" />
        <div className="absolute inset-0 jointlly-grid opacity-30" />
        
        {/* Glow effects */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-glow-gradient blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient-primary">Contact Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
              We're here to help! Reach out to us through any of the channels below, 
              and our team will get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Methods - Large Cards */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-green-50/60 to-teal-50/70" />
        <div className="absolute inset-0 jointlly-grid opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.title}
                  href={method.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${method.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                    <p className="text-base font-medium text-primary group-hover:text-accent transition-colors">
                      {method.contact}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Location & Business Hours */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-green-50/60 to-teal-50/70" />
        <div className="absolute inset-0 jointlly-grid opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Office Location */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Our Office</h2>
                  <p className="text-muted-foreground">Visit us at our headquarters</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      123 Construction Avenue<br />
                      Building City, BC 12345<br />
                      United States
                    </p>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="w-full h-64 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-glass-border flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                  <div className="relative z-10 text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2 opacity-50" />
                    <p className="text-sm text-muted-foreground">Interactive Map</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Map integration available</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold mb-3">Getting Here</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 5 minutes walk from Metro Station</li>
                    <li>• Parking available on-site</li>
                    <li>• Wheelchair accessible</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Business Hours & Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Business Hours */}
              <div className="glass-card p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Business Hours</h2>
                    <p className="text-muted-foreground">When we're available</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <div
                      key={schedule.day}
                      className="flex justify-between items-center py-3 border-b border-border/50 last:border-0"
                    >
                      <span className="text-foreground font-medium">{schedule.day}</span>
                      <span className="text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong className="text-foreground">Note:</strong> All times are in EST (Eastern Standard Time)
                  </p>
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="glass-card p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Quick Message</h3>
                    <p className="text-sm text-muted-foreground">Send us a quick note</p>
                  </div>
                </div>
                <a
                  href="mailto:contact@jointlly.com?subject=Quick Inquiry"
                  className="btn-premium w-full flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-green-50/60 to-teal-50/70" />
        <div className="absolute inset-0 jointlly-grid opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-primary">Department Contacts</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Reach out to the right team for faster assistance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <motion.a
                key={dept.title}
                href={`mailto:${dept.email}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{dept.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{dept.description}</p>
                <p className="text-sm font-medium text-primary group-hover:text-accent transition-colors break-all">
                  {dept.email}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media & Follow Us */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-green-50/60 to-teal-50/70" />
        <div className="absolute inset-0 jointlly-grid opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Follow Us</h2>
                <p className="text-muted-foreground">Stay connected on social media</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border border-glass-border hover:border-primary/30 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Join our community for updates, tips, and exclusive content
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-green-50/60 to-teal-50/70" />
        <div className="absolute inset-0 jointlly-grid opacity-40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20"
          >
            <Headphones className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with any questions or concerns. 
              Don't hesitate to reach out!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+1234567890"
                className="btn-premium flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href="mailto:contact@jointlly.com"
                className="btn-premium-outline flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
