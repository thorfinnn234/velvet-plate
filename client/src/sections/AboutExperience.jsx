export default function AboutExperience() {
  return (
    <section className="relative isolate bg-white">
      {/* ornaments */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-6 top-8 h-[240px] w-[240px] opacity-20 bg-no-repeat bg-contain hidden md:block"
          style={{ backgroundImage: "url('/images/nobackgroundflower.png')" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-900">A Fine Dining Experience</h2>
          <p className="mt-4 text-neutral-600">
            Velvet Plate blends seasonal ingredients, modern techniques, and a warm ambiance.
            Our tasting menus evolve monthly to highlight the very best from our producers.
          </p>

          <ul className="mt-6 grid gap-3 text-neutral-800">
            <li>• Chef-curated tasting menus</li>
            <li>• Seasonal & locally sourced produce</li>
            <li>• Intimate ambience with sommelier pairings</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <img src="/images/about-1.jpg" alt="" className="h-48 w-full object-cover rounded-[60px_2px_60px_2px]" />
          <img src="/images/about-2.jpg" alt="" className="h-48 w-full object-cover rounded-[60px_2px_60px_2px]" />
          <img src="/images/about-3.jpg" alt="" className="col-span-2 h-56 w-full object-cover rounded-[60px_2px_60px_2px]" />
        </div>
      </div>
    </section>
  );
}
