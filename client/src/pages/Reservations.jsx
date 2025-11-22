import { useEffect, useMemo, useRef, useState } from "react";

/** ---------- small utils ---------- */
const makeCode = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map((n) => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[n % 32])
    .join("");

const fmtDate = (isoLike) => {
  if (!isoLike) return "";
  try {
    const d = new Date(isoLike + "T00:00:00");
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return isoLike;
  }
};
const fmtTime = (t) => {
  if (!t) return "";
  try {
    const [h, m] = t.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  } catch {
    return t;
  }
};

export default function Reservations() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    date: "",
    time: "",
    note: "",
  });

  const [status, setStatus] = useState({ loading: false, type: "", message: "" });
  const [ticket, setTicket] = useState(null); // { code, name, email, guests, date, time, createdAt }
  const [showTicket, setShowTicket] = useState(false);

  const ticketRef = useRef(null); // for canvas generation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "guests" ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!form.name || !form.email || !form.date || !form.time) {
      return setStatus({
        loading: false,
        type: "error",
        message: "Please fill in all required fields.",
      });
    }

    try {
      setStatus({ loading: true, type: "", message: "" });

      // simulate an API request (replace with your backend later)
      await new Promise((res) => setTimeout(res, 1200));

      // build ticket
      const newTicket = {
        code: makeCode(),
        name: form.name.trim(),
        email: form.email.trim(),
        guests: form.guests,
        date: form.date,
        time: form.time,
        note: form.note?.trim(),
        createdAt: new Date().toISOString(),
        venue: "Velvet Plate · 12 Aster Lane, Lagos",
      };

      setTicket(newTicket);
      setShowTicket(true);
      setStatus({ loading: false, type: "success", message: "Reservation successful! 🎉" });

      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        guests: 2,
        date: "",
        time: "",
        note: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        type: "error",
        message: "Something went wrong. Try again.",
      });
    }
  };

  /** Download ticket as PNG (no external libs) */
  const handleDownload = async () => {
    if (!ticketRef.current) return;
    // Draw onto a canvas and download
    const dpi = 2; // retina scale
    const w = 800;
    const h = 420;
    const canvas = document.createElement("canvas");
    canvas.width = w * dpi;
    canvas.height = h * dpi;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpi, dpi);

    // background
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#fff5ee");
    g.addColorStop(1, "#ffe5d6");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // border
    ctx.strokeStyle = "#ff6f1a";
    ctx.lineWidth = 4;
    roundRect(ctx, 8, 8, w - 16, h - 16, 20);
    ctx.stroke();

    // side ribbon
    ctx.fillStyle = "#ff6f1a";
    ctx.fillRect(0, 0, 10, h);

    // logo circle
    ctx.beginPath();
    ctx.arc(80, 90, 42, 0, Math.PI * 2);
    ctx.fillStyle = "#111111";
    ctx.fill();
    // V mark
    ctx.font = "bold 42px serif";
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("V", 80, 90);

    // headings
    ctx.fillStyle = "#111111";
    ctx.textAlign = "left";
    ctx.font = "700 28px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
    ctx.fillText("Velvet Plate — Reservation Ticket", 150, 70);

    ctx.font = "400 16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
    ctx.fillStyle = "#444";
    ctx.fillText("Present at reception on arrival", 150, 98);

    // details
    const lineY = 150;
    ctx.font = "600 18px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
    ctx.fillStyle = "#111";
    const L = 160;
    drawKVP(ctx, "Guest", ticket.name, 40, lineY);
    drawKVP(ctx, "Email", ticket.email, 40, lineY + 32);
    drawKVP(ctx, "Guests", String(ticket.guests), 40, lineY + 64);

    drawKVP(ctx, "Date", fmtDate(ticket.date), 420, lineY);
    drawKVP(ctx, "Time", fmtTime(ticket.time), 420, lineY + 32);
    drawKVP(ctx, "Code", ticket.code, 420, lineY + 64);

    // venue
    ctx.font = "400 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
    ctx.fillStyle = "#666";
    ctx.fillText(ticket.venue, 40, h - 60);

    // QR (using an on-the-fly image from a public QR generator)
    // Encodes code + name for check-in
    const qr = new Image();
    const qrData = encodeURIComponent(`VELVET_PLATE|${ticket.code}|${ticket.name}`);
    qr.crossOrigin = "anonymous";
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${qrData}`;
    await new Promise((res) => {
      qr.onload = res;
      qr.onerror = res;
    });
    ctx.drawImage(qr, w - 160, h - 160, 120, 120);

    // download
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `VelvetPlate_Ticket_${ticket.code}.png`;
    a.click();
  };

  return (
    <section className="relative isolate bg-white">
      {/* decorative */}
      <div
        className="pointer-events-none absolute -right-24 top-0 -z-10 hidden md:block h-[440px] w-[440px] bg-contain bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/leaves.svg')" }}
      />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-serif text-3xl text-neutral-900 mb-2">Reserve a Table</h1>
        <p className="text-neutral-600 mb-6">
          Book your fine dining experience at <strong>Velvet Plate</strong>. We’ll confirm your
          reservation shortly after you submit.
        </p>

        {/* Alert */}
        {status.message && (
          <Alert
            type={status.type === "success" ? "success" : status.type === "error" ? "error" : "info"}
            onClose={() => setStatus((s) => ({ ...s, message: "", type: "" }))}
          >
            {status.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name *">
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6f1a]"
              />
            </Field>
            <Field label="Email *">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6f1a]"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone">
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6f1a]"
              />
            </Field>
            <Field label="Guests">
              <input
                name="guests"
                type="number"
                min="1"
                value={form.guests}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6f1a]"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Date *">
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6f1a]"
              />
            </Field>
            <Field label="Time *">
              <input
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6f1a]"
              />
            </Field>
          </div>

          <Field label="Additional Notes">
            <textarea
              name="note"
              rows="3"
              value={form.note}
              onChange={handleChange}
              placeholder="Special requests or allergies..."
              className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6f1a]"
            />
          </Field>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full rounded-full bg-[#ff6f1a] py-3 text-white font-medium shadow-[0_10px_22px_rgba(255,111,26,0.35)] hover:opacity-90 disabled:opacity-60"
          >
            {status.loading ? "Submitting..." : "Confirm Reservation"}
          </button>
        </form>
      </div>

      {/* Ticket Modal */}
      {showTicket && ticket && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-semibold text-neutral-900">Your Reservation Ticket</h2>
              <button
                onClick={() => setShowTicket(false)}
                className="rounded-full p-2 hover:bg-neutral-100"
                aria-label="Close"
              >
                <i className="bi bi-x-lg text-lg text-neutral-700" />
              </button>
            </div>

            {/* Ticket Preview */}
            <div
              ref={ticketRef}
              className="mt-4 rounded-2xl border border-neutral-200 bg-gradient-to-br from-[#fff5ee] to-[#ffe5d6] p-5"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-900 text-white font-bold">
                  V
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Velvet Plate</p>
                  <p className="text-base font-semibold text-neutral-900">Reservation Ticket</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <KeyVal k="Guest" v={ticket.name} />
                <KeyVal k="Guests" v={ticket.guests} />
                <KeyVal k="Date" v={fmtDate(ticket.date)} />
                <KeyVal k="Time" v={fmtTime(ticket.time)} />
                <KeyVal k="Code" v={ticket.code} />
                <KeyVal k="Email" v={ticket.email} />
                <div className="sm:col-span-2">
                  <KeyVal k="Venue" v={ticket.venue} />
                </div>
              </div>

              {/* QR (serverless) */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-neutral-500">
                  Present this ticket at the reception on arrival.
                </div>
                <img
                  className="h-20 w-20"
                  alt="QR"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                    `VELVET_PLATE|${ticket.code}|${ticket.name}`
                  )}`}
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setShowTicket(false)}
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-neutral-800 hover:bg-neutral-50"
              >
                Close
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center rounded-full bg-[#ff6f1a] px-4 py-2 font-medium text-white shadow-[0_10px_22px_rgba(255,111,26,0.35)] hover:opacity-90"
              >
                <i className="bi bi-download mr-2" />
                Download Ticket (PNG)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/** ---------- tiny UI helpers ---------- */

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700">{label}</label>
      {children}
    </div>
  );
}

