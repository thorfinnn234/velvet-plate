// src/components/FormInput.jsx
export default function FormInput({
  label, name, type = "text", register, error, rightSlot, placeholder, ...rest
}) {
  const shell =
    `` +
    (error);

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <div className={shell}>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className="w-full h-11 bg-transparent outline-none px-2 text-neutral-900 placeholder:text-neutral-400"
          {...register(name)}
          {...rest}
        />
        {rightSlot}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
