import { useMemo, useState } from "react";
import { useCartStore } from "../store/cart";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    note: "",
  });

  if (!token) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location.pathname || "/checkout" }}
      />
    );
  }

  // 🧮 totals
  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  const coupon = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("vp_coupon")) || null;
    } catch {
      return null;
    }
  }, []);
  const discount = coupon ? Math.round((subtotal * coupon.pct) / 100) : 0;
  const total = Math.max(0, subtotal - discount);

  // 🧾 Paystack handler
  const handlePaystackPayment = () => {
    if (!window?.PaystackPop) {
      alert("Paystack couldn’t load. Please check your internet connection.");
      return;
    }

    const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!PAYSTACK_KEY) {
      alert("Missing VITE_PAYSTACK_PUBLIC_KEY in .env file.");
      return;
    }

    setLoading(true);
    const ref = `VELVET_${Date.now()}`;

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: user?.email || "customer@example.com",
      amount: total * 100,
      currency: "NGN",
      ref,
      metadata: {
        custom_fields: [
          { display_name: "Name", variable_name: "customer_name", value: form.name },
          { display_name: "Phone", variable_name: "phone_number", value: form.phone },
          { display_name: "Address", variable_name: "address", value: form.address },
          { display_name: "Note", variable_name: "note", value: form.note },
        ],
      },
      callback: function (response) {
        console.log("✅ Payment successful:", response);
        alert("Payment successful 🎉\nYour order has been received!");
        clear();
        localStorage.removeItem("vp_coupon");
        navigate("/order/success", { replace: true });
        setMsg("Payment successful 🎉 Your order has been received!");
        setLoading(false);
      },
      onClose: function () {
        setLoading(false);
        alert("Transaction canceled ❌");
      },
    });

    handler.openIframe();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields.");
      return;
    }
    setShowForm(false);
    handlePaystackPayment();
  };

  // 🧃 UI
  if (!items || items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 bg-white">
        <h1 className="mb-6 font-serif text-3xl text-neutral-900">Checkout</h1>
        <p className="text-neutral-600">Your cart is empty.</p>
        <button
          onClick={() => navigate("/menu")}
          className="mt-4 rounded-full border border-neutral-300 bg-white px-5 py-2 text-neutral-800 hover:bg-neutral-50"
        >
          Browse the menu
        </button>
      </section>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-12 bg-white">
        <h1 className="mb-6 font-serif text-3xl text-neutral-900">Checkout</h1>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-neutral-600">
                  {it.qty} × ₦{Number(it.price).toLocaleString()}
                </div>
              </div>
              <div className="font-semibold">
                ₦{Number(it.qty * it.price).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2 border-t pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Subtotal</span>
            <span className="font-medium">₦{subtotal.toLocaleString()}</span>
          </div>

          {coupon && (
            <div className="flex justify-between text-emerald-700">
              <span>
                Coupon (<strong>{coupon.code}</strong>)
              </span>
              <span>- ₦{discount.toLocaleString()}</span>
            </div>
          )}

          <hr className="my-2" />

          <div className="flex justify-between text-base">
            <span>Total</span>
            <span className="text-lg font-semibold">
              ₦{total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            disabled={loading}
            className="flex-1 rounded-full bg-[#ff6f1a] py-3 text-white font-semibold shadow hover:opacity-90 disabled:opacity-60 transition"
          >
            {loading ? "Processing..." : `Pay ₦${total.toLocaleString()}`}
          </button>
          <button
            onClick={() => navigate("/menu")}
            className="flex-1 rounded-full border border-neutral-300 bg-white py-3 text-neutral-800 hover:bg-neutral-50"
          >
            Continue Shopping
          </button>
        </div>

        {msg && (
          <p className="mt-4 text-center text-sm text-emerald-700 font-medium animate-pulse">
            {msg}
          </p>
        )}
      </section>

      {/* 🧾 POPUP FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleFormSubmit}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Delivery Details
              </h2>

              <label className="block text-sm text-neutral-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mb-3 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-[#ff7a1a] focus:outline-none"
              />

              <label className="block text-sm text-neutral-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mb-3 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-[#ff7a1a] focus:outline-none"
              />

              <label className="block text-sm text-neutral-700 mb-1">
                Address
              </label>
              <textarea
                rows="2"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="mb-3 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-[#ff7a1a] focus:outline-none"
              />

              <label className="block text-sm text-neutral-700 mb-1">
                Additional Note
              </label>
              <textarea
                rows="2"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="mb-4 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-[#ff7a1a] focus:outline-none"
                placeholder="e.g. please deliver by 7pm"
              />

              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#ff7a1a] text-white font-medium hover:opacity-90"
                >
                  Proceed to Payment
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
