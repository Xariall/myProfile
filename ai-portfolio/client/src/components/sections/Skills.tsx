/*
 * Skills Section — Swiss Dark Editorial
 * Visual cards grouped by category, proficiency bars, tech tags
 * Section counter "02 / Skills"
 */

import { useRef, useEffect } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const SKILLS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524070095/fRirMRHo2JX8PN7S366szy/skills-bg-JDFQqP7JrLQxSNS4rdKwwG.webp";

type Skill = { name: string; level: number };

type Category = {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
};

const FALLBACK_CATEGORIES: Category[] = [
  { id: "ml", label: "Machine Learning", icon: "🧠", skills: [{ name: "Deep Learning", level: 90 }, { name: "NLP / LLMs", level: 88 }] },
  { id: "frameworks", label: "Frameworks & Libraries", icon: "⚙️", skills: [{ name: "PyTorch", level: 92 }, { name: "TensorFlow / Keras", level: 80 }] },
  { id: "mlops", label: "MLOps & Infrastructure", icon: "🚀", skills: [{ name: "Docker / Kubernetes", level: 78 }, { name: "MLflow / W&B", level: 82 }] },
  { id: "languages", label: "Languages & Tools", icon: "💻", skills: [{ name: "Python", level: 95 }, { name: "SQL", level: 80 }] },
];

const FALLBACK_TAGS = [
  "PyTorch", "TensorFlow", "HuggingFace", "LangChain", "OpenAI API",
  "FastAPI", "Docker", "Kubernetes", "MLflow", "Weights & Biases",
];

function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            const fill = bar.querySelector(".skill-fill") as HTMLElement;
            if (fill) fill.style.width = `${level}%`;
          }, delay);
          observer.unobserve(bar);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(bar);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={barRef} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#C4C9D4]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {name}
        </span>
        <span
          className="text-xs text-[#0ABFBC]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {level}%
        </span>
      </div>
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="skill-fill h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: "0%",
            background: "linear-gradient(90deg, #0ABFBC, rgba(10,191,188,0.5))",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const data = usePortfolioData();
  const categories: Category[] = data.skills?.length ? data.skills : FALLBACK_CATEGORIES;
  const techTags: string[] = data.pills?.length ? data.pills : FALLBACK_TAGS;
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
      id="skills"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#0F1117" }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${SKILLS_BG})` }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="reveal mb-12">
          <div className="section-label mb-3">02 / Skills</div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Technical Expertise
          </h2>
          <hr className="teal-rule mt-4 max-w-xs" />
        </div>

        {/* Category cards grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-14">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className="reveal card-hover p-6 rounded-sm"
              style={{
                background: "#161A22",
                border: "1px solid rgba(255,255,255,0.06)",
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              {/* Card header */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-xl">{cat.icon}</span>
                <h3
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {cat.label}
                </h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {cat.skills.map((skill, j) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={i * 100 + j * 80}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="reveal" style={{ transitionDelay: "0.3s" }}>
          <div className="section-label mb-5">Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {techTags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs rounded-sm transition-all duration-200 hover:border-[#0ABFBC]/40 hover:text-[#0ABFBC] cursor-default"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#9BA3B2",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
