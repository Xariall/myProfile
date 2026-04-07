/*
 * ScrollProgress — thin teal progress bar at top of viewport
 * Swiss Dark Editorial design element
 */

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none"
      style={{ background: "rgba(10,191,188,0.08)" }}
    >
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #0ABFBC, rgba(10,191,188,0.6))",
          boxShadow: "0 0 8px rgba(10,191,188,0.5)",
        }}
      />
    </div>
  );
}
