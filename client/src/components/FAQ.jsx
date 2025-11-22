import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Do I need a reservation before visiting Velvet Plate?",
    a: "Reservations are highly recommended, especially during weekends and holidays. You can easily book a table online through our reservation form or by calling our restaurant directly.",
  },
  {
    q: "Do you offer takeout or delivery?",
    a: "Yes! You can order takeout directly from our website, and we partner with trusted delivery services for quick, safe deliveries right to your door.",
  },
  {
    q: "Can I host private events at Velvet Plate?",
    a: "Absolutely. We offer private dining rooms and event packages for birthdays, corporate gatherings, or romantic celebrations. Just reach out through our Contact page or call our event manager.",
  },
  {
    q: "Are there vegetarian or vegan options available?",
    a: "Yes — our chefs prepare several fine-dining plant-based dishes crafted from seasonal, locally-sourced ingredients.",
  },
  {
    q: "What are your opening hours?",
    a: "We’re open Monday to Sunday, 11:00 AM – 11:00 PM. Holiday hours are always announced in advance on our website and Instagram page.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-white py-16 px-4" id="faq">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-serif text-center text-neutral-900 mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-neutral-600 mb-10">
          Here are a few things our guests often ask us 🌿
        </p>

        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className="border border-neutral-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left px-5 py-4 font-medium text-neutral-900 hover:bg-neutral-50 transition"
                >
                  <span>{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#ff7a1a] text-xl font-bold cursor-pointer"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-5 pb-4 text-neutral-700 text-sm leading-relaxed bg-neutral-50/50"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
