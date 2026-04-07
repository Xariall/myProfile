/*
 * Footer — Swiss Dark Editorial
 * Minimal footer with nav links and copyright
 */

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="py-8 border-t"
      style={{
        background: "#0D0F14",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-6 h-6 rounded-sm flex items-center justify-center text-[9px] font-bold"
            style={{ background: "var(--teal)", color: "#0D0F14" }}
          >
            AI
          </span>
          <span
            className="text-xs text-[#4A5568]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © {year} Your Name. All rights reserved.
          </span>
        </div>

        {/* Quick links */}
        <nav className="flex items-center gap-4">
          {["#about", "#skills", "#projects", "#experience", "#education", "#contact"].map((href) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNav(href); }}
              className="text-xs text-[#4A5568] hover:text-[#0ABFBC] transition-colors duration-200 capitalize"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {href.slice(1)}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
