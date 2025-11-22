import Logo from "../assets/navlogo.svg";

export default function AuthLayout({ heading, subheading, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-neutral-900 grid md:grid-cols-2 z-1">
      {/* corner ornaments (transparent) */}
      <img
        src="/artdemo.svg"
        alt=""
        className="pointer-events-none select-none absolute -z-10 -top-1 w-[360px] opacity-10"
      />
      <img
        src="/artdemo.svg"
        alt=""
        className="pointer-events-none select-none absolute -z-10 -bottom-12 -right-12 w-[320px] opacity-10 rotate-6 scale-x-[-1]"
      />

      {/* Left brand panel */}
      <div className="hidden md:flex items-start justify-start p-8">
        <div className="flex items-center gap-3">
          <img src={Logo} className="h-8 w-8" alt="Velvet Plate logo" />
          <div>
            <h2 className="m-0 text-xl font-semibold">Velvet Plate</h2>
            <p className="m-0 text-sm text-neutral-500">We provide the best food for you.</p>
          </div>
        </div>
      </div>

      {/* Right form card */}
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-150 rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_24px_rgba(17,17,17,0.06)] p-6">
          <h1 className="text-2xl font-semibold">{heading}</h1>
          {subheading && <p className="mt-1 mb-4 text-sm text-neutral-600">{subheading}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
