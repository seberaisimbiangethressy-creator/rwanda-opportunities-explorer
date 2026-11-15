import Alert from "./Alert.jsx";
import Button from "./Button.jsx";
import OpportunityCard from "./OpportunityCard.jsx";

/**
 * Renders the list, the empty state, or the loading / error demo states.
 * Uses `if` with early returns for the non-ready states (pattern #3).
 */
export default function OpportunityList({
  opportunities,
  savedIds,
  onToggleSave,
  onReset,
  status,
  onBackToReady,
}) {
  if (status === "loading") {
    return (
      <div role="status" aria-live="polite" className="space-y-3">
        <p className="text-sm font-medium text-slate-700">Loading opportunities…</p>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <li
              key={`skeleton-${n}`}
              className="h-56 list-none animate-pulse rounded-xl bg-slate-200"
            />
          ))}
        </ul>
      </div>
    );
  }

  if (status === "error") {
    return (
      <Alert tone="error" title="We could not load the opportunities.">
        <p>This is a demo error message. No real network request was made.</p>
        <div className="mt-3">
          <Button variant="danger" onClick={onBackToReady}>
            Back to ready
          </Button>
        </div>
      </Alert>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-900">No opportunities found</h3>
        <p className="mt-1 text-sm text-slate-600">
          Nothing matches your current search and filters. Try a different word or reset
          everything.
        </p>
        <div className="mt-4">
          <Button onClick={onReset}>Reset filters</Button>
        </div>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          isSaved={savedIds.includes(opportunity.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </ul>
  );
}
