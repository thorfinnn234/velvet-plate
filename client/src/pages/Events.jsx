import { useEffect, useMemo, useState } from "react";

// ----------  DATA: yearly recurring events  ----------
const EVENTS = [
  {
    slug: "valentines",
    title: "Valentine’s Week",
    // Feb 10–14 every year
    start: { month: 2, day: 10 },
    end:   { month: 2, day: 14 },
    discountPct: 15,
    code: "VAL15",
    image: "https://images.unsplash.com/photo-1487035242901-d419a42d17af?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFsZW50aW5lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=300",
    blurb: "A romantic five-course tasting for two. Complimentary sparkling toast.",
  },
  {
    slug: "easter",
    title: "Easter Brunch",
    // Apr 1–2 every year (fixed for demo; real Easter varies)
    start: { month: 4, day: 1 },
    end:   { month: 4, day: 2 },
    discountPct: 10,
    code: "EASTER10",
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop",
    blurb: "Seasonal brunch menu with pastries, roasts, and garden salads.",
  },
  {
    slug: "independence",
    title: "Independence Day Feast",
    // Oct 1 (single day)
    start: { month: 10, day: 1 },
    end:   null, // same day
    discountPct: 12,
    code: "INDEP12",
    image: "https://images.unsplash.com/photo-1603377583938-629c643dea45?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kZXBlbmRlbmNlJTIwZGF5JTIwbmlnZXJpYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=300",
    blurb: "Patriotic prix-fixe with regional favorites and live music.",
  },
  {
    slug: "black-friday",
    title: "Black Friday Tasting",
    // Nov 29 (demo; not always exact Friday)
    start: { month: 11, day: 29 },
    end:   { month: 11, day: 29 },
    discountPct: 20,
    code: "BLACK20",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJsYWNrJTIwZnJpZGF5fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=300",
    blurb: "One-night-only chef’s tasting with cellar picks by the glass.",
  },
  {
    slug: "christmas",
    title: "Christmas Week",
    // Dec 20–25 every year
    start: { month: 12, day: 20 },
    end:   { month: 12, day: 25 },
    discountPct: 18,
    code: "XMAS18",
    image: "https://images.unsplash.com/photo-1511268011861-691ed210aae8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=300",
    blurb: "Festive classics, candlelight service, and carols after dinner.",
  },
  {
    slug: "new-year",
    title: "New Year’s Eve Gala",
    // Dec 31–Jan 1 (spans years)
    start: { month: 12, day: 31 },
    end:   { month: 1,  day: 1 },
    discountPct: 25,
    code: "NY25",
    image: "https://images.unsplash.com/photo-1577046848358-4623c0859b8a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5ldyUyMHllYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=300",
    blurb: "Countdown dinner, midnight toast, and live band till late.",
  },
];

// ----------  date helpers (yearly recurrence)  ----------
const toDate = (y, m, d) => new Date(y, m - 1, d, 0, 0, 0, 0);

function getOccurrence(e, year) {
  const s = toDate(year, e.start.month, e.start.day);
  const endSpec = e.end ?? e.start;
  let eDate = toDate(year, endSpec.month, endSpec.day);
  // if end month wraps to next year (e.g. Dec 31–Jan 1)
  if (endSpec.month < e.start.month || (endSpec.month === e.start.month && endSpec.day < e.start.day)) {
    eDate = toDate(year + 1, endSpec.month, endSpec.day);
  }
  return { start: s, end: eDate };
}

function isNowActive(e, now = new Date()) {
  const { start, end } = getOccurrence(e, now.getFullYear());
  if (now >= start && now <= end) return { active: true, start, end };
  // if already passed this year, maybe we are inside last year's span (for cross-year events)
  const last = getOccurrence(e, now.getFullYear() - 1);
  if (now >= last.start && now <= last.end) return { active: true, start: last.start, end: last.end };
  return { active: false, start, end };
}

function nextStart(e, now = new Date()) {
  const occThis = getOccurrence(e, now.getFullYear());
  if (now < occThis.start) return occThis.start;
  // if the event is active now, next is next year's
  if (now <= occThis.end) {
    const occNext = getOccurrence(e, now.getFullYear() + 1);
    return occNext.start;
  }
  // already passed this year
  const occNext = getOccurrence(e, now.getFullYear() + 1);
  return occNext.start;
}

function formatRange(start, end) {
  const sameDay = start.toDateString() === end.toDateString();
  const o = { month: "short", day: "numeric" };
  const oY = { month: "short", day: "numeric", year: "numeric" };
  if (sameDay) return start.toLocaleDateString(undefined, oY);
  const left = start.toLocaleDateString(undefined, o);
  const right = end.toLocaleDateString(undefined, oY);
  return `${left} – ${right}`;
}

// ----------  countdown hook  ----------
function useCountdown(targetDate) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, targetDate - now);
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  return { days, hours, mins, secs, done: diff === 0 };
}

// ----------  coupon helper (store in localStorage for checkout)  ----------
function applyCoupon(code, pct) {
  localStorage.setItem("vp_coupon", JSON.stringify({ code, pct }));
  // you can read this in Checkout and apply to subtotal
}

