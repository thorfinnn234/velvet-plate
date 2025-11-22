import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useCartStore } from "../store/cart"; // ✅ cart store
import Logo from "../assets/navlogo.svg";

const links = [
  { to: "/menu", label: "Menu" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile nav
  const [menuOpen, setMenuOpen] = useState(false); // profile dropdown
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { user, token, logout } = useAuthStore();

  // 🛒 cart bits
  const openCart = useCartStore((s) => s.open);
  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0);

  // close dropdown on outside click or route change
  useEffect(() => {
    const onDocClick = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setOpen(false);
  }, [location.pathname]);

  const goLogin = () => navigate("/auth/login");
  const goRegister = () => navigate("/auth/register");
  const doLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 bg-white text-neutral-900">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span>
            <img src={Logo} className="h-7 w-7" alt="Velvet Plate" />
          </span>
          <span className="font-dispaly text-2xl font-semibold text-black">
            Velvet Plate
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end // ✅ exact active; Home (/) never activates these
              className={({ isActive }) =>
                `text-sm transition ${
                  isActive
                    ? "text-[#ff7a1a]"
                    : "text-neutral-700 hover:text-neutral-900 text-sm"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Right: cart + profile */}
        <div className="flex items-center gap-2">
          {/* 🛒 Cart button */}
          <button
            onClick={openCart}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm hover:shadow transition cursor-pointer"
            aria-label="Cart"
          >
            <i className="bi bi-cart text-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ff7a1a] px-1 text-[11px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* profile icon + dropdown */}
          <div className="relative">
            <button
              ref={btnRef}
              onClick={() => setMenuOpen((s) => !s)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm hover:shadow transition cursor-pointer"
              aria-label="Profile"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-neutral-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
                <path d="M21 21a9 9 0 1 0-18 0" />
              </svg>
            </button>

            {menuOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg ring-1 ring-black/5"
              >
                {!token ? (
                  <div className="py-1">
                    <button
                      onClick={goLogin}
                      className="w-full px-3 py-2 text-left text-sm text-neutral-800 hover:bg-neutral-50"
                    >
                      Log in
                    </button>
                    <button
                      onClick={goRegister}
                      className="w-full px-3 py-2 text-left text-sm text-neutral-800 hover:bg-neutral-50"
                    >
                      Sign up
                    </button>
                  </div>
                ) : (
                  <div className="py-1">
                    <div className="px-3 py-2 text-xs text-neutral-500">
                      Signed in as{" "}
                      <span className="font-medium text-neutral-700">
                        {user?.name || user?.email}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate("/account")}
                      className="w-full px-3 py-2 text-left text-sm text-neutral-800 hover:bg-neutral-50"
                    >
                      My account
                    </button>
                    <button
                      onClick={doLogout}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 md:hidden"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile links panel */}
      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-6xl space-y-2 px-4 py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                className={({ isActive }) =>
                  `block py-1 text-sm ${
                    isActive
                      ? "text-[#ff7a1a]"
                      : "text-neutral-700 hover:text-neutral-900"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}

            {/* mobile actions */}
            <div className="border-t border-neutral-200 pt-2">
              <button
                onClick={openCart}
                className="mr-3 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm"
              >
                <i className="bi bi-bag" /> Cart
                {cartCount > 0 && (
                  <span className="ml-1 inline-grid h-5 min-w-5 place-items-center rounded-full bg-[#ff7a1a] px-1 text-[11px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {!token ? (
                <div className="mt-2 flex gap-3">
                  <button onClick={goLogin} className="text-sm text-[#ff7a1a]">
                    Log in
                  </button>
                  <button
                    onClick={goRegister}
                    className="text-sm text-[#ff7a1a]"
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                <button
                  onClick={doLogout}
                  className="mt-2 text-sm text-red-600"
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
