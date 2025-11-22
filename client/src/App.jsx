// src/App.jsx
import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";

// layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

// pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";

// stores / guards
import { useAuthStore } from "./store/auth";
import Reservations from "./pages/Reservations";
import RouteChangeLoader from "./components/RouteChangeLoader";


/* ---------- Shell: wraps all public pages with navbar/footer ---------- */
function Shell() {
  const { pathname } = useLocation();
  const hideShell = pathname.startsWith("/auth"); // no navbar/footer on auth
  return hideShell ? (
    <Outlet />
  ) : (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900">
      <RouteChangeLoader />
      <Navbar />
      {/* keep the cart drawer mounted globally so the cart button works anywhere */}
      <CartDrawer />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Protected Route wrapper (use for pages that require auth) ---------- */
function ProtectedRoute({ children }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/auth/login" replace />;
  return children;
}

/* ---------- App Routes ---------- */
export default function App() {
  return (
    <Routes>
      {/* All public pages render inside the Shell */}
      <Route element={<Shell />}>
        {/* Home (index) */}
        <Route index element={<Home />} />

        {/* Public pages */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        

        {/* Cart / Checkout flow */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />           {/* ✅ added */}
        <Route path="/order/success" element={<OrderSuccess />} />{/* ✅ added */}
        

        {/* Example protected page (swap with your real component later) */}
        <Route
          path="/reservations"
          element={
           <Reservations/>
          }
        />
      </Route>

      {/* Auth pages (no navbar/footer) */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot" element={<Forgot />} />

      {/* Fallback -> Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