// ----------  PAGE  ----------
export default function Events() {
  const now = new Date();

  // pick the soonest upcoming event
  const upcoming = useMemo(() => {
    const withDates = EVENTS.map((e) => ({
      e,
      activeInfo: isNowActive(e, now),
      next: nextStart(e, now),
      occ: getOccurrence(e, now.getFullYear()),
    }));
    // show active one as "featured" first, else the soonest next
    const activeFirst = withDates.find((x) => x.activeInfo.active);
    if (activeFirst) return activeFirst;
    return withDates.sort((a, b) => a.next - b.next)[0];
  }, [now]);

  const target = upcoming.activeInfo.active ? upcoming.activeInfo.end : upcoming.next;
  const { days, hours, mins, secs } = useCountdown(target);

  return (
    <section className="relative isolate bg-white">
      {/* soft ornament (swap with your leaves.svg) */}
      <div
        className="pointer-events-none absolute -left-24 top-0 -z-10 hidden md:block h-[440px] w-[440px] bg-contain bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/leaves.svg')" }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-6">
          <h1 className="font-serif text-3xl text-neutral-900">Annual Events & Offers</h1>
          <p className="mt-1 text-neutral-600">
            Signature dates we celebrate every year — each with a limited-time menu and a special discount.
          </p>
        </header>

        {/* ---------- Featured (active or next) ---------- */}
        <FeaturedEvent
          rec={upcoming}
          countdown={{ days, hours, mins, secs }}
          onUseCode={() => applyCoupon(upcoming.e.code, upcoming.e.discountPct)}
        />

        {/* ---------- All events grid ---------- */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((e) => (
            <EventCard key={e.slug} e={e} now={now} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------  Featured section  ----------
function FeaturedEvent({ rec, countdown, onUseCode }) {
  const { e, activeInfo, occ, next } = rec;
  const start = activeInfo.active ? activeInfo.start : next;
  const end = activeInfo.active ? activeInfo.end : getOccurrence(e, next.getFullYear()).end;
  const label = activeInfo.active ? "Happening Now" : "Next Up";

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center rounded-3xl border border-neutral-200 bg-white shadow-[0_12px_32px_rgba(17,17,17,0.06)] overflow-hidden">
      <div className="relative">
        <img
          src={e.image}
          alt={e.title}
          className="h-full w-full max-h-[360px] object-cover"
        />
        <div className="absolute left-4 top-4 rounded-full bg-[#ff6f1a] px-3 py-1 text-white text-xs shadow">
          {label}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-neutral-900">{e.title}</h2>
        <p className="mt-1 text-neutral-600">{e.blurb}</p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1">
            🗓 {formatRange(start, end)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1">
            💸 {e.discountPct}% off — code <strong className="tracking-wide">{e.code}</strong>
          </span>
        </div>

        {/* countdown */}
        <div className="mt-4 flex items-center gap-3">
          <CountdownPill label={activeInfo.active ? "Ends in" : "Starts in"} parts={countdown} />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="/reservations"
            className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 px-6 text-white hover:opacity-90"
          >
            Reserve a Table
          </a>
          <button
            type="button"
            onClick={onUseCode}
            className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-5 text-neutral-900 hover:bg-neutral-50"
          >
            Use Code: {e.code}
          </button>
        </div>
      </div>
    </div>
  );
}

function CountdownPill({ label, parts }) {
  const Cell = ({ v, t }) => (
    <div className="grid h-14 w-16 place-items-center rounded-xl border border-neutral-200 bg-white text-center">
      <div className="text-xl font-semibold">{String(v).padStart(2, "0")}</div>
      <div className="text-[11px] text-neutral-500">{t}</div>
    </div>
  );
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-neutral-600">{label}</span>
      <Cell v={parts.days} t="Days" />
      <Cell v={parts.hours} t="Hours" />
      <Cell v={parts.mins} t="Mins" />
      <Cell v={parts.secs} t="Secs" />
    </div>
  );
}

// ----------  Grid card for each event  ----------
function EventCard({ e, now }) {
  const info = isNowActive(e, now);
  const upcomingDate = nextStart(e, now);
  const occ = getOccurrence(e, upcomingDate.getFullYear());
  const status = info.active ? "Active" : "Upcoming";

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_24px_rgba(17,17,17,0.06)] overflow-hidden">
      <div className="relative">
        <img src={e.image} alt={e.title} className="h-44 w-full object-cover" />
        <div
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs text-white shadow
            ${info.active ? "bg-emerald-600" : "bg-neutral-900"}`}
        >
          {status}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-900">{e.title}</h3>
        <p className="mt-1 text-sm text-neutral-600">{e.blurb}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1">
            🗓 {formatRange(occ.start, occ.end)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1">
            💸 {e.discountPct}% off
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => applyCoupon(e.code, e.discountPct)}
            className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 bg-white px-4 text-sm hover:bg-neutral-50"
          >
            Use Code: {e.code}
          </button>
          <a
            href="/reservations"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#ff6f1a] px-4 text-sm text-white hover:opacity-95"
          >
            Book
          </a>
        </div>
      </div>
    </article>
  );
}
