/*
 * About / Bio Section — Swiss Dark Editorial
 * Two-column: text left, stats/highlights right
 * Section counter "01 / About", teal rule
 */

import { useRef, useEffect } from "react";
import { Brain, Code2, Cpu, Globe } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const FALLBACK_STATS = [
  { value: "X+", label: "Лет опыта" },
  { value: "XX+", label: "Проектов" },
  { value: "XX+", label: "Статей" },
  { value: "XX+", label: "Open Source проектов" },
];

const HIGHLIGHTS = [
  { icon: Brain, text: "Машинное обучение и глубокое обучение" },
  { icon: Cpu, text: "LLM и генеративный AI" },
  { icon: Code2, text: "MLOps и производственные системы" },
  { icon: Globe, text: "Исследования и публикации" },
];

export default function About() {
  const data = usePortfolioData();
  const profile = data.profile || {};
  const stats = data.stats?.length ? data.stats : FALLBACK_STATS;
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
          <div className="section-label mb-3">01 / Обо мне</div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Кто я
          </h2>
          <hr className="teal-rule mt-4 max-w-xs" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Bio text */}
          <div className="space-y-5">
            <p className="reveal text-[#C4C9D4] leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "0.1s" }}>
              {profile.about_lead || <>Привет, я <span className="text-white font-semibold">Ваше Имя</span> — AI-инженер, увлечённый созданием интеллектуальных систем на стыке передовых исследований и реальных приложений.</>}
            </p>
            {(profile.about_body || "").split("\n").filter(Boolean).map((para: string, i: number) => (
              <p key={i} className="reveal text-[#9BA3B2] leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: `${0.2 + i * 0.1}s` }}>
                {para}
              </p>
            ))}
            {!profile.about_body && (
              <>
                <p className="reveal text-[#9BA3B2] leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "0.2s" }}>
                  Моя работа охватывает полный ML-цикл: от разведочного анализа данных и проектирования архитектуры моделей до обучения на больших масштабах, оценки качества и развёртывания надёжных производственных пайплайнов.
                </p>
                <p className="reveal text-[#9BA3B2] leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif", transitionDelay: "0.3s" }}>
                  В свободное от обучения моделей время участвую в open-source проектах, пишу технические статьи и изучаю последние достижения в области Foundation Models, обучения с подкреплением и мультимодального AI.
                </p>
              </>
            )}

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
                Скачать резюме
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="reveal grid grid-cols-2 gap-4" style={{ transitionDelay: "0.2s" }}>
            {stats.map(({ value, label }: { value: string; label: string }) => (
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
                  Город, Страна
                </div>
                <div className="text-xs text-[#9BA3B2]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Готов к удалённой работе и релокации
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
