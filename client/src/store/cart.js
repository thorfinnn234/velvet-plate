import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // {id, name, price, image, qty}
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),

      add: (item) => {
        const { items } = get();
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx !== -1) {
          const next = [...items];
          next[idx].qty += item.qty || 1;
          set({ items: next, isOpen: true });
        } else {
          set({ items: [...items, { ...item, qty: item.qty || 1 }], isOpen: true });
        }
      },

      inc: (id) => {
        const next = get().items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
        set({ items: next });
      },
      dec: (id) => {
        const next = get().items
          .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0);
        set({ items: next });
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      clear: () => set({ items: [] }),

      subtotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    { name: "vp_cart_v1" }
  )
);
