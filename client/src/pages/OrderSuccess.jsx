// src/pages/OrderSuccess.jsx
import { useEffect } from "react";
import { useCartStore } from "../store/cart";

export default function OrderSuccess() {
  const clear = useCartStore(s => s.clear);

  useEffect(() => {
    // if you saved vp_pending_ref earlier, re-verify here if needed
    const ref = localStorage.getItem("vp_pending_ref");
    if (ref) {
      // Optionally call your verify endpoint again, then:
      clear();
      localStorage.removeItem("vp_pending_ref");
    }
  }, [clear]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Payment successful 🎉</h1>
      <p className="mt-2 text-neutral-600">Your order has been received.</p>
    </section>
  );
}
