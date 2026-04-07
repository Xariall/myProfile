/*
 * Navbar — Swiss Dark Editorial
 * Sticky top nav, section anchors, mobile hamburger
 * Accent: cold teal #0ABFBC | Font: Space Grotesk / JetBrains Mono
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActive(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0D0F14]/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-[68px]">
        {/* Logo / Name */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
          className="flex items-center gap-2 group"
        >
          <span
            className="inline-block w-7 h-7 rounded-sm flex items-center justify-center text-[10px] font-bold"
            style={{ background: "var(--teal)", color: "#0D0F14" }}
          >
            AI
          </span>
          <span
            className="font-bold text-sm tracking-wide"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E8EAF0" }}
          >
            Portfolio
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-sm group ${
                  isActive ? "text-[#0ABFBC]" : "text-[#9BA3B2] hover:text-[#E8EAF0]"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-3 right-3 h-px transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                  }`}
                  style={{ background: "var(--teal)" }}
                />
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav("#contact"); }}
            className="ml-3 px-4 py-1.5 text-sm font-semibold rounded-sm transition-all duration-200 hover:shadow-lg"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: "var(--teal)",
              color: "#0D0F14",
            }}
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-sm text-[#9BA3B2] hover:text-[#E8EAF0] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "#0D0F14", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <nav className="container py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              className="px-3 py-2.5 text-sm font-medium text-[#9BA3B2] hover:text-[#0ABFBC] transition-colors rounded-sm hover:bg-white/4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav("#contact"); }}
            className="mt-2 px-4 py-2.5 text-sm font-semibold rounded-sm text-center"
            style={{ background: "var(--teal)", color: "#0D0F14", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
}
