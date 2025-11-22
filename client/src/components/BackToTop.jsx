/* ⬆️ Back to Top button (sticky, accessible, smooth scroll) */
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setShow(y > 300); // reveal after 300px
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-opacity ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        className="group inline-flex h-12 w-12 items-center justify-center rounded-full
                   bg-[#ff6f1a] text-white shadow-[0_10px_22px_rgba(255,111,26,0.35)]
                   hover:opacity-95 active:scale-95 transition"
      >
        <i className="bi bi-chevron-up text-xl" />
      </button>
    </div>
  );
}
