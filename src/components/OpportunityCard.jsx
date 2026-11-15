import Badge from "./Badge.jsx";
import Button from "./Button.jsx";

// Lookup object for status labels (conditional rendering pattern #4).
const STATUS = {
  full: { tone: "full", label: "Fully booked" },
  low: { tone: "info", label: "Almost full" },
  open: { tone: "neutral", label: "Places available" },
};

function getStatusKey(capacity) {
  if (capacity <= 0) return "full";
  if (capacity <= 5) return "low";
  return "open";
}

function formatDate(isoDate) {
  // Build a local date from the parts to avoid timezone shifts.
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(price) {
  return `${price.toLocaleString("en-US")} RWF`;
}

/**
 * Reusable card for one opportunity. Data comes in through props;
 * the Save/Unsave action goes back up through the onToggleSave callback.
 */
export default function OpportunityCard({ opportunity, isSaved, onToggleSave }) {
  const { id, title, category, city, date, description, capacity, price, featured } =
    opportunity;

  const isFull = capacity <= 0;
  const status = STATUS[getStatusKey(capacity)];

  // Precomputed JSX variable (pattern #3).
  let seatsInfo;
  if (isFull) {
    seatsInfo = <Badge tone="full">{status.label}</Badge>;
  } else {
    seatsInfo = (
      <span className="text-sm text-slate-700">
        <span className="font-semibold">{capacity}</span>{" "}
        {capacity === 1 ? "place" : "places"} left
      </span>
    );
  }

  return (
    <li className="list-none">
      <article
        className={`flex h-full flex-col rounded-xl border bg-white p-5 shadow-sm ${
          featured ? "border-amber-300" : "border-slate-200"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="info">{category}</Badge>
          {/* && pattern: the condition is a real boolean, so a falsy value renders nothing. */}
          {featured === true && <Badge tone="featured">Featured</Badge>}
          {price === 0 && <Badge tone="free">Free</Badge>}
          {isFull && <Badge tone="full">{STATUS.full.label}</Badge>}
        </div>

        <h3 className="mt-3 text-lg font-bold text-slate-900">{title}</h3>

        <p className="mt-1 text-sm text-slate-600">
          <span className="font-medium">{city}</span>
          <span aria-hidden="true"> · </span>
          <time dateTime={date}>{formatDate(date)}</time>
        </p>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">{description}</p>

        <dl className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
          <div>
            <dt className="sr-only">Price</dt>
            {/* Ternary pattern: Free vs formatted price. */}
            <dd className="font-semibold text-slate-900">
              {price === 0 ? "Free" : formatPrice(price)}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Availability</dt>
            <dd>{seatsInfo}</dd>
          </div>
        </dl>

        <div className="mt-4">
          <Button
            variant={isSaved ? "primary" : "secondary"}
            pressed={isSaved}
            onClick={() => onToggleSave(id)}
            className="w-full"
          >
            {isSaved ? "★ Saved · Unsave" : "☆ Save"}
          </Button>
        </div>
      </article>
    </li>
  );
}
