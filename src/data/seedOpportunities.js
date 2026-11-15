// SAMPLE CONTENT: every record below is fictional and only used to demonstrate the app.
// `capacity` is the number of places still available (0 = fully booked).
// `price` is in Rwandan francs (RWF); 0 means free.

export const CATEGORIES = [
  "Workshop",
  "Career Event",
  "Community Activity",
  "Short Course",
];

export const CITIES = ["Kigali", "Huye", "Musanze", "Rubavu", "Rusizi"];

export const seedOpportunities = [
  {
    id: "opp-001",
    title: "React for Beginners Bootcamp",
    category: "Short Course",
    city: "Kigali",
    date: "2026-12-07",
    description:
      "A hands-on introduction to React components, props and state, taught through small projects.",
    capacity: 18,
    price: 25000,
    featured: true,
  },
  {
    id: "opp-002",
    title: "Kigali Youth Career Fair",
    category: "Career Event",
    city: "Kigali",
    date: "2026-12-12",
    description:
      "Meet sample employers, review CVs and learn how to prepare for your first job interview.",
    capacity: 120,
    price: 0,
    featured: true,
  },
  {
    id: "opp-003",
    title: "Lake Kivu Clean-up Day",
    category: "Community Activity",
    city: "Rubavu",
    date: "2026-12-05",
    description:
      "Join neighbours to clean the lake shore and learn simple ways to reduce plastic waste.",
    capacity: 60,
    price: 0,
    featured: false,
  },
  {
    id: "opp-004",
    title: "Digital Marketing Essentials",
    category: "Short Course",
    city: "Huye",
    date: "2026-12-14",
    description:
      "Learn social media planning, basic analytics and how to promote a small business online.",
    capacity: 0,
    price: 30000,
    featured: false,
  },
  {
    id: "opp-005",
    title: "Public Speaking Workshop",
    category: "Workshop",
    city: "Musanze",
    date: "2026-12-09",
    description:
      "Practise structuring a talk, controlling nerves and presenting ideas with confidence.",
    capacity: 12,
    price: 8000,
    featured: false,
  },
  {
    id: "opp-006",
    title: "Women in Tech Networking Evening",
    category: "Career Event",
    city: "Kigali",
    date: "2026-12-18",
    description:
      "An evening of short talks and networking with mentors working in technology.",
    capacity: 45,
    price: 0,
    featured: true,
  },
  {
    id: "opp-007",
    title: "Community Tree Planting",
    category: "Community Activity",
    city: "Musanze",
    date: "2026-12-06",
    description:
      "Help plant indigenous trees near Volcanoes National Park and meet local conservation groups.",
    capacity: 80,
    price: 0,
    featured: false,
  },
  {
    id: "opp-008",
    title: "Excel for Small Business",
    category: "Workshop",
    city: "Huye",
    date: "2026-12-11",
    description:
      "Build simple budgets, track sales and create clear charts using spreadsheets.",
    capacity: 22,
    price: 10000,
    featured: false,
  },
  {
    id: "opp-009",
    title: "Introduction to Graphic Design",
    category: "Short Course",
    city: "Rusizi",
    date: "2026-12-20",
    description:
      "Explore colour, layout and typography while designing a poster for a local event.",
    capacity: 15,
    price: 20000,
    featured: false,
  },
  {
    id: "opp-010",
    title: "Entrepreneurship Pitch Day",
    category: "Career Event",
    city: "Rubavu",
    date: "2026-12-16",
    description:
      "Pitch a business idea to a friendly panel and receive feedback from local founders.",
    capacity: 0,
    price: 5000,
    featured: true,
  },
  {
    id: "opp-011",
    title: "Basic First Aid Workshop",
    category: "Workshop",
    city: "Kigali",
    date: "2026-12-10",
    description:
      "Learn essential first aid skills, from treating minor injuries to responding in emergencies.",
    capacity: 30,
    price: 0,
    featured: false,
  },
  {
    id: "opp-012",
    title: "Neighbourhood Reading Circle",
    category: "Community Activity",
    city: "Huye",
    date: "2026-12-13",
    description:
      "A relaxed weekly reading session where learners share books and practise English together.",
    capacity: 25,
    price: 0,
    featured: false,
  },
  {
    id: "opp-013",
    title: "Data Skills with Python",
    category: "Short Course",
    city: "Kigali",
    date: "2026-12-21",
    description:
      "Clean, explore and visualise small datasets using beginner-friendly Python tools.",
    capacity: 3,
    price: 35000,
    featured: true,
  },
  {
    id: "opp-014",
    title: "CV and Interview Clinic",
    category: "Workshop",
    city: "Rusizi",
    date: "2026-12-08",
    description:
      "One-to-one feedback on your CV plus mock interviews with volunteer professionals.",
    capacity: 10,
    price: 2000,
    featured: false,
  },
];
