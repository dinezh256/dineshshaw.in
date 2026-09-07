export const healthProfile = {
  currentPhase: "Cut / Recomposition",
  headline: "Getting stronger, leaner, and healthier.",
  summary:
    "A personal log of training, nutrition, body composition, and the habits I am building along the way.",
  rotatorPrefix: "Tracking",
  rotatorWords: ["training", "nutrition", "consistency"],
  heroMeta: [
    { label: "Current phase", value: "Cut / Recomposition" },
    { label: "Training", value: "Morning, 7:30-9:30 AM" },
    { label: "Focus", value: "Strength, nutrition, consistency" },
  ],
  metrics: [
    { label: "Weight", value: "72", unit: "kg", note: "Current" },
    { label: "Body fat", value: "22", unit: "%", note: "Tracked estimate" },
    { label: "Lean mass", value: "56.2", unit: "kg", note: "Tracked estimate" },
    { label: "Training", value: "6", unit: "days/week", note: "Current rhythm" },
    { label: "Protein", value: "130+", unit: "g/day", note: "Most days" },
    { label: "Sleep", value: "7", unit: "hrs", note: "Average target" },
  ],
  journey: [
    {
      date: "Jun 2026",
      title: "Started treating fitness systematically",
      description:
        "Moved from vague intent to a more deliberate routine around training, food, and recovery.",
    },
    {
      date: "Jul 2026",
      title: "Nutrition became easier to repeat",
      description:
        "Started paying closer attention to protein, body composition, and meals that fit normal days.",
    },
    {
      isCurrent: true,
      title: "Consistent morning training",
      description:
        "Settled into a 7:30-9:30 AM training block and began tracking the journey more visibly.",
      metric: "Current",
    },
  ],
  routine: [
    {
      time: "07:00",
      title: "Wake up",
      detail: "Start the day without making the routine complicated.",
    },
    {
      time: "07:15",
      title: "Pre-workout",
      detail: "Black coffee and a banana.",
    },
    {
      time: "07:30-09:30",
      title: "Workout",
      detail: "Strength training with a focus on showing up consistently.",
    },
    {
      time: "09:30",
      title: "Post-workout",
      detail: "Whey, creatine, eggs, oats or muesli, and isabgol.",
    },
    {
      time: "13:00",
      title: "Lunch",
      detail: "Chicken or paneer, broccoli, rice, salad, and vegetables.",
    },
    {
      time: "17:00",
      title: "Evening",
      detail: "Guava or bread with tea.",
    },
    {
      time: "20:30",
      title: "Dinner",
      detail: "Chicken or paneer salad with bread or roti and Diet Coke.",
    },
  ],
  nutritionIntro:
    "This is not a perfect meal plan. It is a routine I can repeat.",
  nutrition: [
    {
      meal: "Pre-workout",
      time: "07:15",
      foods: ["Black coffee", "Banana"],
      purpose: "Caffeine and an easy-to-digest carbohydrate source.",
    },
    {
      meal: "Post-workout",
      time: "09:30",
      foods: [
        "Whey + creatine",
        "2 whole eggs + 2 egg whites",
        "50 g oats or muesli",
        "Isabgol with water",
      ],
      purpose: "Protein, carbs, and a repeatable recovery meal.",
    },
    {
      meal: "Lunch",
      time: "13:00",
      foods: [
        "200 g cooked chicken breast or low-fat paneer",
        "100-150 g broccoli",
        "150 g steamed rice",
        "Salad and vegetables",
      ],
      purpose: "The main structured meal of the day.",
    },
    {
      meal: "Evening",
      time: "17:00",
      foods: ["Guava or bread", "Tea"],
      purpose: "Simple snack, not a second meal-plan project.",
    },
    {
      meal: "Dinner",
      time: "20:30",
      foods: [
        "Chicken or paneer",
        "Large salad",
        "1 bread or 1 roti",
        "Diet Coke",
      ],
      purpose: "Protein-forward, lighter, and easy to assemble.",
    },
  ],
  training: {
    time: "07:30-09:30",
    frequency: "6 days / week",
    focus: "Strength + muscle",
    split: "Push, pull, legs, repeat",
    week: [
      { day: "Mon", status: "train", workout: "Push" },
      { day: "Tue", status: "train", workout: "Pull" },
      { day: "Wed", status: "train", workout: "Legs" },
      { day: "Thu", status: "train", workout: "Push" },
      { day: "Fri", status: "train", workout: "Pull" },
      { day: "Sat", status: "train", workout: "Legs" },
      { day: "Sun", status: "rest", workout: "Rest" },
    ],
  },
  progress: {
    goal: {
      label: "Weight direction",
      current: 72,
      target: 68,
      unit: "kg",
      note: "Direction, not medical precision.",
    },
    series: [
      { date: "Jun 01", weight: 76.2, bodyFat: 25.1, leanMass: 57.1 },
      { date: "Jun 15", weight: 75.4, bodyFat: 24.5, leanMass: 57.0 },
      { date: "Jul 01", weight: 74.6, bodyFat: 23.8, leanMass: 56.8 },
      { date: "Jul 15", weight: 73.9, bodyFat: 23.1, leanMass: 56.6 },
      { date: "Aug 01", weight: 73.1, bodyFat: 22.7, leanMass: 56.5 },
      { date: "Aug 15", weight: 72.5, bodyFat: 22.4, leanMass: 56.3 },
      { date: "Sep 07", weight: 72, bodyFat: 22, leanMass: 56.2 },
    ],
  },
  principles: [
    {
      title: "Consistency",
      description:
        "I care more about showing up repeatedly than having perfect days.",
    },
    {
      title: "Strength",
      description:
        "The goal is not simply to weigh less. I want to become stronger while becoming leaner.",
    },
    {
      title: "Nutrition",
      description: "Keep the diet simple enough to repeat.",
    },
    {
      title: "Data",
      description:
        "Measure progress, but do not let a single measurement define it.",
    },
    {
      title: "Sustainability",
      description: "The best routine is the one I can maintain.",
    },
  ],
  journal: [
    {
      date: "Aug 2026",
      title: "Morning training became the anchor",
      body: "Changed my morning routine and started training consistently between 7:30 and 9:30 AM.",
    },
    {
      date: "Jul 2026",
      title: "Protein and recovery got more attention",
      body: "Started paying closer attention to protein, body composition, and whether the routine was recoverable.",
    },
    {
      date: "Jun 2026",
      title: "The experiment became explicit",
      body: "Started treating fitness more systematically instead of hoping motivation would handle it.",
    },
  ],
};
