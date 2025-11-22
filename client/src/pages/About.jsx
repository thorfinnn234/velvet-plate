export default function About() {
  return (
    <section className="relative isolate bg-white">
      {/* faint ornament */}
      <div
        className="pointer-events-none absolute -left-24 top-0 -z-10 hidden md:block h-[440px] w-[440px] bg-contain bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/leaves.svg')" }}
        aria-hidden="true"
      />

      {/* Hero */}
      <div className="mx-auto max-w-6xl px-4 pt-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="font-serif text-4xl leading-tight text-neutral-900">
              The story of <span className="text-[#ff7a1a]">Velvet Plate</span>
            </h1>
            <p className="mt-4 text-neutral-600">
              We’re a modern fine-dining restaurant where seasonal ingredients
              meet classic technique. Our kitchen obsesses over balance—texture,
              aroma, temperature—so every plate feels inevitable.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-neutral-200 shadow-[0_12px_32px_rgba(17,17,17,0.06)]">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop"
              alt="Dining room"
              className="h-72 w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mx-auto mt-12 max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-neutral-900">Our values</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Seasonality",
              body: "Menus evolve with the market—peak-season produce, responsibly sourced seafood, and heritage meats.",
            },
            {
              title: "Craft",
              body: "We ferment, smoke, age, and bake in-house. Precision technique in service of flavor.",
            },
            {
              title: "Warmth",
              body: "Hospitality first. Candles, linen, and a team that remembers your favorite table.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_8px_24px_rgba(17,17,17,0.06)]"
            >
              <div className="h-10 w-10 rounded-xl bg-[#ffefe6] grid place-items-center text-[#ff7a1a] font-semibold">
                {v.title.slice(0, 1)}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900">
                {v.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-600">{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chef team */}
      <div className="mx-auto mt-12 max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-neutral-900">Our kitchen</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Chef Amara Ogun",
              role: "Executive Chef",
              img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1600&auto=format&fit=crop",
            },
            {
              name: "Luca Bellini",
              role: "Pastry Chef",
              img: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1600&auto=format&fit=crop",
            },
            {
              name: "Sefa Adekoya",
              role: "Chef de Cuisine",
              img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop",
            },
          ].map((p) => (
            <article
              key={p.name}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_24px_rgba(17,17,17,0.06)]"
            >
              <img
                src={p.img}
                alt={p.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <div className="font-semibold text-neutral-900">{p.name}</div>
                <div className="text-sm text-neutral-600">{p.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mx-auto mt-12 max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-neutral-900 text-center">
          Our Chefs & Staff
        </h2>
        <p className="mt-2 text-center text-neutral-600 max-w-2xl mx-auto">
          Behind every dish is a team of passionate chefs blending global
          inspiration with local soul.
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {[
            {
              name: "Chef Amara Ogun",
              role: "Executive Chef",
              img: "https://plus.unsplash.com/premium_photo-1661778091956-15dbe6e47442?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=300",
            },
            {
              name: "Luca Bellini",
              role: "Pastry Chef",
              img: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=300",
            },
            {
              name: "Sefa Adekoya",
              role: "Chef de Cuisine",
              img: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNoZWZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=300",
            },
            {
              name: "Mei Tanaka",
              role: "Sous Chef",
              img: "https://images.unsplash.com/photo-1697898109582-40f15c65f174?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNoZWZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=300",
            },
            {
              name: "Kelechi Okoye",
              role: "Sommelier",
              img: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNoZWZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=300",
            },
            {
              name: "Zuri Mensah",
              role: "Restaurant Manager",
              img: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNoZWZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=300",
            },
          ].map((p) => (
            <div key={p.name} className="text-center">
              {/* circular photo */}
              <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-[#ff7a1a]/10 shadow-[0_8px_24px_rgba(17,17,17,0.08)] transition-transform hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(17,17,17,0.12)]">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {/* soft orange halo */}
                <div className="absolute inset-0 rounded-full ring-2 ring-[#ff7a1a]/20"></div>
              </div>

              {/* info */}
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                {p.name}
              </h3>
              <p className="text-sm text-neutral-600">{p.role}</p>

              {/* accent line */}
              <div className="mx-auto mt-2 h-0.5 w-8 rounded-full bg-[#ff7a1a]/60"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mx-auto my-12 max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-neutral-900">Milestones</h2>
        <div className="mt-6 space-y-4">
          {[
            { year: "2019", note: "Opened our doors on Victoria Island." },
            {
              year: "2021",
              note: "Expanded the cellar; launched tasting menu.",
            },
            { year: "2024", note: "Chef’s table + private dining lounge." },
          ].map((t) => (
            <div key={t.year} className="flex items-start gap-4">
              <div className="mt-1 h-6 w-6 rounded-full bg-[#ffefe6] grid place-items-center text-[#ff7a1a] text-xs font-semibold">
                {t.year.slice(-2)}
              </div>
              <div>
                <div className="font-medium text-neutral-900">{t.year}</div>
                <div className="text-neutral-600">{t.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
