/*
 * Contact Section — Swiss Dark Editorial
 * Clean contact layout with GitHub, Telegram, Email icons
 * Section counter "06 / Contact"
 */

import { useRef, useEffect } from "react";
import { Github, Mail, Send, Linkedin, Twitter, MapPin } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

type ContactLinkData = {
  iconName: string;
  label: string;
  value: string;
  href: string;
  description: string;
  color: string;
};

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Mail, Github, Send, Linkedin, Twitter,
};

export default function Contact() {
  const data = usePortfolioData();
  const rawLinks: ContactLinkData[] = data.contact_links || [];
  const contactLinks = rawLinks.map((link) => ({
    ...link,
    icon: ICON_MAP[link.iconName] || Mail,
  }));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#0F1117" }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(10,191,188,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="reveal mb-12 text-center">
          <div className="section-label justify-center mb-3">06 / Contact</div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let's Work Together
          </h2>
          <p
            className="text-[#9BA3B2] max-w-lg mx-auto text-base leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Whether you have a project in mind, a research collaboration, or just want to connect — I'm always open to interesting conversations.
          </p>
        </div>

        {/* Contact cards */}
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14" style={{ transitionDelay: "0.15s" }}>
          {contactLinks.map(({ icon: Icon, label, value, href, description, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-hover flex flex-col items-center text-center p-6 rounded-sm"
              style={{
                background: "#161A22",
                border: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
              }}
            >
              <div
                className="w-12 h-12 rounded-sm flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110"
                style={{
                  background: `${color}14`,
                  border: `1px solid ${color}28`,
                  color: color,
                }}
              >
                <Icon size={20} className="transition-colors duration-200" />
              </div>
              <div
                className="text-sm font-semibold text-white mb-1 group-hover:text-[#0ABFBC] transition-colors duration-200"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {label}
              </div>
              <div
                className="text-xs text-[#0ABFBC] mb-2 font-medium"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {value}
              </div>
              <div
                className="text-xs text-[#4A5568]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {description}
              </div>
            </a>
          ))}
        </div>

        {/* Divider */}
        <hr className="teal-rule mb-10" />

        {/* Bottom bar */}
        <div className="reveal flex flex-col sm:flex-row items-center justify-between gap-4" style={{ transitionDelay: "0.3s" }}>
          <div className="flex items-center gap-2 text-sm text-[#4A5568]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <MapPin size={13} className="text-[#0ABFBC]" />
            Based in Your City, Country · Available for remote work worldwide
          </div>
          <div
            className="text-xs text-[#4A5568]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Response time: usually within 24h
          </div>
        </div>
      </div>
    </section>
  );
}
