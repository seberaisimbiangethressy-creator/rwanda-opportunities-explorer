import Button from "./Button.jsx";
import Checkbox from "./Checkbox.jsx";
import SelectInput from "./SelectInput.jsx";
import TextInput from "./TextInput.jsx";

export const SORT_OPTIONS = [
  { value: "date", label: "Earliest date" },
  { value: "title", label: "Title A to Z" },
  { value: "seats", label: "Most places available" },
];

/**
 * Controlled filter panel. All values live in App's state and arrive as props;
 * every change goes back up through a callback prop.
 */
export default function OpportunityFilters({
  search,
  category,
  sortBy,
  availableOnly,
  savedOnly,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onAvailableOnlyChange,
  onSavedOnlyChange,
  onReset,
}) {
  const categoryOptions = [
    { value: "all", label: "All categories" },
    ...categories.map((name) => ({ value: name, label: name })),
  ];

  return (
    <section
      aria-labelledby="filters-heading"
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 id="filters-heading" className="text-base font-bold text-slate-900">
        Find an opportunity
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <TextInput
          id="search"
          label="Search by title or city"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="e.g. Kigali or React"
        />
        <SelectInput
          id="category-filter"
          label="Category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          options={categoryOptions}
        />
        <SelectInput
          id="sort"
          label="Sort by"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          options={SORT_OPTIONS}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Checkbox
          id="available-only"
          label="Available only"
          checked={availableOnly}
          onChange={(event) => onAvailableOnlyChange(event.target.checked)}
        />
        <Checkbox
          id="saved-only"
          label="Saved only"
          checked={savedOnly}
          onChange={(event) => onSavedOnlyChange(event.target.checked)}
        />
        <Button variant="ghost" onClick={onReset} className="sm:ml-auto">
          Reset filters
        </Button>
      </div>
    </section>
  );
}
