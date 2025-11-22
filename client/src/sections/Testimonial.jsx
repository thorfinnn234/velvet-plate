import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    name: "Ama Ampomah",
    role: "CEO & Founder Inc",
    avatar: "/images/people/1.jpg",
    rating: 5,
    quote:
      "Every plate felt like a story. Service was warm and thoughtful—Velvet Plate is my go-to for celebrations.",
  },
  {
    name: "Daniel K.",
    role: "Creative Director",
    avatar: "/images/people/2.jpg",
    rating: 5,
    quote:
      "Flavors are bold yet balanced. The ambience and plating are world-class. Chef’s tasting menu is a must.",
  },
  {
    name: "Leila S.",
    role: "Product Manager",
    avatar: "/images/people/3.jpg",
    rating: 4,
    quote:
      "Loved the wine pairing! Staff made great recommendations and the steak was cooked to perfection.",
  },
  {
    name: "Ifeanyi O.",
    role: "Entrepreneur",
    avatar: "/images/people/4.jpg",
    rating: 5,
    quote:
      "Refined without being pretentious. Desserts were outstanding—silky textures and clean finishes.",
  },
  {
    name: "Maya B.",
    role: "Photographer",
    avatar: "/images/people/5.jpg",
    rating: 5,
    quote:
      "The details impressed me—tableware, lighting, and the little surprises between courses. Beautiful evening.",
  },
  {
    name: "Thiago R.",
    role: "Engineer",
    avatar: "/images/people/6.jpg",
    rating: 4,
    quote:
      "Elegant, modern, delicious. Reservations are tight but worth it. Will be back with friends.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative isolate bg-neutral-50">
      {/* background ornament (replace with your SVG if you want) */}
      <div
        className="pointer-events-none absolute -left-14 top-0 -z-10 hidden md:block h-[420px] w-[420px] opacity-10 bg-no-repeat bg-contain"
        style={{ backgroundImage: "url('/leaves.svg')" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-16 -z-10 hidden md:block h-[320px] w-[320px] opacity-10 bg-no-repeat bg-contain"
        style={{ backgroundImage: "url('/leaves.svg')" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-900">
            Our Happy Customers
          </h2>
          <p className="mt-2 text-neutral-600 max-w-2xl mx-auto">
            Real words from guests who spent their evening with us.
          </p>
        </div>

        <div className="mt-10">
          <Carousel items={TESTIMONIALS} intervalMs={4000} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Carousel (auto, pause on hover, swipe, dots) ---------- */
function Carousel({ items, intervalMs = 4000 }) {
  const [i, setI] = useState(0);
  const timer = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line
  }, [i]);

  const start = () => {
    stop();
    timer.current = setTimeout(() => {
      setI((p) => (p + 1) % items.length);
    }, intervalMs);
  };
  const stop = () => timer.current && clearTimeout(timer.current);

  // basic touch swipe
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let x0 = null;
    const onStart = (e) => (x0 = (e.touches ? e.touches[0] : e).clientX);
    const onMove = (e) => {
      if (x0 == null) return;
      const x1 = (e.touches ? e.touches[0] : e).clientX;
      const dx = x1 - x0;
      if (Math.abs(dx) > 60) {
        dx > 0 ? prev() : next();
        x0 = null;
      }
    };
    const onEnd = () => (x0 = null);
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, []);

  const next = () => setI((p) => (p + 1) % items.length);
  const prev = () => setI((p) => (p - 1 + items.length) % items.length);

  const t = items[i];

  return (
    <div
      ref={containerRef}
      onMouseEnter={stop}
      onMouseLeave={start}
      className="relative mx-auto max-w-3xl"
    >
      {/* Card */}
      <article className="relative rounded-[50px_2px_50px_2px] bg-white p-12 pt-12   shadow-[0_16px_40px_rgba(17,17,17,0.10)] border border-neutral-200">
        {/* avatar */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <img
            src={t.avatar}
            alt={t.name}
            className="h-16 w-16 rounded-full object-cover ring-4 ring-white shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
          />
        </div>

        {/* stars */}
        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} filled={k < t.rating} />
          ))}
        </div>

        {/* quote */}
        <p className="mt-4 text-center text-neutral-700 leading-relaxed">
          {t.quote}
        </p>

        {/* name / role */}
        <div className="mt-6 text-center">
          <div className="font-semibold text-neutral-900">{t.name}</div>
          <div className="text-sm text-neutral-500">{t.role}</div>
        </div>
      </article>

      {/* controls */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-neutral-200 bg-white/90 p-2 shadow hover:bg-white"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-neutral-200 bg-white/90 p-2 shadow hover:bg-white"
      >
        <ChevronRight />
      </button>

      {/* dots */}
      <div className="mt-5 flex justify-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              idx === i ? "bg-[#ff6f1a]" : "bg-neutral-300 hover:bg-neutral-400"
            }`}
            aria-label={`Go to ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- tiny inline icons ---------- */
function Star({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${filled ? "text-[#ffb347]" : "text-neutral-300"}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-neutral-700" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-neutral-700" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
