import { fieldClasses } from "./TextInput.jsx";

/**
 * Labelled controlled select.
 * Props: id, label, value, onChange, options ([{ value, label }]), error.
 */
export default function SelectInput({ id, label, value, onChange, options, error }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClasses} ${error ? "border-rose-500" : "border-slate-300"}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-rose-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
