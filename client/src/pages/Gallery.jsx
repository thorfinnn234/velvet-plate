import { useEffect, useMemo, useState } from "react";

const CATEGORIES = ["All", "Food", "Interior", "Chefs", "Guests", "Videos"];

/** Curated media: Unsplash images (stable crop params) + a few MP4 videos (with Unsplash posters) */
const MEDIA = [
  // ===== Food (Unsplash)
  { type: "image", cat: "Food", w: 1600, h: 1066,
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop" }, // steak plate
  { type: "image", cat: "Food", w: 1600, h: 1067,
    src: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=1600&auto=format&fit=crop" }, // scallops
  { type: "image", cat: "Food", w: 1600, h: 1066,
    src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=300" }, // dessert plating
  { type: "image", cat: "Food", w: 1200, h: 1600,
    src: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1200&auto=format&fit=crop" }, // salad vertical
  { type: "image", cat: "Food", w: 1600, h: 1066,
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop" }, // pasta
  { type: "image", cat: "Food", w: 1600, h: 1066,
    src: "https://images.unsplash.com/photo-1578020226954-96c7a7fcf94c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZpc2glMjBkaXNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=300" }, // fish dish
  { type: "image", cat: "Food", w: 1600, h: 1066,
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop" }, // brunch plate
  { type: "image", cat: "Food", w: 1600, h: 1066,
    src: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=1600&auto=format&fit=crop" }, // chocolate cake

  // ===== Interior (Unsplash)
  { type: "image", cat: "Interior", w: 1600, h: 1066,
    src: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1600&auto=format&fit=crop" }, // dining room
  { type: "image", cat: "Interior", w: 1200, h: 1600,
    src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop" }, // cozy table vertical
  { type: "image", cat: "Interior", w: 1600, h: 1066,
    src: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1600&auto=format&fit=crop" }, // bar area
  { type: "image", cat: "Interior", w: 1600, h: 1066,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop" }, // warm interior

  // ===== Chefs (Unsplash)
  { type: "image", cat: "Chefs", w: 1600, h: 1066,
    src: "https://plus.unsplash.com/premium_photo-1661778091956-15dbe6e47442?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=300" }, // chef plating
  { type: "image", cat: "Chefs", w: 1600, h: 1066,
    src: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=300" }, // chef in kitchen
  { type: "image", cat: "Chefs", w: 1200, h: 1600,
    src: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNoZWZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=300" }, // garnish vertical

  // ===== Guests (Unsplash)
  { type: "image", cat: "Guests", w: 1600, h: 1067,
    src: "https://images.unsplash.com/photo-1630276740239-5d9c23d49531?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y291cGxlJTIwZGluaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=300" }, // couple dining
  { type: "image", cat: "Guests", w: 1600, h: 1066,
    src: "https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1600&auto=format&fit=crop" }, // cheers
  { type: "image", cat: "Guests", w: 1200, h: 1600,
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop" }, // friends vertical

  // ===== Videos (Pexels/Coverr MP4s) + Unsplash posters
  { type: "video", cat: "Videos", w: 1600, h: 900,
    src: "https://cdn.coverr.co/videos/coverr-food-preparation-8720/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1600&auto=format&fit=crop" },
  { type: "video", cat: "Videos", w: 1600, h: 900,
    src: "https://cdn.coverr.co/videos/coverr-dinner-with-candles-7920/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1600&auto=format&fit=crop" },
  { type: "video", cat: "Videos", w: 1080, h: 1350,
    src: "https://cdn.coverr.co/videos/coverr-pouring-sauce-8082/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1544025162-8e8b1b275f82?q=80&w=1080&auto=format&fit=crop" },
];

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [openIdx, setOpenIdx] = useState(-1);
  const [slice, setSlice] = useState(18);

  const pool = useMemo(() => (cat === "All" ? MEDIA : MEDIA.filter((m) => m.cat === cat)), [cat]);
  const visible = useMemo(() => pool.slice(0, slice), [pool, slice]);

  useEffect(() => setSlice(18), [cat]);

  return (
    <section className="relative isolate bg-white">
      <div
        className="pointer-events-none absolute -left-24 top-0 -z-10 hidden md:block h-[440px] w-[440px] bg-contain bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/leaves.svg')" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl text-neutral-900">Gallery</h1>
            <p className="mt-1 text-neutral-600">Food artistry, interiors, our chefs — plus a few motion moments.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`h-9 rounded-full px-4 text-sm border transition ${
                  cat === c ? "bg-neutral-900 text-white border-neutral-900"
                            : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </header>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {visible.map((m, idx) => (
            <Card key={m.src} media={m} onOpen={() => setOpenIdx(idx)} />
          ))}
        </div>

        {visible.length < pool.length && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setSlice((s) => s + 12)}
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-5 text-sm hover:bg-neutral-50"
            >
              Load more
            </button>
          </div>
        )}
      </div>

      {openIdx >= 0 && (
        <Lightbox
          items={pool}
          index={openIdx}
          onClose={() => setOpenIdx(-1)}
          onPrev={() => setOpenIdx((p) => (p > 0 ? p - 1 : p))}
          onNext={() => setOpenIdx((p) => (p < pool.length - 1 ? p + 1 : p))}
        />
      )}
    </section>
  );
}

function Card({ media, onOpen }) {
  const ratio = media.w && media.h ? (media.h / media.w) * 100 : 66.66;
  return (
    <figure className="relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_24px_rgba(17,17,17,0.06)]">
      <div className="relative w-full" style={{ paddingTop: `${ratio}%` }}>
        {media.type === "image" ? (
          <img src={media.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <>
            <img src={media.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 grid place-items-center">
              <button
                onClick={onOpen}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow hover:bg-white"
                aria-label="Play"
              >
                ▶
              </button>
            </div>
          </>
        )}
      </div>
      <figcaption className="flex items-center justify-between p-3 text-sm text-neutral-600">
        <span>{media.cat}</span>
        <button
          onClick={onOpen}
          className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-neutral-800 hover:bg-neutral-50"
        >
          View
        </button>
      </figcaption>
    </figure>
  );
}

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const m = items[index];
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-black">
          {m.type === "image" ? (
            <img src={m.src} alt="" className="mx-auto max-h-[90vh] w-auto object-contain" />
          ) : (
            <video
              src={m.src}
              poster={m.poster}
              controls
              autoPlay
              className="mx-auto max-h-[90vh] w-auto object-contain"
            />
          )}
          <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow hover:bg-white">✕</button>
          <button onClick={onPrev} aria-label="Prev" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white">‹</button>
          <button onClick={onNext} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white">›</button>
        </div>
      </div>
    </div>
  );
}
