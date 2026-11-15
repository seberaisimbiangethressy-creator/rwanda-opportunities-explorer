import { useState } from "react";
import Alert from "./Alert.jsx";
import Button from "./Button.jsx";
import Checkbox from "./Checkbox.jsx";
import SelectInput from "./SelectInput.jsx";
import TextInput, { fieldClasses } from "./TextInput.jsx";

const EMPTY_FORM = {
  title: "",
  category: "",
  city: "",
  date: "",
  capacity: "",
  price: "",
  description: "",
  featured: false,
};

function isValidIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
  );
}

function validate(values) {
  const errors = {};

  if (values.title.trim() === "") errors.title = "Please enter a title.";
  else if (values.title.trim().length < 3)
    errors.title = "The title must be at least 3 characters long.";

  if (values.category === "") errors.category = "Please choose a category.";
  if (values.city === "") errors.city = "Please choose a city.";

  if (values.date === "") errors.date = "Please choose a date.";
  else if (!isValidIsoDate(values.date)) errors.date = "Please enter a valid date.";

  if (values.capacity.trim() === "") {
    errors.capacity = "Please enter the number of places (0 or more).";
  } else if (
    !Number.isInteger(Number(values.capacity)) ||
    Number(values.capacity) < 0
  ) {
    errors.capacity = "Capacity must be a whole number that is 0 or more.";
  }

  if (values.price.trim() === "") {
    errors.price = "Please enter a price in RWF (use 0 for free).";
  } else if (Number.isNaN(Number(values.price)) || Number(values.price) < 0) {
    errors.price = "Price must be a number that is 0 or more.";
  }

  return errors;
}

function createId() {
  // Generated once, inside the submit handler, so it stays permanent for this record.
  return globalThis.crypto?.randomUUID
    ? `opp-${globalThis.crypto.randomUUID()}`
    : `opp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Controlled form for adding an opportunity.
 * The new record is handed upward through the onAdd callback prop.
 */
export default function AddOpportunityForm({ categories, cities, onAdd }) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    if (submitted) setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault(); // no page reload
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    onAdd({
      id: createId(),
      title: values.title.trim(),
      category: values.category,
      city: values.city,
      date: values.date,
      description:
        values.description.trim() || "No description provided for this opportunity.",
      capacity: Number(values.capacity),
      price: Number(values.price),
      featured: values.featured,
    });

    setValues(EMPTY_FORM);
    setErrors({});
    setSubmitted(true);
  }

  function handleClear() {
    setValues(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
  }

  const errorCount = Object.keys(errors).length;

  return (
    <section
      aria-labelledby="add-heading"
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 id="add-heading" className="text-base font-bold text-slate-900">
        Add an opportunity
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        New entries are kept in this page only and disappear when you refresh.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
        {errorCount > 0 && (
          <Alert tone="error" title="Please fix the highlighted fields.">
            {errorCount === 1 ? "1 field needs attention." : `${errorCount} fields need attention.`}
          </Alert>
        )}
        {submitted && (
          <Alert tone="success" title="Opportunity added.">
            It now appears in the list below.
          </Alert>
        )}

        <TextInput
          id="form-title"
          label="Title"
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
          placeholder="e.g. Intro to Web Design"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectInput
            id="form-category"
            label="Category"
            value={values.category}
            onChange={(e) => handleChange("category", e.target.value)}
            error={errors.category}
            options={[
              { value: "", label: "Choose a category" },
              ...categories.map((name) => ({ value: name, label: name })),
            ]}
          />
          <SelectInput
            id="form-city"
            label="City"
            value={values.city}
            onChange={(e) => handleChange("city", e.target.value)}
            error={errors.city}
            options={[
              { value: "", label: "Choose a city" },
              ...cities.map((name) => ({ value: name, label: name })),
            ]}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <TextInput
            id="form-date"
            label="Date"
            type="date"
            value={values.date}
            onChange={(e) => handleChange("date", e.target.value)}
            error={errors.date}
          />
          <TextInput
            id="form-capacity"
            label="Places available"
            type="number"
            min="0"
            value={values.capacity}
            onChange={(e) => handleChange("capacity", e.target.value)}
            error={errors.capacity}
            placeholder="0"
          />
          <TextInput
            id="form-price"
            label="Price (RWF)"
            type="number"
            min="0"
            value={values.price}
            onChange={(e) => handleChange("price", e.target.value)}
            error={errors.price}
            placeholder="0 = free"
          />
        </div>

        <div>
          <label htmlFor="form-description" className="block text-sm font-medium text-slate-800">
            Description (optional)
          </label>
          <textarea
            id="form-description"
            name="form-description"
            rows={3}
            value={values.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className={`${fieldClasses} border-slate-300`}
          />
        </div>

        <Checkbox
          id="form-featured"
          label="Mark as featured"
          checked={values.featured}
          onChange={(e) => handleChange("featured", e.target.checked)}
        />

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Add opportunity</Button>
          <Button type="button" variant="ghost" onClick={handleClear}>
            Clear form
          </Button>
        </div>
      </form>
    </section>
  );
}
