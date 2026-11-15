const TONES = {
  info: "border-sky-300 bg-sky-50 text-sky-900",
  error: "border-rose-300 bg-rose-50 text-rose-900",
  success: "border-emerald-300 bg-emerald-50 text-emerald-900",
};

/** Message box. Props: tone, title, children, role ("status" | "alert"). */
export default function Alert({ tone = "info", title, children, role }) {
  const resolvedRole = role ?? (tone === "error" ? "alert" : "status");
  return (
    <div
      role={resolvedRole}
      className={`rounded-lg border p-4 text-sm ${TONES[tone]}`}
    >
      {title ? <p className="font-semibold">{title}</p> : null}
      {children ? <div className={title ? "mt-1" : ""}>{children}</div> : null}
    </div>
  );
}
