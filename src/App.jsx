import { useState } from "react";
import AddOpportunityForm from "./components/AddOpportunityForm.jsx";
import Button from "./components/Button.jsx";
import OpportunityFilters from "./components/OpportunityFilters.jsx";
import OpportunityList from "./components/OpportunityList.jsx";
import { CATEGORIES, CITIES, seedOpportunities } from "./data/seedOpportunities.js";
import { getVisibleOpportunities } from "./utils/filterOpportunities.js";

export default function App() {
  const [opportunities, setOpportunities] = useState(seedOpportunities);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [demoStatus, setDemoStatus] = useState("ready"); // "ready" | "loading" | "error"
  const [showForm, setShowForm] = useState(false);

  // Derived during render: never stored in state.
  const visible = getVisibleOpportunities(opportunities, {
    search,
    category,
    sortBy,
    availableOnly,
    savedOnly,
    savedIds,
  });

  function toggleSave(id) {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
    );
  }

  function addOpportunity(newOpportunity) {
    setOpportunities((current) => [...current, newOpportunity]);
  }

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setSortBy("date");
    setAvailableOnly(false);
    setSavedOnly(false);
  }

  const resultLabel = `${visible.length} ${visible.length === 1 ? "result" : "results"}`;

  return (
    <div className="min-h-screen">
      <header className="bg-emerald-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-extrabold sm:text-3xl">Rwanda Opportunities Explorer</h1>
          <p className="mt-2 max-w-2xl text-sm text-emerald-50 sm:text-base">
            Discover workshops, career events, community activities and short courses across
            Rwanda. All listings are sample content for learning purposes.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <OpportunityFilters
          search={search}
          category={category}
          sortBy={sortBy}
          availableOnly={availableOnly}
          savedOnly={savedOnly}
          categories={CATEGORIES}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onSortChange={setSortBy}
          onAvailableOnlyChange={setAvailableOnly}
          onSavedOnlyChange={setSavedOnly}
          onReset={resetFilters}
        />

        <section aria-labelledby="results-heading">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 id="results-heading" className="text-lg font-bold text-slate-900">
                Opportunities
              </h2>
              {/* The count is converted to text, so a count of 0 prints "0 results" and never a stray 0. */}
              <p className="text-sm text-slate-600" aria-live="polite">
                {demoStatus === "ready" ? resultLabel : "Results hidden in demo mode"}
                <span aria-hidden="true"> · </span>
                {savedIds.length} saved
              </p>
            </div>

            <div
              role="group"
              aria-label="Demo UI state"
              className="flex flex-wrap items-center gap-2"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Demo state:
              </span>
              <Button
                variant="ghost"
                pressed={demoStatus === "loading"}
                onClick={() => setDemoStatus("loading")}
              >
                Loading
              </Button>
              <Button
                variant="ghost"
                pressed={demoStatus === "error"}
                onClick={() => setDemoStatus("error")}
              >
                Error
              </Button>
              <Button
                variant="ghost"
                pressed={demoStatus === "ready"}
                onClick={() => setDemoStatus("ready")}
              >
                Ready
              </Button>
            </div>
          </div>

          <OpportunityList
            opportunities={visible}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            onReset={resetFilters}
            status={demoStatus}
            onBackToReady={() => setDemoStatus("ready")}
          />
        </section>

        <section aria-label="Add a new opportunity">
          <Button
            variant="secondary"
            pressed={showForm}
            onClick={() => setShowForm((open) => !open)}
          >
            {showForm ? "Hide add form" : "+ Add an opportunity"}
          </Button>
          {showForm ? (
            <div className="mt-4">
              <AddOpportunityForm
                categories={CATEGORIES}
                cities={CITIES}
                onAdd={addOpportunity}
              />
            </div>
          ) : null}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500 sm:px-6">
          Rwanda Opportunities Explorer · Week 7 React project · Sample data only.
        </p>
      </footer>
    </div>
  );
}
