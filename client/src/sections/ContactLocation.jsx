import { useState } from "react";

export default function ContactLocation() {
  const [copied, setCopied] = useState(false);
  const phone = "+2348000000000";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section className="relative isolate bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 md:grid-cols-2 md:items-center">
        {/* Left side — contact details */}
        <div>
          <h3 className="font-serif text-2xl md:text-3xl text-neutral-900">
            Visit Us
          </h3>
          <p className="mt-3 text-neutral-600">
            12a Akin Adesola St, Victoria Island, Lagos
          </p>

          <div className="mt-4 text-neutral-700 space-y-1">
            <div>Mon–Fri: 8:00 am – 9:00 pm</div>
            <div>Sat: 8:00 am – 9:00 pm</div>
            <div>Sun: Closed</div>
          </div>

          {/* Phone + Copy button */}
          <div className="mt-5 inline-flex items-center gap-2">
            <a
              href={`tel:${phone}`}
              className="text-[#ff6f1a] font-medium hover:underline"
            >
              +234 (0) 800 000 0000
            </a>

            <button
              onClick={handleCopy}
              className="relative text-[#ff6f1a] hover:text-[#e65f10] transition"
              title="Copy number"
              aria-label="Copy number"
            >
              <i className="bi bi-clipboard text-lg cursor-pointer" />
              {copied && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-white bg-[#ff6f1a] rounded-full px-2 py-[1px] shadow animate-fade">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Right side — Google Map */}
        <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-[0_8px_24px_rgba(17,17,17,0.06)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7377144424972!2d3.4215840744547332!3d6.427733293563323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5320540f495%3A0xdf5ebf20e9749925!2s12%20Akin%20Adesola%20St%2C%20Victoria%20Island%2C%20Lagos%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1761733101232!5m2!1sen!2sng"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes fade {
          0% { opacity: 0; transform: translate(-50%, -4px); }
          10% { opacity: 1; transform: translate(-50%, 0); }
          90% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -4px); }
        }
        .animate-fade {
          animation: fade 2s ease forwards;
        }
      `}</style>
    </section>
  );
}
