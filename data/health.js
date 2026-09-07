export const healthProfile = {
  currentPhase: "Cut / Recomposition",
  headline: "Getting stronger, leaner, and healthier.",
  summary:
    "A personal log of training, nutrition, body composition, and the habits I am building along the way.",
  rotatorPrefix: "Tracking",
  rotatorWords: ["training", "nutrition", "consistency"],
  instagramChannel: {
    handle: "dns.builds",
    url: "https://www.instagram.com/dns.builds/",
  },
  heroMeta: [
    { label: "Current phase", value: "Cut / Recomposition" },
    { label: "Training", value: "Morning, 7:30-9:30 AM" },
    { label: "Focus", value: "Strength, nutrition, consistency" },
  ],
  metrics: [
    { label: "Weight", value: "72.0", unit: "kg", note: "Current baseline" },
    { label: "Body fat", value: "22", unit: "%", note: "Current baseline" },
    { label: "Lean body mass", value: "56.2", unit: "kg", note: "Current estimate" },
    { label: "Target weight", value: "68", unit: "kg", note: "Long-term direction" },
    { label: "Target body fat", value: "~15", unit: "%", note: "Long-term direction" },
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
    goals: [
      {
        label: "Weight",
        current: 72,
        target: 68,
        currentLabel: "72.0 kg",
        targetLabel: "68.0 kg",
        unit: "kg",
      },
      {
        label: "Body fat",
        current: 22,
        target: 15,
        currentLabel: "22%",
        targetLabel: "~15%",
        unit: "%",
      },
    ],
    goalNote:
      "The aim is fat loss while preserving or building lean mass, not simply reaching a lighter number.",
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
      date: "Sep 2026",
      title: "Building consistency",
      body: [
        "The focus has shifted from simply losing weight to building a leaner, stronger body while keeping the process sustainable.",
        "My current routine revolves around morning training, usually between 7:30 and 9:30 AM, with a structured diet built around protein, simple carbohydrates, vegetables, and meals that are easy to repeat.",
        "The longer-term goal is approximately 68 kg while preserving or gaining muscle and becoming noticeably leaner.",
      ],
      highlight: "Current: 72 kg · 22% body fat · 56.2 kg lean body mass",
    },
    {
      date: "Aug 2026",
      title: "Taking the process seriously",
      body: [
        "I started approaching my health more systematically.",
        "Instead of looking at individual meals or workouts in isolation, I began thinking about the bigger picture: body composition, nutrition, training, recovery, and consistency.",
      ],
      highlight: "68 kg while building more muscle and moving toward roughly 15% body fat.",
    },
    {
      date: "Aug 2026",
      title: "Finding a repeatable diet",
      body: [
        "My nutrition settled into a routine that I could realistically repeat.",
        "Black coffee and a banana before training. Whey and creatine, eggs, and oats or muesli after training. Chicken or paneer, rice and vegetables for lunch. Fruit or bread with tea in the evening. Chicken or paneer salad with a small amount of bread or roti for dinner.",
      ],
      highlight: "The diet doesn't need to be exciting. It needs to be repeatable.",
    },
    {
      date: "Aug 2026",
      title: "Learning to think in body composition",
      body: [
        "One of the biggest changes in how I think about the journey has been understanding that weight alone isn't the goal.",
        "At 72 kg and 22% body fat, I currently have approximately 56.2 kg of lean body mass.",
        "The question isn't simply how quickly I can get to 68 kg. It's how much of that change can come from losing fat while maintaining or gaining muscle.",
        "The target is a physique that looks leaner and more defined, not simply a lighter version of myself.",
      ],
    },
    {
      date: "Aug 2026",
      title: "Small decisions add up",
      body: [
        "A lot of the journey has been about learning that individual choices don't need to be perfect.",
        "Questions about food choices, protein sources, carbohydrates and even whether small treats can fit into the day are really part of a bigger question: can I make choices that support the goal without making the process miserable?",
        "I'm learning to build a routine that has room for normal life.",
      ],
      highlight: "Consistency over perfection.",
    },
  ],
};
