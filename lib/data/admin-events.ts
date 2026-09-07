export const eventOverviewStats = [
  { label: "Active Events", value: "1", note: "Currently Live" },
  { label: "Upcoming Drafts", value: "2", note: "Launches scheduled" },
  { label: "Total Past Events", value: "9", note: "Archived entries live" },
  { label: "Total Submissions", value: "890+", note: "Across all contests" },
];

export const liveContests = [
  { name: "Ilkal Style Challenge 2026", status: "Voting Open", entries: 124, votes: "18.6K", startDate: "Aug 1, 2026", endDate: "Aug 17, 2026" },
];

export const upcomingDrafts = [
  { title: "Heritage Draping Challenge", detail: "Registration opens Sept 1 · Scheduled Draft", imageUrl: "/images/customer/product-crimson-zari-wedding.png" },
  { title: "Ilkal Bridal Edit 2026", detail: "Registration opens Oct 15 · Upcoming Showcase", imageUrl: "/images/customer/product-mustard-festive.png" },
];

export const recentLiveActivity = [
  { message: "@style_by_priya submitted a new video entry", time: "2 mins ago" },
  { message: "Girish Silks approved for event registration", time: "14 mins ago" },
  { message: "System crossed 18,000 public votes cast", time: "1 hour ago" },
  { message: "Admin updated guidelines for Bridal Edit", time: "4 hours ago" },
];

export const eventCategoryOptions = [
  "Handloom Style & Draping Challenge",
  "Bridal & Festive Showcase",
  "Contemporary Fusion Challenge",
  "Heritage Weaving Contest",
];

export const eventFormDefaults = {
  name: "Ilkal Style Challenge 2026",
  tagline: "Show us how you style the legendary Ilkal Saree.",
  description:
    "Describe here the main parameters and aesthetic expectations for the weavers, designers, and general public styling submissions.",
  category: "Handloom Style & Draping Challenge",
  registration: { start: "Aug 1, 2026", end: "Aug 15, 2026" },
  submission: { start: "Aug 16, 2026", end: "Sept 1, 2026" },
  voting: { start: "Sept 2, 2026", end: "Sept 12, 2026" },
  entryFormat: "Vertical Reel Video (9:16)",
  maxEntriesPerRetailer: "3",
  toggles: ["Require Pure Handloom Certification", "Enable Direct Saree Product Tagging"],
  prizes: [
    { place: "Grand Winner", cash: "₹25,000", perks: "+ ₹5,000 purchase coupon & frontpage showcase" },
    { place: "Runner Up", cash: "₹15,000", perks: "+ ₹3,000 purchase coupon & weaver highlight" },
    { place: "Third Place", cash: "₹10,000", perks: "+ accredited weaving partner certificate" },
  ],
  jury: [
    { name: "Smt. Shaila Patil", role: "Weaving Society Director" },
    { name: "Rohit Balan", role: "High-Fashion Stylist" },
    { name: "Ananya Deshpande", role: "Textile Historian" },
  ],
};

export const moderationTabs = [
  { key: "all", label: "All", count: 127 },
  { key: "pending", label: "Pending Review", count: 3 },
  { key: "approved", label: "Approved", count: 121 },
  { key: "flagged", label: "Flagged", count: 2 },
  { key: "rejected", label: "Rejected", count: 1 },
] as const;

export interface ModerationCard {
  id: string;
  title: string;
  retailer: string;
  verified: boolean;
  submittedOn: string;
  taggedSaree: string;
  complianceScore: number;
  complianceNote: string;
  riskLevel: "safe" | "review" | "risk";
  imageUrl: string;
}

