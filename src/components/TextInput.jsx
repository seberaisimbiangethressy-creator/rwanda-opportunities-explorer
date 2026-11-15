const fieldClasses =
  "mt-1 block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600";

/**
 * Labelled controlled input. Label is always associated through htmlFor/id.
 * Props: id, label, value, onChange, type, placeholder, error, min, hint.
 */
export default function TextInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  min,
  hint,
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy}
        className={`${fieldClasses} ${error ? "border-rose-500" : "border-slate-300"}`}
      />
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-rose-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { fieldClasses };