function KeyVal({ k, v }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2">
      <p className="text-[11px] uppercase tracking-wide text-neutral-500">{k}</p>
      <p className="text-sm font-medium text-neutral-900">{v}</p>
    </div>
  );
}

function Alert({ type = "info", children, onClose }) {
  const tone =
    type === "success"
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : type === "error"
      ? "bg-red-50 text-red-800 border-red-200"
      : "bg-blue-50 text-blue-800 border-blue-200";
  const icon =
    type === "success" ? "bi-check-circle" : type === "error" ? "bi-exclamation-triangle" : "bi-info-circle";

  return (
    <div className={`mb-4 flex items-start gap-3 rounded-xl border px-3 py-3 ${tone}`}>
      <i className={`bi ${icon} text-xl`} />
      <div className="flex-1 text-sm">{children}</div>
      <button
        className="rounded-md px-2 py-1 hover:bg-black/5"
        onClick={onClose}
        aria-label="Dismiss"
      >
        <i className="bi bi-x" />
      </button>
    </div>
  );
}

/** draw rounded rect path helper for canvas */
function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/** draw label:value lines on canvas */
function drawKVP(ctx, label, val, x, y) {
  ctx.font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  ctx.fillStyle = "#666";
  ctx.fillText(label.toUpperCase(), x, y);
  ctx.font = "600 20px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  ctx.fillStyle = "#111";
  ctx.fillText(val, x, y + 22);
}
