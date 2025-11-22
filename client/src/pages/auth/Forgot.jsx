import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import FormInput from "../../components/FormInput";

const schema = z.object({ email: z.string().email("Enter a valid email") });

export default function Forgot() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const btn =
    "h-12 px-6 rounded-full bg-gradient-to-b from-[#ff8a3d] to-[#ff6f1a] text-white font-semibold shadow-[0_8px_18px_rgba(255,122,26,0.28)] hover:shadow-[0_10px_22px_rgba(255,122,26,0.32)] active:shadow-[0_6px_14px_rgba(255,122,26,0.24)] transition";

  const onSubmit = () =>
    alert("If the email exists, a reset link has been sent.");

  return (
    <AuthLayout
      heading="Forgot password"
      subheading="We’ll send you a reset link."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          register={register}
          error={errors.email?.message}
          className="border w-120 px-3 py-2 rounded-lg focus:outline-none"
        />
        <button type="submit" disabled={!isValid} className="h-12 w-50 rounded-[20px_1px_20px_1px] bg-gradient-to-b from-[#ff8a3d] to-[#ff6f1a]
             text-white font-semibold tracking-wide
             transition cursor-pointer">
          Send reset link
        </button>
      </form>

      <p className="mt-4 text-sm text-neutral-600">
        Back to{" "}
        <Link to="/auth/login" className="text-[#ff7a1a]">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
