/** Labelled controlled checkbox. Props: id, label, checked, onChange. */
export default function Checkbox({ id, label, checked, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-400 text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
      />
      <label htmlFor={id} className="text-sm text-slate-800">
        {label}
      </label>
    </div>
  );
}
