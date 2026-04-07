/*
 * Hero Section — Swiss Dark Editorial
 * Asymmetric layout: text left, avatar right
 * Animated staggered headline, dot-grid background, teal accents
 */

import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524070095/fRirMRHo2JX8PN7S366szy/hero-bg-auFN3zviWi54ZNND6BFqn2.webp";
const AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524070095/fRirMRHo2JX8PN7S366szy/avatar-placeholder-UGhAWQzuZUZq2wtxidCCpV.webp";

const FALLBACK_ROLES = ["AI Engineer", "ML Researcher", "Deep Learning Specialist", "Data Scientist"];

export default function Hero() {
  const data = usePortfolioData();
  const roles = data.roles?.length ? data.roles : FALLBACK_ROLES;
  const profile = data.profile || {};

  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [fadeRole, setFadeRole] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeRole(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length);
        setFadeRole(true);
      }, 350);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0D0F14" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          opacity: 0.35,
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(10,191,188,0.18) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.4,
        }}
      />

      {/* Gradient overlay — left fade for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(105deg, #0D0F14 40%, rgba(13,15,20,0.6) 65%, rgba(13,15,20,0.2) 100%)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-0">
          {/* Left: Text */}
          <div className="flex-1 max-w-2xl">
            {/* Label */}
            <div
              className={`section-label mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "0.1s" }}
            >
              {profile.hero_eyebrow || "Available for opportunities"}
            </div>

            {/* Name */}
            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-3 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "'Space Grotesk', sans-serif", transitionDelay: "0.2s", letterSpacing: "-0.03em" }}
            >
              {profile.hero_name || "Your Name"}
            </h1>

            {/* Role — animated */}
            <div
              className={`text-2xl sm:text-3xl font-semibold mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "0.35s", minHeight: "2.5rem" }}
            >
              <span
                className="transition-all duration-350"
                style={{
                  color: "var(--teal)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  opacity: fadeRole ? 1 : 0,
                  transform: fadeRole ? "translateY(0)" : "translateY(-8px)",
                  display: "inline-block",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                }}
              >
                {roles[roleIndex]}
              </span>
            </div>

            {/* Tagline */}
            <p
              className={`text-base sm:text-lg text-[#9BA3B2] max-w-lg leading-relaxed mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "0.45s", fontFamily: "'DM Sans', sans-serif" }}
            >
              {profile.hero_tagline || "Building intelligent systems at the intersection of research and production. Passionate about turning complex models into real-world impact."}
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "0.55s" }}
            >
              <button
                onClick={() => {
                  const el = document.getElementById("projects");
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
                }}
                className="px-6 py-3 text-sm font-semibold rounded-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{ background: "var(--teal)", color: "#0D0F14", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                View Projects
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
                }}
                className="px-6 py-3 text-sm font-semibold rounded-sm border transition-all duration-200 hover:border-[#0ABFBC]/60 hover:text-[#0ABFBC]"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "#E8EAF0",
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "transparent",
                }}
              >
                Get in Touch
              </button>
            </div>

            {/* Social Icons */}
            <div
              className={`flex items-center gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "0.65s" }}
            >
              {[
                { icon: Github, label: "GitHub", href: profile.github_url || "#" },
                { icon: Linkedin, label: "LinkedIn", href: profile.linkedin_url || "#" },
                { icon: Twitter, label: "Twitter", href: profile.twitter_url || "#" },
              ].filter(s => s.href && s.href !== "#").map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-sm border border-white/10 text-[#9BA3B2] hover:text-[#0ABFBC] hover:border-[#0ABFBC]/40 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Avatar */}
          <div
            className={`lg:flex-shrink-0 lg:ml-auto transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px solid rgba(10,191,188,0.2)",
                  animation: "spin 20s linear infinite",
                }}
              />
              {/* Inner ring */}
              <div
                className="absolute inset-4 rounded-full"
                style={{
                  border: "1px dashed rgba(10,191,188,0.12)",
                  animation: "spin 14s linear infinite reverse",
                }}
              />
              {/* Avatar image */}
              <div
                className="absolute inset-8 rounded-full overflow-hidden"
                style={{
                  border: "2px solid rgba(10,191,188,0.3)",
                  boxShadow: "0 0 40px rgba(10,191,188,0.12), 0 0 80px rgba(10,191,188,0.05)",
                }}
              >
                <img
                  src={AVATAR}
                  alt="AI Engineer Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Status badge */}
              <div
                className="absolute bottom-8 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(13,15,20,0.9)",
                  border: "1px solid rgba(10,191,188,0.3)",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#E8EAF0",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0ABFBC] animate-pulse" />
                Open to work
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer transition-all duration-700 ${visible ? "opacity-60" : "opacity-0"}`}
          style={{ transitionDelay: "1s" }}
          onClick={scrollToAbout}
        >
          <span className="text-xs text-[#4A5568]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>scroll</span>
          <ArrowDown size={14} className="text-[#0ABFBC] animate-bounce" />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
