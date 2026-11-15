const VARIANTS = {
  primary:
    "bg-emerald-700 text-white hover:bg-emerald-800 border-emerald-700 disabled:bg-slate-300 disabled:border-slate-300",
  secondary:
    "bg-white text-emerald-800 hover:bg-emerald-50 border-emerald-700",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 border-slate-300",
  danger: "bg-rose-700 text-white hover:bg-rose-800 border-rose-700",
};

/**
 * Reusable button. `type` defaults to "button" so it never submits a form by accident.
 * Props: variant, type, onClick, disabled, pressed (for toggle buttons), children, className.
 */
export default function Button({
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  pressed,
  className = "",
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
