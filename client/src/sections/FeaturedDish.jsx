export default function FeaturedDish() {
  return (
    <section className="relative isolate bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        {/* image */}
        <div
          className="absolute left-6 top-8 h-[240px] w-[240px] opacity-30 bg-no-repeat bg-contain hidden md:block"
          style={{ backgroundImage: "url('/images/nobackgroundflower.png')" }}
        />
        <div className="relative">
          <img
            src="/images/feature.jpg"
            alt="Velvet Pepper Steak"
            className="w-full h-[360px] md:h-[420px] object-cover rounded-[18px]"
          />
          <div className="absolute left-4 top-4 rounded-full bg-[#ff6f1a] px-3 py-1 text-white text-xs shadow">
            Chef’s Special
          </div>
        </div>

        {/* text */}
        <div>
          <h3 className="font-serif text-2xl md:text-3xl text-neutral-900">
            Signature of the Month
          </h3>
          <h4 className="mt-2 text-lg font-medium text-[#ff6f1a]">
            Velvet Steak and Chips
          </h4>

          <p className="mt-3 text-neutral-600">
            Our Chef’s exclusive creation for this month — a perfectly seared
            ribeye steak, brushed with truffle butter and cracked black pepper,
            served with roasted garlic mash and a red wine demi-glace.
          </p>

          <div className="mt-6">
            <a
              href="#"
              className="inline-flex h-12 items-center rounded-[20px_2px_20px_2px] bg-neutral-900 px-6 text-white hover:opacity-90 transition"
            >
              Try It Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
