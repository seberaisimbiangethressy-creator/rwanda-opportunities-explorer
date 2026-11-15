const TONES = {
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  featured: "bg-amber-100 text-amber-900 ring-amber-300",
  free: "bg-emerald-100 text-emerald-900 ring-emerald-300",
  full: "bg-rose-100 text-rose-900 ring-rose-300",
  info: "bg-sky-100 text-sky-900 ring-sky-300",
};

/** Small status label. Props: tone, children. */
export default function Badge({ tone = "neutral", children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
