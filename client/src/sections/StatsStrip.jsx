import { useEffect, useRef, useState } from "react";

export default function StatsStrip() {
  const items = [
    { k: "Years of Excellence", v: 12, suffix: "+" },
    { k: "Dishes Served", v: 120000, suffix: "+" },
    { k: "Awards", v: 18, suffix: "" },
  ];

  const [start, setStart] = useState(false);
  const sectionRef = useRef(null);

  // Detect when the section enters the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          obs.disconnect(); // run only once
        }
      },
      { threshold: 0.3 } // 30% visible
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 grid gap-8 sm:grid-cols-3">
        {items.map((it) => (
          <Stat key={it.k} label={it.k} value={it.v} suffix={it.suffix} start={start} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Single Stat component ---------- */
function Stat({ label, value, suffix, start }) {
  const [display, setDisplay] = useState(0);
  const duration = 1800; // ms
  const ref = useRef();

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      setDisplay(Math.floor(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, value]);

  return (
    <div className="text-center">
      <div
        ref={ref}
        className="text-3xl font-semibold text-neutral-900 transition-transform duration-300 group-hover:scale-105"
      >
        {value > 999 ? formatNumber(display) : display}
        {progressDone(display, value) && suffix}
      </div>
      <div className="mt-1 text-sm text-neutral-600">{label}</div>
    </div>
  );
}

/* ---------- Small helpers ---------- */
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function formatNumber(num) {
  return num.toLocaleString();
}

function progressDone(curr, target) {
  return curr >= target;
}
