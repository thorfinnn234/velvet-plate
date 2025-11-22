export default function Button({ children, className = "", ...props }) {
  const base =
    "h-12 px-6 rounded-[20px_2px_20px_2px]  " +
    "text-white font-semibold tracking-wide " + 
    "active:shadow-[0_6px_14px_rgba(255,122,26,0.24)] " +
    "focus:outline-none focus:ring-4 focus:ring-orange-300/40 " +
    "transition disabled:opacity-60";
  return (
    <button {...props} className={`${base} ${className}`}>
      {children}
    </button>
  );
}
