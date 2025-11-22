import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import FormInput from "../../components/FormInput";
import { useAuthStore } from "../../store/auth";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const from = useLocation().state?.from ?? "/";
  const [show, setShow] = useState(false);
  const [caps, setCaps] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit = async (v) => {
    const res = await login(v.email.trim(), v.password);
    if (res.ok) navigate(from, { replace: true });
  };

  const btn =
    "h-12 w-full rounded-[20px_2px_20px_2px] bg-gradient-to-b from-[#ff8a3d] to-[#ff6f1a] text-white font-semibold tracking-wide shadow-[0_10px_22px_rgba(255,122,26,0.30)] hover:shadow-[0_12px_26px_rgba(255,122,26,0.34)] active:shadow-[0_8px_18px_rgba(255,122,26,0.26)] transition disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Log in to reserve a table, order online, and see your favorites."
    >
      {/* Card wrapper for a tighter, elevated look */}
      <div className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 bg-white/90 p-5 shadow-[0_12px_30px_rgba(17,17,17,0.08)] backdrop-blur">
        {/* Error alert */}
        {error && (
          <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700">
            <i className="bi bi-exclamation-triangle text-lg" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            register={register}
            error={errors.email?.message}
            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6f1a]"
          />

          {/* Password */}
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
          {/* Caps lock hint */}
          {caps && (
            <p className="mt-[-6px] text-xs text-amber-700">
              <i className="bi bi-exclamation-circle mr-1" />
              Caps Lock is ON
            </p>
          )}

          {/* Extras row */}
          <div className="mt-2 flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300 text-[#ff6f1a] focus:ring-[#ff6f1a]"
                {...register("remember")}
              />
              Remember me
            </label>

            <Link to="/auth/forgot" className="text-sm text-[#ff7a1a] hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button type="submit" disabled={!isValid || loading} className={btn}>
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
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
                Signing in…
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Divider (future social auth ready) */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs uppercase tracking-wider text-neutral-500">or</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        {/* Social buttons (optional hooks later) */}
        <div className="grid gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 cursor-pointer"
            onClick={() => console.log("TODO: Google OAuth")}
          >
            <img src="https://th.bing.com/th/id/OIP.uBYsSL7JDekYP3VpxWZvYQHaHa?w=174&h=180&c=7&r=0&o=7&pid=1.7&rm=3" alt="" className="h-5 w-5" />
            Continue with Google
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50"
            onClick={() => console.log("TODO: Apple OAuth")}
          >
            <i className="bi bi-apple text-xl cursor-pointer" />
            Continue with Apple
          </button>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-center text-sm text-neutral-600">
          New here?{" "}
          <Link to="/auth/register" className="text-[#ff7a1a] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
