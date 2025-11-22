import { useEffect, useMemo, useRef, useState } from "react";
import { useCartStore } from "../store/cart";

const CATEGORIES = ["Beef", "Chicken", "Seafood", "Vegetarian", "Dessert"];

export default function Menu() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  const add = useCartStore((s) => s.add);
  const open = useCartStore((s) => s.open);

  // Cache for per-meal details (loaded lazily on hover)
  const [details, setDetails] = useState({}); // { [idMeal]: { instructions, area, category } }
  const fetchDetail = async (idMeal) => {
    if (details[idMeal]) return;
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const data = await res.json();
      const m = data?.meals?.[0];
      if (!m) return;
      const snippet =
        (m.strInstructions || "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 110) + (m.strInstructions && m.strInstructions.length > 110 ? "…" : "");
      setDetails((d) => ({
        ...d,
        [idMeal]: {
          instructions: snippet,
          area: m.strArea,
          category: m.strCategory,
        },
      }));
    } catch {
      // fail silently; overlay will just omit details
    }
  };

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`
      );
      const data = await res.json();
      if (!ignore) {
        setMeals(data.meals || []);
        setLoading(false);
        setQuery("");
      }
    }
    load();
    return () => (ignore = true);
  }, [category]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const makePrice = (idMeal) => {
    const base = parseInt(idMeal.slice(-2), 10) || 12;
    return Math.round((10 + (base % 15)) * 100) / 100;
  };

  const filteredMeals = useMemo(() => {
    const t = query.trim().toLowerCase();
    if (!t) return meals;
    return meals.filter((m) => m.strMeal.toLowerCase().includes(t));
  }, [meals, query]);

  const resultsLabel =
    loading ? "Loading…" : `${filteredMeals.length} item${filteredMeals.length === 1 ? "" : "s"}`;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-neutral-900">Menu</h1>
          <span className="text-sm text-neutral-500">{resultsLabel}</span>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`h-9 rounded-[20px_2px_20px_2px] px-4 text-sm border transition
                ${
                  category === c
                    ? "bg-[#ff6f1a] text-white border-[#ff6f1a] shadow-[0_6px_18px_rgba(255,111,26,0.25)]"
                    : "bg-white text-neutral-800 border-neutral-200 hover:border-[#ff6f1a]/40 hover:bg-[#ff6f1a]/5"
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="mt-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative w-full sm:max-w-md"
          role="search"
        >
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
            <i className="bi bi-search" />
          </span>

          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes (press / to focus)"
            className="w-full h-11 rounded-xl border border-neutral-200 bg-white pl-10 pr-20 text-sm
                       focus:outline-none focus:ring-4 focus:ring-[#ff6f1a]/20"
          />

          <div className="absolute inset-y-0 right-2 flex items-center gap-2">
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="px-2 py-1 text-2xl cursor-pointer text-red-600"
                aria-label="Clear search"
              >
                <i className="bi bi-x" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : filteredMeals.length > 0
          ? filteredMeals.map((m) => {
              const price = makePrice(m.idMeal);
              return (
                <MealCard
                  key={m.idMeal}
                  meal={m}
                  price={price}
                  detail={details[m.idMeal]}
                  onHover={() => fetchDetail(m.idMeal)}
                  onAdd={() => {
                    add({ id: m.idMeal, name: m.strMeal, price, image: m.strMealThumb });
                    open();
                  }}
                />
              );
            })
          : <NoResults query={query} />}
      </div>
    </section>
  );
}

/* ---------- Card (image-first with hover overlay) ---------- */

function MealCard({ meal, price, detail, onHover, onAdd }) {
  return (
    <article
      className="group relative overflow-hidden rounded-[32px_2px_32px_2px] border border-neutral-200 bg-white
                 shadow-[0_8px_24px_rgba(17,17,17,0.06)]"
      onMouseEnter={onHover}
      onTouchStart={onHover}
    >
      {/* Image only (base state) */}
      <div className="relative aspect-[4/3] w-full">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Price pill (always visible) */}
        <span className="absolute right-3 top-3 select-none rounded-full bg-[#ff6f1a] px-3 py-1.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(255,111,26,0.35)]">
          ${price.toFixed(2)}
        </span>
      </div>

      {/* Hover overlay */}
      <div
        className="
          pointer-events-none absolute inset-0 flex flex-col justify-end
          bg-gradient-to-t from-black/70 via-black/30 to-transparent
          opacity-0 transition-opacity duration-300 group-hover:opacity-100
          md:pointer-events-none
        "
        aria-hidden="true"
      />

      {/* Overlay content */}
      <div
        className="
          absolute inset-x-0 bottom-0 p-4
          opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-300
        "
      >
        <div className="rounded-2xl bg-white/90 backdrop-blur px-4 py-3 shadow">
          <h3 className="line-clamp-1 text-base font-semibold text-neutral-900">{meal.strMeal}</h3>
          <p className="mt-1 line-clamp-2 text-xs text-neutral-600">
            {detail
              ? `${detail.instructions}`
              : "Delicious, freshly prepared — hover to load details…"}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-900">${price.toFixed(2)}</span>

            <button
              type="button"
              onClick={onAdd}
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6f1a]
                         text-white shadow-[0_10px_22px_rgba(255,111,26,0.35)] transition hover:opacity-95
                         focus:outline-none focus:ring-4 focus:ring-[#ff6f1a]/30"
              aria-label={`Add ${meal.strMeal} to cart`}
            >
              <i className="bi bi-bag-plus text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: show a minimal footer so users can tap without hover */}
      <div className="md:hidden">
        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="flex items-center justify-between rounded-2xl bg-white/95 px-3 py-2 shadow">
            <span className="line-clamp-1 text-sm font-medium text-neutral-900">{meal.strMeal}</span>
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ff6f1a]
                         text-white shadow transition active:scale-95"
              aria-label={`Add ${meal.strMeal} to cart`}
            >
              <i className="bi bi-bag-plus text-base" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Skeleton + Empty ---------- */

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[32px_2px_32px_2px] border border-neutral-200 bg-white">
      <div className="aspect-[4/3] w-full bg-neutral-200/70" />
      <div className="p-4">
        <div className="h-4 w-1/2 rounded bg-neutral-200/70" />
        <div className="mt-2 h-3 w-1/3 rounded bg-neutral-200/70" />
      </div>
    </div>
  );
}

function NoResults({ query }) {
  return (
    <div className="col-span-full grid place-items-center rounded-xl border border-neutral-200 bg-white py-14">
      <div className="text-center">
        <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-neutral-200 text-neutral-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 21l-4.2-4.2m1.2-4.8a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-base font-medium text-neutral-900">No matches</p>
        <p className="mt-1 text-sm text-neutral-500">
          We couldn’t find “{query}”. Try another dish name.
        </p>
      </div>
    </div>
  );
}
