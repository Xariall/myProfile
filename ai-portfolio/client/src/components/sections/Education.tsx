/*
 * Education & Certifications Section — Swiss Dark Editorial
 * Compact two-column layout: education left, certs right
 * Section counter "05 / Education"
 */

import { useRef, useEffect } from "react";
import { GraduationCap, Award, Calendar } from "lucide-react";

type EducationItem = {
  degree: string;
  field: string;
  institution: string;
  period: string;
  gpa?: string;
  thesis?: string;
};

type CertItem = {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  badge?: string;
};

const EDUCATION: EducationItem[] = [
  {
    degree: "M.Sc.",
    field: "Artificial Intelligence / Computer Science",
    institution: "University Name",
    period: "20XX – 20XX",
    gpa: "X.X / 4.0",
    thesis: "Thesis: [Title of your thesis on a relevant AI topic]",
  },
  {
    degree: "B.Sc.",
    field: "Computer Science / Mathematics",
    institution: "University Name",
    period: "20XX – 20XX",
    gpa: "X.X / 4.0",
  },
];

const CERTIFICATIONS: CertItem[] = [
  {
    name: "Deep Learning Specialization",
    issuer: "Coursera / DeepLearning.AI",
    date: "20XX",
    credentialId: "XXXX-XXXX",
    badge: "🧠",
  },
  {
    name: "AWS Certified Machine Learning – Specialty",
    issuer: "Amazon Web Services",
    date: "20XX",
    credentialId: "XXXX-XXXX",
    badge: "☁️",
  },
  {
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "20XX",
    credentialId: "XXXX-XXXX",
    badge: "⚡",
  },
  {
    name: "Professional Data Engineer",
    issuer: "Google Cloud",
    date: "20XX",
    credentialId: "XXXX-XXXX",
    badge: "🔧",
  },
  {
    name: "MLOps Specialization",
    issuer: "Coursera / DeepLearning.AI",
    date: "20XX",
    credentialId: "XXXX-XXXX",
    badge: "🚀",
  },
  {
    name: "Reinforcement Learning Specialization",
    issuer: "Coursera / University of Alberta",
    date: "20XX",
    credentialId: "XXXX-XXXX",
    badge: "🎯",
  },
];

export default function Education() {
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
      id="education"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "#0D0F14" }}
    >
      <div className="container">
        {/* Section header */}
        <div className="reveal mb-12">
          <div className="section-label mb-3">05 / Education</div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Education &amp; Certifications
          </h2>
          <hr className="teal-rule mt-4 max-w-xs" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Education */}
          <div>
            <div className="reveal flex items-center gap-2 mb-6" style={{ transitionDelay: "0.05s" }}>
              <GraduationCap size={18} className="text-[#0ABFBC]" />
              <h3
                className="text-sm font-semibold text-[#E8EAF0] uppercase tracking-wider"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Academic Background
              </h3>
            </div>

            <div className="space-y-5">
              {EDUCATION.map((edu, i) => (
                <div
                  key={i}
                  className="reveal card-hover p-6 rounded-sm"
                  style={{
                    background: "#161A22",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transitionDelay: `${0.1 + i * 0.1}s`,
                  }}
                >
                  {/* Degree badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className="text-2xl font-extrabold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--teal)" }}
                    >
                      {edu.degree}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#9BA3B2]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      <Calendar size={11} />
                      {edu.period}
                    </div>
                  </div>

                  <div
                    className="text-base font-semibold text-white mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {edu.field}
                  </div>
                  <div
                    className="text-sm text-[#0ABFBC] mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {edu.institution}
                  </div>

                  {edu.gpa && (
                    <div className="flex items-center gap-2 text-xs text-[#9BA3B2] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      <span className="text-[#4A5568]">GPA</span>
                      <span className="text-[#C4C9D4]">{edu.gpa}</span>
                    </div>
                  )}

                  {edu.thesis && (
                    <div
                      className="text-xs text-[#9BA3B2] italic border-l-2 pl-3 mt-3"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        borderColor: "rgba(10,191,188,0.3)",
                      }}
                    >
                      {edu.thesis}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Certifications */}
          <div>
            <div className="reveal flex items-center gap-2 mb-6" style={{ transitionDelay: "0.05s" }}>
              <Award size={18} className="text-[#0ABFBC]" />
              <h3
                className="text-sm font-semibold text-[#E8EAF0] uppercase tracking-wider"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Certifications
              </h3>
            </div>

            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, i) => (
                <div
                  key={i}
                  className="reveal card-hover flex items-center gap-4 p-4 rounded-sm"
                  style={{
                    background: "#161A22",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transitionDelay: `${0.1 + i * 0.07}s`,
                  }}
                >
                  {/* Badge icon */}
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "rgba(10,191,188,0.08)", border: "1px solid rgba(10,191,188,0.12)" }}
                  >
                    {cert.badge}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-sm font-semibold text-white truncate"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {cert.name}
                    </div>
                    <div
                      className="text-xs text-[#9BA3B2] truncate"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {cert.issuer}
                    </div>
                  </div>

                  {/* Date */}
                  <div
                    className="text-xs text-[#4A5568] flex-shrink-0"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
