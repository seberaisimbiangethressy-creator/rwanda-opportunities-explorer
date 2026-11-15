/**
 * Pure helper that derives the visible list from the full list and the filter settings.
 * It never mutates its inputs: filter() returns a new array and sort runs on that copy.
 */
export function getVisibleOpportunities(
  opportunities,
  { search, category, sortBy, availableOnly, savedOnly, savedIds },
) {
  const term = search.trim().toLowerCase();

  const filtered = opportunities.filter((item) => {
    const matchesSearch =
      term === "" ||
      item.title.toLowerCase().includes(term) ||
      item.city.toLowerCase().includes(term);
    const matchesCategory = category === "all" || item.category === category;
    const matchesAvailable = !availableOnly || item.capacity > 0;
    const matchesSaved = !savedOnly || savedIds.includes(item.id);
    return matchesSearch && matchesCategory && matchesAvailable && matchesSaved;
  });

  // `filtered` is already a new array, but we copy again so this stays safe
  // even if the filter step is ever removed.
  const sorted = [...filtered];

  if (sortBy === "title") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "seats") {
    sorted.sort((a, b) => b.capacity - a.capacity || a.title.localeCompare(b.title));
  } else {
    // ISO dates (YYYY-MM-DD) sort correctly as strings.
    sorted.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
  }

  return sorted;
}
