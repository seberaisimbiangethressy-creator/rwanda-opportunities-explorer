# Rwanda Opportunities Explorer

A responsive React application that helps learners discover workshops, career events, community activities and short courses across Rwanda. Visitors can search, filter, sort and save opportunities, and add new ones with a validated, controlled form.

> All opportunities are **fictional sample content**. All data stays in the frontend: there is no backend, database, fetch call, React Router or external state library.

Built for the Week 7 integrated React assignment (Advanced Frontend Web Development).

**Live site:**https://seberaisimbiangethressy-creator.github.io/rwanda-opportunities-explorer/

## Tech stack

- React 19 (function components, JSX, props, `useState`)
- Vite 6
- Tailwind CSS v4 (`@tailwindcss/vite`)

## Setup, run and build

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # create a production build in dist/
npm run preview    # preview the production build
```

Requires Node.js 18 or newer.

## Key features

- **Data and list:** 14 sample opportunities across 4 categories and 5 Rwandan cities, with free/paid, featured/regular and full/available examples. Rendered with `map()` using stable IDs as keys.
- **Search:** live, case-insensitive search by title and city; extra spaces are trimmed.
- **Filters:** category (with "All categories"), "Available only" and "Saved only". All filters combine.
- **Sorting:** earliest date, title A to Z, most places available. Sorting always works on a copy, so state and props are never mutated.
- **Result count and reset:** the current count is shown, and "Reset filters" restores the defaults.
- **Save / Unsave:** every card has a toggle; the saved count updates immediately and the "Saved only" view stays in sync.
- **Add opportunity form:** controlled inputs, validation with helpful messages, a unique permanent ID on creation, immutable insertion, a Clear form button and no page reload.
- **Conditional rendering:** Featured, Free and Fully booked badges; empty-results message with a reset action; demo Loading / Error / Ready states.
- **Accessibility:** associated labels on every field, correct button types, visible focus rings, semantic HTML (`header`, `main`, `section`, `article`, `time`) and live regions for status messages.

## Component overview

| Component | Purpose |
| --- | --- |
| `Button` | Reusable button with variants; defaults to `type="button"`. |
| `Badge` | Small coloured label (category, Featured, Free, Fully booked). |
| `Alert` | Info, success and error message box. |
| `TextInput` | Labelled controlled input with error and hint text. |
| `SelectInput` | Labelled controlled select with error text. |
| `Checkbox` | Labelled controlled checkbox. |
| `OpportunityCard` | Displays one opportunity from props; reports Save/Unsave upward via `onToggleSave`. |
| `OpportunityList` | Renders the list, empty state, loading state or error state. |
| `OpportunityFilters` | Search, category, sort, checkboxes and Reset button. |
| `AddOpportunityForm` | Controlled form with validation; sends the new record up via `onAdd`. |

## Conditional rendering patterns used

1. **Ternary:** `price === 0 ? "Free" : formatPrice(price)`, Save / Unsave label, form toggle.
2. **`&&`:** Featured, Free and Fully booked badges. Conditions are real booleans (`featured === true`, `price === 0`), and the result count is converted to a string, so a stray `0` never appears.
3. **`if` with early return:** `OpportunityList` returns early for loading, error and empty states.
4. **Precomputed JSX variable:** `seatsInfo` in `OpportunityCard`.
5. **Lookup object:** `STATUS` for availability labels.

## Project structure

```
src/
  components/      Button, Badge, Alert, TextInput, SelectInput, Checkbox,
                   OpportunityCard, OpportunityList, OpportunityFilters, AddOpportunityForm
  data/            seedOpportunities.js (sample data, categories, cities)
  utils/           filterOpportunities.js (pure filter + sort helper)
  App.jsx          page state and layout
  main.jsx         entry point
  index.css        Tailwind import
```

## Data model

```js
{
  id: "opp-001",            // permanent unique string
  title: "React for Beginners Bootcamp",
  category: "Short Course",
  city: "Kigali",
  date: "2026-12-07",       // ISO format
  description: "…",
  capacity: 18,             // places still available (0 = fully booked)
  price: 25000,             // RWF (0 = free)
  featured: true
}
```

## Manual test checklist

- Search `kigali`, `KIGALI` and `  kigali  ` and see the same results.
- Category + Available only narrow the list together.
- Sort by title, then by places; saved cards stay saved.
- Search `zzzz` to see the empty state and Reset filters.
- Seeded records with `capacity: 0` show Fully booked, and `price: 0` shows Free, with no stray `0`.
- Save a card, turn on Saved only, then unsave it; the count and view update.
- Submit the form empty to see validation messages; submit valid data to see the new card without a refresh.
- Click Loading and Error demo buttons, then Ready.
- Resize to a narrow mobile width; there should be no horizontal scrolling.
