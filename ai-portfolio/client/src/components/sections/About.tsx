/*
 * About / Bio Section — Swiss Dark Editorial
 * Two-column: text left, stats/highlights right
 * Section counter "01 / About", teal rule
 */

import { useRef, useEffect } from "react";
import { Brain, Code2, Cpu, Globe } from "lucide-react";

const STATS = [
  { value: "X+", label: "Years Experience" },
  { value: "XX+", label: "Projects Shipped" },
  { value: "XX+", label: "Papers / Articles" },
  { value: "XX+", label: "Open Source Contributions" },
];

const HIGHLIGHTS = [
  { icon: Brain, text: "Machine Learning & Deep Learning" },
  { icon: Cpu, text: "LLMs & Generative AI" },
  { icon: Code2, text: "MLOps & Production Systems" },
  { icon: Globe, text: "Research & Publications" },
];

export default function About() {
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
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "#0D0F14" }}
    >
      <div className="container">
        {/* Section header */}
        <div className="reveal mb-12">
          <div className="section-label mb-3">01 / About</div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Who I Am
          </h2>
          <hr className="teal-rule mt-4 max-w-xs" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Bio text */}
          <div className="space-y-5">
            <p className="reveal text-[#C4C9D4] leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "0.1s" }}>
              Hi, I'm <span className="text-white font-semibold">Your Name</span> — an AI Engineer with a passion for building intelligent systems that bridge the gap between cutting-edge research and real-world applications.
            </p>
            <p className="reveal text-[#9BA3B2] leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "0.2s" }}>
              My work spans the full ML lifecycle: from exploratory data analysis and model architecture design, to training at scale, evaluation, and deploying robust production pipelines. I thrive at the intersection of research and engineering.
            </p>
            <p className="reveal text-[#9BA3B2] leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "0.3s" }}>
              When I'm not training models, I contribute to open-source projects, write technical articles, and explore the latest advancements in foundation models, reinforcement learning, and multimodal AI.
            </p>

            {/* Highlights */}
            <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2" style={{ transitionDelay: "0.4s" }}>
              {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 text-sm text-[#9BA3B2]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Icon size={14} className="text-[#0ABFBC] flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            <div className="reveal pt-2" style={{ transitionDelay: "0.5s" }}>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0ABFBC] hover:text-white transition-colors duration-200 group"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Download Resume
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="reveal grid grid-cols-2 gap-4" style={{ transitionDelay: "0.2s" }}>
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="card-hover p-6 rounded-sm"
                style={{
                  background: "#161A22",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="text-3xl font-extrabold mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--teal)" }}
                >
                  {value}
                </div>
                <div
                  className="text-xs text-[#9BA3B2] leading-tight"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </div>
              </div>
            ))}

            {/* Location / availability card */}
            <div
              className="col-span-2 p-5 rounded-sm flex items-center gap-4"
              style={{
                background: "rgba(10,191,188,0.06)",
                border: "1px solid rgba(10,191,188,0.18)",
              }}
            >
              <div
                className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(10,191,188,0.12)" }}
              >
                <Globe size={18} className="text-[#0ABFBC]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Based in Your City, Country
                </div>
                <div className="text-xs text-[#9BA3B2]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Open to remote &amp; relocation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
