import PaystackPop from "@paystack/inline-js";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart";

export default function Payment() {
  const { items, subtotal, clear } = useCartStore();
  const navigate = useNavigate();

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY; // set in client .env
  const email = useMemo(() => "guest@example.com", []);
  const amountKobo = Math.round(subtotal() * 100); // NGN in kobo: ₦1,500 => 150000 (adjust if you were using USD!)

  const onVerify = async (reference) => {
    try {
      const res = await fetch("/api/payments/verify/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();
      if (data.ok) {
        clear();
        navigate("/order/success", { replace: true });
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Network error verifying payment.");
    }
  };

  const payNow = () => {
    if (!publicKey) {
      alert("Missing Paystack public key.");
      return;
    }
    if (!items.length) {
      alert("Your cart is empty.");
      return;
    }

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: publicKey,
      email,
      amount: amountKobo,  // in kobo
      currency: "NGN",
      // optional metadata:
      metadata: {
        custom_fields: [
          {
            display_name: "Order Items",
            variable_name: "order_items",
            value: items.map(i => `${i.name} x${i.qty}`).join(", "),
          },
        ],
      },
      onSuccess: (tx) => onVerify(tx.reference),
      onCancel: () => {
        // user closed popup
      },
    });
  };

  if (!items.length) {
    return (
      <section className="mx-auto max-w-6xl p-6">
        <h1 className="text-2xl font-semibold">Payment</h1>
        <p className="mt-2 text-neutral-600">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold">Payment</h1>
      <div className="mt-4 rounded-2xl border p-5">
        <div className="flex items-center justify-between">
          <span className="text-neutral-600">Total</span>
          <span className="text-xl font-semibold">
            ₦{(amountKobo / 100).toLocaleString()}
          </span>
        </div>

        <button
          onClick={payNow}
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 px-6 text-white hover:opacity-90"
        >
          Pay with Paystack
        </button>

        <p className="mt-3 text-xs text-neutral-500">
          You’ll be redirected in a secure popup powered by Paystack.
        </p>
      </div>
    </section>
  );
}
