/*
 * BackToTop — floating button, appears after scrolling 400px
 * Swiss Dark Editorial design
 */

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-8 right-6 z-50 w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-300"
      style={{
        background: "rgba(10,191,188,0.12)",
        border: "1px solid rgba(10,191,188,0.3)",
        color: "#0ABFBC",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(12px)",
        boxShadow: "0 0 16px rgba(10,191,188,0.1)",
      }}
    >
      <ArrowUp size={15} />
    </button>
  );
}
