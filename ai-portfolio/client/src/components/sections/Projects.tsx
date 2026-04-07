/*
 * Projects Section — Swiss Dark Editorial
 * Interactive cards with tech stack, hover reveal, featured badge
 * Section counter "03 / Projects"
 */

import { useRef, useEffect, useState, useMemo } from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const CARD_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524070095/fRirMRHo2JX8PN7S366szy/project-card-bg-UcNzAKVdr7ZtoK9XuEaCDB.webp";

type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  featured?: boolean;
  stars?: string;
  status: "Production" | "Research" | "Open Source" | "WIP";
  github_url?: string;
  live_url?: string;
};

const STATUS_COLORS: Record<string, string> = {
  Production: "rgba(16, 185, 129, 0.15)",
  Research: "rgba(10, 191, 188, 0.12)",
  "Open Source": "rgba(139, 92, 246, 0.15)",
  WIP: "rgba(245, 158, 11, 0.12)",
};

const STATUS_TEXT: Record<string, string> = {
  Production: "#10B981",
  Research: "#0ABFBC",
  "Open Source": "#8B5CF6",
  WIP: "#F59E0B",
};

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-sm overflow-hidden group cursor-pointer"
      style={{
        background: "#161A22",
        border: `1px solid ${hovered ? "rgba(10,191,188,0.35)" : "rgba(255,255,255,0.06)"}`,
        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
        boxShadow: hovered ? "0 0 24px rgba(10,191,188,0.08), 0 8px 32px rgba(0,0,0,0.4)" : "none",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card background image (subtle) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        style={{
          backgroundImage: `url(${CARD_BG})`,
          opacity: hovered ? 0.18 : 0.08,
        }}
      />

      {/* Featured badge */}
      {project.featured && (
        <div
          className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-medium z-10"
          style={{
            background: "rgba(10,191,188,0.12)",
            border: "1px solid rgba(10,191,188,0.25)",
            color: "#0ABFBC",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <Star size={10} />
          Featured
        </div>
      )}

      <div className="relative z-10 p-6">
        {/* Category + Status */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs text-[#4A5568] uppercase tracking-wider"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {project.category}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-sm font-medium"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: STATUS_COLORS[project.status],
              color: STATUS_TEXT[project.status],
            }}
          >
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold text-white mb-2 transition-colors duration-200 group-hover:text-[#0ABFBC]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {project.title}
        </h3>

        {/* Description — toggles on hover */}
        <p
          className="text-sm leading-relaxed mb-4 transition-all duration-300"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: hovered ? "#C4C9D4" : "#9BA3B2",
          }}
        >
          {hovered ? project.longDescription : project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-sm"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#9BA3B2",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: stars + links */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          {project.stars ? (
            <span
              className="flex items-center gap-1 text-xs text-[#9BA3B2]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <Star size={11} className="text-[#F59E0B]" />
              {project.stars}
            </span>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4A5568] hover:text-[#0ABFBC] transition-colors duration-200"
                aria-label="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={15} />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4A5568] hover:text-[#0ABFBC] transition-colors duration-200"
                aria-label="Live demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const data = usePortfolioData();
  const projects: Project[] = data.projects?.length ? data.projects : [];
  const categoryTabs = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, [projects]);

  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
      id="projects"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "#0D0F14" }}
    >
      <div className="container">
        {/* Section header */}
        <div className="reveal mb-10">
          <div className="section-label mb-3">03 / Projects</div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Selected Work
          </h2>
          <hr className="teal-rule mt-4 max-w-xs" />
        </div>

        {/* Category filter */}
        <div className="reveal flex flex-wrap gap-2 mb-10" style={{ transitionDelay: "0.1s" }}>
          {categoryTabs.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 text-xs rounded-sm transition-all duration-200"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: activeCategory === cat ? "var(--teal)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeCategory === cat ? "var(--teal)" : "rgba(255,255,255,0.08)"}`,
                color: activeCategory === cat ? "#0D0F14" : "#9BA3B2",
                fontWeight: activeCategory === cat ? 600 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="reveal mt-10 text-center" style={{ transitionDelay: "0.4s" }}>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0ABFBC] hover:text-white transition-colors duration-200 group"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            View all projects on GitHub
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