export const moderationQueue: ModerationCard[] = [
  {
    id: "mod_1",
    title: "Royal Crimson & Kasuti Heritage Pleat",
    retailer: "Sri Lakshmi Sarees",
    verified: true,
    submittedOn: "Sep 10, 2026",
    taggedSaree: "Pure Silk Red Temple Border Saree",
    complianceScore: 98,
    complianceNote: "Auto-Mod Compliance Score: 98% (Safe)",
    riskLevel: "safe",
    imageUrl: "/images/customer/product-crimson-zari-wedding.png",
  },
  {
    id: "mod_2",
    title: "Contempo Dhoti drape with Guledgudda Khana Blouse",
    retailer: "Kalyan Handlooms",
    verified: true,
    submittedOn: "Sep 09, 2026",
    taggedSaree: "Modern Navy Cotton Fusion Saree",
    complianceScore: 85,
    complianceNote: "Auto-Mod Compliance Score: 85% (Review Required — Background Audio)",
    riskLevel: "review",
    imageUrl: "/images/customer/product-navy-chikki-paras.png",
  },
  {
    id: "mod_3",
    title: "Sunset Chariot Weave Walk",
    retailer: "Banashankari Weavers",
    verified: true,
    submittedOn: "Sep 08, 2026",
    taggedSaree: "Orange Temple Border Classic",
    complianceScore: 42,
    complianceNote: "Auto-Mod Compliance Score: 42% (Plagiarism Risk)",
    riskLevel: "risk",
    imageUrl: "/images/customer/product-mustard-festive.png",
  },
];

export const submissionRules = [
  {
    title: "1. Authentic Ilkal Fabric",
    body: "The showcased saree must prominently feature traditional Ilkal borders (Chikki Paras, Gomi, or Gayathri) and cotton-silk blend properties.",
  },
  {
    title: "2. Saree Product Tagging",
    body: "Each submission must tag a verified catalog product from an accredited Karnataka handloom cooperative/retailer.",
  },
  {
    title: "3. High Fidelity Presentation",
    body: "The video must have clear lighting, showcase complete draping mechanics, and contain no third-party branding overlays.",
  },
];

export const eventAnalyticsKpis = [
  { label: "Total Entries", value: "124" },
  { label: "Total Votes", value: "18.6K" },
  { label: "Unique Voters", value: "8,421" },
  { label: "Total Views", value: "320K" },
  { label: "Avg. Votes / Entry", value: "150" },
  { label: "Conversion Rate", value: "3.2%" },
];

export const votingTrend = [
  { day: "W1", votes: 900 },
  { day: "W2", votes: 1500 },
  { day: "W3", votes: 2600 },
  { day: "W4", votes: 3400 },
  { day: "W5", votes: 3000 },
  { day: "W6", votes: 3800 },
  { day: "W7", votes: 4600 },
];

export const topPerformingEntries = [
  { title: "Modern Navy Fusion Drape", votes: 4200 },
  { title: "Classic Red Border Heritage", votes: 3900 },
  { title: "Contempo Dhoti drape", votes: 3500 },
  { title: "Kasuti Lotus Blossom", votes: 1420 },
  { title: "Sunset Temple Border", votes: 1290 },
];

export const engagementFunnel = [
  { step: "Views", value: "320K (100%)", percent: 100 },
  { step: "Viewers", value: "142K (44.3%)", percent: 44.3 },
  { step: "Voters", value: "8,421 (5.9%)", percent: 5.9 },
  { step: "Repeat Voters", value: "2,100 (1.4%)", percent: 1.4 },
  { step: "Shoppers", value: "890 (0.6%)", percent: 0.6 },
];

export const commerceImpact = [
  { label: "Attributed Revenue", value: "₹4,82,000" },
  { label: "Reel Product Clicks", value: "12,400" },
  { label: "Add to Carts", value: "2,100" },
  { label: "Direct Purchases", value: "890" },
];

export const retailerParticipation = [
  { name: "Sri Lakshmi Sarees", entries: 5, votes: "12,500", accreditationId: "ACC-2026-042", region: "Bagalkot" },
  { name: "Kalyan Handlooms", entries: 4, votes: "4,200", accreditationId: "ACC-2026-118", region: "Guledgudda" },
  { name: "Banashankari Weavers", entries: 3, votes: "3,500", accreditationId: "ACC-2026-009", region: "Ilkal" },
  { name: "Girish Silks", entries: 2, votes: "2,400", accreditationId: "ACC-2026-056", region: "Hubli" },
];
