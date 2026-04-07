/*
 * Experience Section — Swiss Dark Editorial
 * Vertical timeline with alternating cards
 * Section counter "04 / Experience"
 */

import { useRef, useEffect } from "react";
import { Briefcase } from "lucide-react";

type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  tags: string[];
};

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "e1",
    role: "Senior AI Engineer",
    company: "Company Name",
    period: "20XX – Present",
    location: "City, Country",
    type: "Full-time",
    description: "Leading the development of production-grade ML systems for [domain]. Responsible for model architecture, training infrastructure, and deployment pipelines.",
    achievements: [
      "Reduced model inference latency by XX% through optimization techniques",
      "Led a team of X engineers to ship [product feature] used by XXX+ users",
      "Designed and implemented a real-time recommendation system at scale",
    ],
    tags: ["PyTorch", "MLOps", "LLMs", "Kubernetes"],
  },
  {
    id: "e2",
    role: "Machine Learning Engineer",
    company: "Company Name",
    period: "20XX – 20XX",
    location: "City, Country",
    type: "Full-time",
    description: "Developed and maintained ML models for [use case]. Collaborated with product and data teams to define model requirements and evaluation metrics.",
    achievements: [
      "Built an NLP pipeline processing XX million documents per day",
      "Improved model accuracy by XX% through feature engineering and architecture changes",
      "Established MLOps best practices adopted across the engineering org",
    ],
    tags: ["Python", "TensorFlow", "Airflow", "AWS"],
  },
  {
    id: "e3",
    role: "AI Research Intern",
    company: "Research Lab / University",
    period: "20XX – 20XX",
    location: "City, Country",
    type: "Internship",
    description: "Conducted research on [topic] under the supervision of [Professor/Lead]. Contributed to publications and open-source tooling.",
    achievements: [
      "Co-authored a paper accepted at [Conference Name]",
      "Implemented baseline models for [benchmark/task]",
      "Contributed to an open-source library with XXX+ GitHub stars",
    ],
    tags: ["Research", "PyTorch", "NLP", "Academic"],
  },
];

export default function Experience() {
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
      id="experience"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "#0F1117" }}
    >
      <div className="container">
        {/* Section header */}
        <div className="reveal mb-14">
          <div className="section-label mb-3">04 / Experience</div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Work History
          </h2>
          <hr className="teal-rule mt-4 max-w-xs" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(180deg, rgba(10,191,188,0.4) 0%, rgba(10,191,188,0.1) 60%, transparent 100%)",
              transform: "translateX(-50%)",
            }}
          />

          <div className="space-y-10">
            {EXPERIENCES.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className={`reveal relative flex items-start gap-6 lg:gap-0 ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-5 lg:left-1/2 w-4 h-4 rounded-full flex-shrink-0 z-10"
                    style={{
                      transform: "translate(-50%, 4px)",
                      background: "#0D0F14",
                      border: "2px solid #0ABFBC",
                      boxShadow: "0 0 12px rgba(10,191,188,0.4)",
                    }}
                  />

                  {/* Spacer for desktop alternating layout */}
                  <div className="hidden lg:block lg:w-1/2" />

                  {/* Card */}
                  <div
                    className={`ml-12 lg:ml-0 lg:w-1/2 card-hover p-6 rounded-sm ${
                      isLeft ? "lg:pr-10" : "lg:pl-10"
                    }`}
                    style={{
                      background: "#161A22",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3
                          className="text-base font-bold text-white"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Briefcase size={12} className="text-[#0ABFBC]" />
                          <span
                            className="text-sm text-[#0ABFBC] font-medium"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {exp.company}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div
                          className="text-xs text-[#9BA3B2]"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {exp.period}
                        </div>
                        <div
                          className="text-xs text-[#4A5568] mt-0.5"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Type badge */}
                    <span
                      className="inline-block px-2 py-0.5 text-xs rounded-sm mb-3"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        background: "rgba(10,191,188,0.08)",
                        border: "1px solid rgba(10,191,188,0.15)",
                        color: "#0ABFBC",
                      }}
                    >
                      {exp.type}
                    </span>

                    {/* Description */}
                    <p
                      className="text-sm text-[#9BA3B2] leading-relaxed mb-4"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-1.5 mb-4">
                      {exp.achievements.map((ach, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-[#C4C9D4]"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          <span className="text-[#0ABFBC] mt-1 flex-shrink-0">▸</span>
                          {ach}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
