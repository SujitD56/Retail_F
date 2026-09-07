export const retailerEventStats = {
  activeEvents: 2,
  totalEntries: 8,
  totalVotes: 12340,
  bestRank: "#3",
};

export const liveChallenge = {
  title: "ILKAL STYLE CHALLENGE 2026",
  endsIn: "Ends in 2 days",
  entries: 3,
  bestPerforming: "#3 (1,110 votes)",
  image: "/images/customer/events-landing-hero.png",
};

export const upcomingRetailerEvent = {
  title: "Heritage Draping Challenge",
  detail: "Registration opens September 1, 2026",
};

export const pastPerformance = [
  { event: "Style Challenge 2025", entries: 2, bestRank: "#5", votes: "4,210", prize: "—" },
  { event: "Bridal Edit 2025", entries: 1, bestRank: "#1", votes: "6,890", prize: "₹25,000 🏆" },
];

export const eventOverview = {
  title: "Ilkal Style Challenge 2026",
  dateRange: "August 16 — September 15, 2026",
  description:
    "Preserving and celebrating the exquisite craft of handloom Ilkal sarees. Merge rich Karnataka heritage with modern social commerce and global fashion aesthetics. Stylists and retailers compete globally for the highest community engagement.",
  requirements: [
    "Upload 9:16 vertical video reel format (max 60s)",
    "Feature at least one authentic Ilkal saree from your store",
    "Tag the listed catalog product in your entry to enable direct checkout",
  ],
  rewards: [
    { medal: "🥇", label: "Grand Prize: ₹25,000 cash reward + spotlight" },
    { medal: "🥈", label: "Runner Up: ₹15,000 cash reward + partner program" },
    { medal: "🥉", label: "Third Place: ₹10,000 cash reward" },
  ],
  joinedOn: "August 1, 2026",
  entriesSubmitted: 3,
  entriesRemaining: 2,
};

export const entryAnalytics = {
  entryTitle: "Heritage Red Border Kasuti",
  breadcrumb: "Events / Style Challenge 2026 / Heritage Red Border Kasuti",
  stats: [
    { label: "Votes", value: "1,110", note: "↑ 23% today" },
    { label: "Views", value: "28.6K", note: "92% completion rate" },
    { label: "Shares", value: "342", note: "Highly shared reel" },
    { label: "Comments", value: "89", note: "Positive feedback" },
    { label: "Rank", value: "#3", note: "Top trending tier" },
  ],
  voteTrend: [
    { day: "Day 1", value: 12 },
    { day: "Day 2", value: 18 },
    { day: "Day 3", value: 45 },
    { day: "Day 4", value: 30 },
    { day: "Day 5", value: 62 },
    { day: "Day 6", value: 85 },
    { day: "Day 7", value: 110 },
  ],
  engagement: [
    { label: "Likes", percent: 68 },
    { label: "Comments", percent: 12 },
    { label: "Shares", percent: 20 },
  ],
  taggedProduct: {
    name: "Ilkal Red Border Saree",
    price: "₹8,450",
    image: "/images/customer/product-trad-red-border.png",
    views: "1,240",
    cartAdds: 89,
    purchases: 12,
    revenue: "₹34,200",
  },
};

export const achievementBadges = [
  { title: "Event Winner", subtitle: "Bridal Edit 2025", icon: "trophy" },
  { title: "Top 5 Finalist", subtitle: "Style Challenge 2025", icon: "star" },
  { title: "Prolific Creator", subtitle: "10+ entries submitted", icon: "film" },
  { title: "Community Favourite", subtitle: "Most commented overall", icon: "heart" },
  { title: "Trending Entry", subtitle: "Trending #1 for 3 days", icon: "trending-up" },
  { title: "Viral Reel", subtitle: "10K+ views on single reel", icon: "play" },
  { title: "Vote Magnet", subtitle: "5K+ votes on single entry", icon: "thumbs-up" },
  { title: "Shop Converter", subtitle: "50+ purchases from reels", icon: "shopping-bag" },
  { title: "Grand Slam", subtitle: "Win 3 events (1/3 done)", icon: "award" },
  { title: "Legendary Status", subtitle: "Win 5 events total", icon: "crown" },
] as const;
