export default function SpecialDishes() {
  const dishes = [
    {
      id: 1,
      name: "Lumpia w/ Sauce",
      price: 12,
      img: "/images//dish1 (2).png",
      desc:
        "Crisp rolls with savory filling, served with our house sweet chili.",
    },
    {
      id: 2,
      name: "Fish & Veggie",
      price: 18,
      img: "/images//dish2.png",
      desc:
        "Pan-seared fillet with seasonal greens and citrus beurre blanc.",
    },
    {
      id: 3,
      name: "Tofu Chili",
      price: 14,
      img: "/images/dish3.png",
      desc:
        "Silken tofu in slow-simmered chili, fresh herbs, toasted cumin.",
    },
    {
      id: 4,
      name: "Egg & Cucumber",
      price: 10,
      img: "/images/dish4.png",
      desc:
        "Soft-boiled eggs with dill-yogurt and pickled cucumber ribbons.",
    },
  ];

  return (
    <section className="relative isolate ">
      {/* background ornaments */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-8 top-6 h-[220px] w-[220px] opacity-20 bg-no-repeat bg-contain hidden md:block"
          style={{ backgroundImage: "url('/images/dishbackground.png')" }}
          aria-hidden="true"
        />
        <div
          className="absolute right-6 top-10 h-[260px] w-[260px] opacity-10 rotate-6 bg-no-repeat bg-contain hidden md:block"
          style={{ backgroundImage: "url('/leas.svg')" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-10 right-8 h-[220px] w-[220px] opacity-30 -rotate-6 bg-no-repeat bg-contain hidden md:block"
          style={{ backgroundImage: "url('/images/nobackgroundflower.png')" }}
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14">
        {/* heading */}
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-900">
            Our Special Dishes
          </h2>
          <p className="mt-2 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((d) => (
            <article
              key={d.id}
              className="relative  bg-white p-10 shadow-[0_8px_24px_rgba(17,17,17,0.06)] rounded-[50px_2px_50px_2px] "
            >
              {/* price badge */}
              <div className="absolute right-15 top-4 inline-flex items-center z-10 justify-center h-8 min-w-8 rounded-full bg-neutral-900 px-2 text-xs text-white">
                ${d.price}
              </div>

              {/* image */}
              <div className="mx-auto -mt-10 mb-8 h-35 w-40 overflow-hidden relative bottom-8">
                <img
                  src={d.img}
                  alt={d.name}
                  className="h-full w-full object-cover "
                  loading="lazy"
                />
              </div>

              {/* text */}
              <h3 className="text-center text-base font-semibold text-neutral-900">
                {d.name}
              </h3>
              <p className="mt-2 text-center text-sm text-neutral-600">
                {d.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
