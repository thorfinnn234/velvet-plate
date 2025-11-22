import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import SpecialDishes from "../sections/SpecialDishes";
import AboutExperience from "../sections/AboutExperience";
import FeaturedDish from "../sections/FeaturedDish";
import Testimonials from "../sections/Testimonial";
import StatsStrip from "../sections/StatsStrip";
import ReservationCTA from "../sections/ReservationCTA";
import ContactLocation from "../sections/ContactLocation";
import FAQ from "../components/FAQ";


const slides = ["/images/hero1.jpg", "/images/hero2.jpg", "/images/hero3.jpg"];

export default function Home() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* 🌿 Background ornaments */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* top-right ornament */}
        <div
          className="absolute -top-0 -right-10 h-[420px] w-[420px] bg-no-repeat bg-contain opacity-20"
          style={{
            backgroundImage: "url('/images/nobackgroundflower.png')",
          }}
          aria-hidden="true"
        />
        {/* bottom-left ornament (mirrored) */}
        <div
          className="absolute -bottom-16 -left-16 h-[480px] w-[480px] bg-no-repeat bg-contain opacity-20 rotate-6 -scale-x-100"
          style={{
            backgroundImage: "url('/images/flowerdec.png')",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -top-50 -left-5 h-[480px] w-[480px] bg-no-repeat bg-contain opacity-20 rotate-6 -scale-x-100"
          style={{
            backgroundImage: "url('/images/stroke.png')",
          }}
          aria-hidden="true"
        />
      </div>

      {/* 🌸 Content */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:items-center md:py-16">
        {/* Left: headline + copy + buttons */}
        <div>
          <h1 className="font-serif text-4xl leading-tight text-neutral-900 md:text-5xl">
            We provide the <span className="block">best food for you</span>
          </h1>

          <p className="mt-4 max-w-md text-neutral-600">
            At Velvet Plate, every dish is crafted with passion, blending
            classic flavors and modern artistry to create unforgettable dining
            moments that linger long after the last bite.
          </p>

          {/* buttons */}
          <div className="mt-6 flex items-center gap-5">
            <Button className="bg-neutral-900 cursor-pointer w-40">
              <Link to="/menu">Menu</Link>
            </Button>

            <Button className="bg-[#ff6f1a] cursor-pointer w-40">
              <Link to="/eservationsCTA">Book a table</Link>
            </Button>
          </div>

          {/* social icons */}
          <div className="mt-8 flex items-center gap-4">
            <a
              href="http://facebook.com/"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center text-2xl text-neutral-900 hover:text-[#ff6f1a] transition"
            >
              <i className="bi bi-facebook" />
            </a>
            <a
              href="http://instagram.com/"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center text-2xl text-neutral-900 hover:text-[#ff6f1a] transition"
            >
              <i className="bi bi-instagram" />
            </a>
            <a
              href="http://instagram.com/"
              aria-label="Twitter"
              className="inline-flex h-9 w-9 items-center justify-center text-2xl text-neutral-900 hover:text-[#ff6f1a] transition"
            >
              <i className="bi bi-twitter-x" />
            </a>
          </div>
        </div>

        {/* Right: slider + decorative plate */}
        <div className="relative">
          <HeroSlider
            images={slides}
            intervalMs={3000}
            className="object-cover"
          />

          {/* Plate image */}
          <img
            src="/images/plateeee.png"
            alt="Decorative food plate"
            className="pointer-events-none select-none absolute bottom-10 -left-[100px] w-[260px]"
          />
        </div>
      </div>
      <SpecialDishes />
      <AboutExperience />
      <FeaturedDish />
      <Testimonials />
      <StatsStrip />
      <ReservationCTA />
      <ContactLocation />
      <FAQ />

    </section>
  );
}

/** 🍽️ Simple auto slider (fade) with Tailwind */
function HeroSlider({ images, intervalMs = 4000 }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer.current);
  }, [images.length, intervalMs]);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[100px_10px_100px_10px] border border-neutral-200 shadow-[0_12px_36px_rgba(17,17,17,0.12)]">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      {/* slider dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} />
        ))}
      </div>
    </div>
  );
}
