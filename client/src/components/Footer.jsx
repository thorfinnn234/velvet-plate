import Logo from "../assets/navlogo.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative text-neutral-700">
      {/* Soft top divider */}
      <div className="h-px w-full bg-gradient-to-r from-neutral-200 via-neutral-200/60 to-transparent" />

      {/* Background ornament */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-no-repeat bg-center opacity-60"
        style={{
          backgroundImage: "url('/footer-ornament.svg')",
          backgroundSize: "min(70vw, 700px)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Top rows */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand / blurb */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2">
              <img src={Logo} className="h-8 w-8" alt="Velvet Plate logo" />
              <span className="font-dispaly text-2xl font-semibold text-black">
            Velvet Plate
          </span>
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore.{" "}
              <a className="underline text-neutral-700" href="#">
                Learn more
              </a>
            </p>

            {/* Opening hours */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold tracking-wide text-neutral-500">
                OPENING HOURS
              </h4>
              <ul className="mt-3 divide-y divide-neutral-200 overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <HourRow day="Monday – Friday" time="8:00 am – 9:00 pm" />
                <HourRow day="Saturday" time="8:00 am – 9:00 pm" />
                <HourRow day="Sunday" time="CLOSED" />
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <SectionTitle>NAVIGATION</SectionTitle>
            <ul className="mt-3 space-y-2 text-sm">
              <li><FooterLink to="/menu">Menu</FooterLink></li>
              <li><FooterLink to="/about">About us</FooterLink></li>
              <li><FooterLink to="/contact">Contact us</FooterLink></li>
              <li><FooterLink to="/mains">Main dishes</FooterLink></li>
            </ul>
          </div>

          {/* Dishes */}
          <div className="md:col-span-3">
            <SectionTitle>DISHES</SectionTitle>
            <ul className="mt-3 space-y-2 text-sm">
              <li><ALink href="#">Fish &amp; Veggies</ALink></li>
              <li><ALink href="#">Tofu Chili</ALink></li>
              <li><ALink href="#">Egg &amp; Cucumber</ALink></li>
              <li><ALink href="#">Lumpia w/Sauce</ALink></li>
            </ul>
          </div>
        </div>

        {/* Social + CTA bar */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Social href="#" label="Facebook">
              <i className="bi bi-facebook" />
            </Social>
            <Social href="#" label="Instagram">
              <i className="bi bi-instagram" />
            </Social>
            <Social href="#" label="Twitter / X">
              <i className="bi bi-twitter-x" />
            </Social>
          </div>

          {/* Simple contact CTA (neutral only) */}
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <span className="inline-flex h-8 items-center rounded-full border border-neutral-200 bg-white px-3">
              12 Plateau Ave, VI Lagos
            </span>
            <span className="inline-flex h-8 items-center rounded-full border border-neutral-200 bg-white px-3">
              +234 (0) 800 000 0000
            </span>
          </div>
        </div>

        <hr className="my-8 border-neutral-200" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} Velvet Plate. All rights reserved.{" "}
            Designed by{" "}
            <a className="text-neutral-700 underline" href="#">
              Thorfinn
            </a>
          </div>
          <div className="flex gap-6">
            <ALink href="#">Terms of Service</ALink>
            <ALink href="#">Privacy Policy</ALink>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- tiny helpers (neutral-only UI polish) ---------- */

function SectionTitle({ children }) {
  return (
    <h4 className="text-xs font-semibold tracking-wide text-neutral-500">
      {children}
    </h4>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 hover:text-neutral-900 focus:outline-none focus:ring-4 focus:ring-[rgba(0,0,0,0.06)] rounded"
    >
      <span className="h-px w-4 bg-neutral-200 transition-all group-hover:w-6" />
      <span>{children}</span>
    </Link>
  );
}

function ALink({ href, children }) {
  return (
    <a
      href={href}
      className="hover:text-neutral-900 focus:outline-none focus:ring-4 focus:ring-[rgba(0,0,0,0.06)] rounded"
    >
      {children}
    </a>
  );
}

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-4 focus:ring-[rgba(0,0,0,0.06)]"
    >
      {children}
    </a>
  );
}

function HourRow({ day, time }) {
  return (
    <li className="flex items-center justify-between px-4 py-2 text-sm">
      <span className="text-neutral-800">{day}</span>
      <span className="text-neutral-500">{time}</span>
    </li>
  );
}
