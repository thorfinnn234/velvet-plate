import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ loading: false, msg: "" });

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return setStatus({ loading: false, msg: "Please fill the required fields." });
    }
    try {
      setStatus({ loading: true, msg: "" });
      // TODO: POST to your backend email/CRM endpoint
      await new Promise((r) => setTimeout(r, 1000));
      setStatus({ loading: false, msg: "Message sent. We’ll get back to you shortly." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus({ loading: false, msg: "Something went wrong. Try again." });
    }
  };

  return (
    <section className="relative isolate bg-white">
      {/* ornament */}
      <div
        className="pointer-events-none absolute -right-24 top-0 -z-10 hidden md:block h-[440px] w-[440px] bg-contain bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/leaves.svg')" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-8">
          <h1 className="font-serif text-3xl text-neutral-900">Contact Us</h1>
          <p className="mt-1 text-neutral-600">We’d love to host you. Reach out for reservations, events, or press.</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* form */}
          <form onSubmit={handleSubmit} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_12px_32px_rgba(17,17,17,0.06)] space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Full Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">Message *</label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]"
                placeholder="Tell us about your event, allergies, or any request."
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full rounded-full bg-[#ff7a1a] py-3 text-white font-medium hover:opacity-90 disabled:opacity-60"
            >
              {status.loading ? "Sending..." : "Send Message"}
            </button>

            {status.msg && (
              <p className="text-center text-sm text-neutral-700">{status.msg}</p>
            )}
          </form>

          {/* info panel */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_8px_24px_rgba(17,17,17,0.06)]">
              <h3 className="text-lg font-semibold text-neutral-900">Visit</h3>
              <p className="mt-1 text-neutral-600">
                Velvet Plate<br />
                12a Akin Adesola St, Victoria Island, Lagos
              </p>
              <div className="mt-3 grid gap-1 text-sm">
                <a href="tel:+2348012345678" className="text-neutral-900 hover:underline">+234 80 1234 5678</a>
                <a href="mailto:hello@velvetplate.com" className="text-neutral-900 hover:underline">hello@velvetplate.com</a>
              </div>
              <div className="mt-3 text-sm text-neutral-600">
                <div>Mon–Thu: 12:00–22:00</div>
                <div>Fri–Sat: 12:00–23:30</div>
                <div>Sun: 12:00–21:00</div>
              </div>
            </div>

            {/* map embed (replace with your real map place) */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-[0_8px_24px_rgba(17,17,17,0.06)]">
              <iframe
                title="Velvet Plate Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.985640365379!2d3.429!3d6.430!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf52d7a6b%3A0x0!2sVictoria%20Island!5e0!3m2!1sen!2sng!4v1699999999999"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
