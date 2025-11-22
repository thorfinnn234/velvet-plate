import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import FormInput from "../../components/FormInput";
import { useAuthStore } from "../../store/auth";

const schema = z
  .object({
    name: z.string().min(2, "Enter your full name").max(40),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Use 8+ characters")
      .regex(/[A-Za-z]/, "Include a letter")
      .regex(/[0-9]/, "Include a number"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords don’t match",
  });

export default function Register() {
  const { register: signUp, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const from = useLocation().state?.from ?? "/";

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [caps, setCaps] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setFocus,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const pwd = watch("password") || "";
  const pwdChecks = useMemo(
    () => ({
      len: pwd.length >= 8,
      letter: /[A-Za-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
    }),
    [pwd]
  );

  const onSubmit = async (v) => {
    const res = await signUp({
      name: v.name.trim(),
      email: v.email.trim(),
      password: v.password,
    });
    if (res.ok) navigate(from, { replace: true });
  };

  const btn =
    "h-12 w-full rounded-[20px_2px_20px_2px] bg-gradient-to-b from-[#ff8a3d] to-[#ff6f1a] text-white font-semibold tracking-wide shadow-[0_10px_22px_rgba(255,122,26,0.30)] hover:shadow-[0_12px_26px_rgba(255,122,26,0.34)] active:shadow-[0_8px_18px_rgba(255,122,26,0.26)] transition disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <AuthLayout
      heading="Create your account"
      subheading="Reserve a table, order online, and save your favorites."
    >
      {/* Centered card */}
      <div className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 bg-white/90 p-5 shadow-[0_12px_30px_rgba(17,17,17,0.08)] backdrop-blur">
        {/* Error alert */}
        {error && (
          <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700">
            <i className="bi bi-exclamation-triangle text-lg" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Full name"
            name="name"
            placeholder="Ada Lovelace"
            register={register}
            error={errors.name?.message}
            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6f1a]"
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            register={register}
            error={errors.email?.message}
            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6f1a]"
          />

          <FormInput
            label="Password"
            name="password"
            type={show ? "text" : "password"}
            placeholder="••••••••"
            register={register}
            error={errors.password?.message}
            onKeyUp={(e) => setCaps(e.getModifierState && e.getModifierState("CapsLock"))}
            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6f1a]"
            rightSlot={
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="px-2 py-1 text-neutral-600 hover:text-neutral-800"
                aria-label={show ? "Hide password" : "Show password"}
                title={show ? "Hide password" : "Show password"}
              >
                <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"} text-lg`} />
              </button>
            }
          />
          {caps && (
            <p className="mt-[-6px] text-xs text-amber-700">
              <i className="bi bi-exclamation-circle mr-1" />
              Caps Lock is ON
            </p>
          )}

          {/* Password checklist */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <Check ok={pwdChecks.len} label="8+ chars" />
            <Check ok={pwdChecks.letter} label="Letter" />
            <Check ok={pwdChecks.number} label="Number" />
          </div>

          <FormInput
            label="Confirm password"
            name="confirm"
            type={show2 ? "text" : "password"}
            placeholder="••••••••"
            register={register}
            error={errors.confirm?.message}
            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6f1a]"
            rightSlot={
              <button
                type="button"
                onClick={() => setShow2((s) => !s)}
                className="px-2 py-1 text-neutral-600 hover:text-neutral-800"
                aria-label={show2 ? "Hide password" : "Show password"}
                title={show2 ? "Hide password" : "Show password"}
              >
                <i className={`bi ${show2 ? "bi-eye-slash" : "bi-eye"} text-lg`} />
              </button>
            }
          />

          <button type="submit" disabled={!isValid || loading} className={btn}>
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2 cursor-pointer">
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"
                  />
                </svg>
                Creating account…
              </span>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        {/* Footer text */}
        <p className="mt-6 text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-[#ff7a1a] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

/* tiny helper for checklist */
function Check({ ok, label }) {
  return (
    <div className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 ${ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-neutral-200 bg-neutral-50 text-neutral-500"}`}>
      <i className={`bi ${ok ? "bi-check-circle-fill" : "bi-dot"} text-sm`} />
      <span>{label}</span>
    </div>
  );
}
