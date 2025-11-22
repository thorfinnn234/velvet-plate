import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart";

export default function CartDrawer() {
  const { items, isOpen, close, inc, dec, remove, subtotal } = useCartStore();

  return (
    <>
      {/* overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/30 transition ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      {/* panel */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[90%] max-w-md transform bg-white shadow-xl transition ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between  p-4">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button onClick={close} className="rounded-md border px-3 py-1">Close</button>
        </div>

        <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-neutral-600">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex gap-3 border-b pb-3">
                <img src={it.image} alt={it.name} className="h-16 w-16 rounded-md object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">{it.name}</div>
                    <div className="font-semibold">${(it.price * it.qty).toFixed(2)}</div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => dec(it.id)} className="h-7 w-7 rounded-md border">-</button>
                    <span className="w-6 text-center">{it.qty}</span>
                    <button onClick={() => inc(it.id)} className="h-7 w-7 rounded-md border">+</button>
                    <button onClick={() => remove(it.id)} className="ml-auto text-sm text-red-600">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-neutral-600">Subtotal</span>
            <span className="text-lg font-semibold">${subtotal().toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            onClick={close}
            className={`mt-3 inline-flex w-full items-center justify-center h-11 rounded-full text-white ${
              items.length ? "bg-neutral-900 hover:opacity-90" : "bg-neutral-400 pointer-events-none"
            }`}
          >
            Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
