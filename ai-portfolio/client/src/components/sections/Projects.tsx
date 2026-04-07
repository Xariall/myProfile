/*
 * Projects Section — Swiss Dark Editorial
 * Interactive cards with tech stack, hover reveal, featured badge
 * Section counter "03 / Projects"
 */

import { useRef, useEffect, useState } from "react";
import { ExternalLink, Github, Star } from "lucide-react";

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
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Project Alpha",
    description: "A large-scale NLP pipeline for real-time document understanding and summarization.",
    longDescription: "End-to-end system leveraging transformer-based models for document ingestion, semantic chunking, and abstractive summarization at production scale.",
    tags: ["PyTorch", "HuggingFace", "FastAPI", "Redis", "Docker"],
    category: "NLP",
    featured: true,
    stars: "1.2k",
    status: "Production",
  },
  {
    id: "p2",
    title: "Project Beta",
    description: "Multi-modal vision-language model fine-tuned for domain-specific image captioning.",
    longDescription: "Custom fine-tuning pipeline for vision-language models on specialized datasets, with evaluation harness and deployment on cloud infrastructure.",
    tags: ["PyTorch", "CLIP", "BLIP-2", "AWS SageMaker", "MLflow"],
    category: "Computer Vision",
    featured: true,
    stars: "840",
    status: "Research",
  },
  {
    id: "p3",
    title: "Project Gamma",
    description: "Reinforcement learning agent for autonomous decision-making in dynamic environments.",
    longDescription: "PPO-based RL agent trained in custom simulation environments with reward shaping, curriculum learning, and policy distillation techniques.",
    tags: ["PyTorch", "Gymnasium", "Ray RLlib", "W&B", "Python"],
    category: "Reinforcement Learning",
    status: "Research",
  },
  {
    id: "p4",
    title: "Project Delta",
    description: "MLOps platform for automated model training, evaluation, and deployment workflows.",
    longDescription: "Internal tooling for managing the full ML lifecycle: experiment tracking, model registry, A/B testing infrastructure, and automated retraining triggers.",
    tags: ["MLflow", "Kubernetes", "Airflow", "PostgreSQL", "Grafana"],
    category: "MLOps",
    status: "Production",
  },
  {
    id: "p5",
    title: "Project Epsilon",
    description: "Open-source library for efficient data augmentation in low-resource NLP tasks.",
    longDescription: "A Python library providing modular, composable text augmentation strategies optimized for low-resource and multilingual NLP scenarios.",
    tags: ["Python", "spaCy", "NLTK", "pytest", "PyPI"],
    category: "Open Source",
    stars: "320",
    status: "Open Source",
  },
  {
    id: "p6",
    title: "Project Zeta",
    description: "LLM-powered code review assistant integrated into CI/CD pipelines.",
    longDescription: "Automated code review tool using fine-tuned LLMs to detect bugs, suggest improvements, and enforce coding standards within GitHub Actions workflows.",
    tags: ["LangChain", "OpenAI API", "GitHub Actions", "FastAPI", "React"],
    category: "LLMs",
    status: "WIP",
  },
];

const CATEGORIES = ["All", "NLP", "Computer Vision", "Reinforcement Learning", "MLOps", "Open Source", "LLMs"];

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
            <a
              href="#"
              className="text-[#4A5568] hover:text-[#0ABFBC] transition-colors duration-200"
              aria-label="GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={15} />
            </a>
            <a
              href="#"
              className="text-[#4A5568] hover:text-[#0ABFBC] transition-colors duration-200"
              aria-label="Live demo"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

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
          {CATEGORIES.map((cat) => (
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
