// ---------------------------------------------------------------------------
// AdForge Creative Pipeline — mock data layer
// Replace these exports with API calls (Claude/OpenAI, Supabase, n8n, Figma)
// once a backend is wired up. Shapes are intentionally close to a future DB.
// ---------------------------------------------------------------------------

export type ReviewStatus = "approved" | "needs-revision" | "rejected" | "pending";

export type StageStatus = "complete" | "active" | "upcoming";

export interface WorkflowStage {
  key: string;
  label: string;
  status: StageStatus;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  objective: string;
  status: "Active" | "Draft" | "Archived";
  channel: string[];
  progress: number; // 0-100
  updatedAt: string;
  owner: string;
}

export interface BrandInputs {
  brandName: string;
  tagline: string;
  productName: string;
  productDescription: string;
  category: string;
  pricePoint: string;
  targetAudience: string;
  toneOfVoice: string;
  brandValues: string[];
  competitors: string;
  keyBenefits: string[];
  doNotUse: string;
}

export interface MessagingPillar {
  id: string;
  pillar: string;
  promise: string;
  proofPoints: string[];
  emotion: string;
}

export interface GeneratedMessagingPillar {
  id: string;
  mode: "Stable" | "Experimental";
  pillar: string;
  sentiment: string;
  summary: string;
  evidencePhrases: string[];
  headlineSeeds: string[];
  callouts: string[];
}

export interface CompetitorInsight {
  id: string;
  competitor: string;
  positioning: string;
  emotionalHook: string;
  observedClaim: string;
  opportunity: string;
}

export interface AudienceInsight {
  id: string;
  segment: string;
  desire: string;
  painPoint: string;
  trigger: string;
  voiceOfCustomer: string;
}

export interface Concept {
  id: string;
  title: string;
  bigIdea: string;
  headline: string;
  subhead: string;
  cta: string;
  pillar: string;
  withProduct: boolean;
  format: string;
  tags: string[];
}

export interface Inspiration {
  id: string;
  brand: string;
  title: string;
  imageColor: string; // tailwind gradient classes for placeholder
  source: string;
  format: string;
  tags: string[];
  note: string;
}

export interface ImagePrompt {
  id: string;
  conceptTitle: string;
  model: string;
  aspectRatio: string;
  prompt: string;
  negativePrompt: string;
  styleTags: string[];
  withProduct: boolean;
}

export interface FigmaBrief {
  id: string;
  conceptTitle: string;
  deliverable: string;
  dimensions: string;
  copyBlocks: { label: string; value: string }[];
  assets: string[];
  layoutNotes: string;
  status: ReviewStatus;
}

export interface Revision {
  id: string;
  asset: string;
  conceptTitle: string;
  reviewer: string;
  status: ReviewStatus;
  feedback: string;
  round: number;
  updatedAt: string;
}

export type SubscriptionTier = "Consistent Flow" | "Scale" | "Scale+" | "Commission Only";
export type PaymentStatus = "On-going" | "Paid" | "Cancelled" | "Not Paid";
export type AdsOrder = "Silver" | "Gold" | "Platinum";
export type ClientProjectStatus = "On-going" | "Cancelled" | "Under Review" | "Completed" | "Frozen";

export const subscriptionTierOptions = [
  { tier: "Consistent Flow", price: 2500, label: "Silver / Pro" },
  { tier: "Scale", price: 4000, label: "Gold / Platinum" },
  { tier: "Scale+", price: 6000, label: "Platinum+" },
  { tier: "Commission Only", price: 0, label: "Bronze" },
] as const;

export const paymentStatusOptions: PaymentStatus[] = ["On-going", "Paid", "Cancelled", "Not Paid"];

export const adsOrderOptions = [
  { tier: "Silver", count: 48 },
  { tier: "Gold", count: 96 },
  { tier: "Platinum", count: 160 },
] as const;

export const projectStatusOptions: ClientProjectStatus[] = [
  "On-going",
  "Cancelled",
  "Under Review",
  "Completed",
  "Frozen",
];

export const productCategoryOptions = [
  "Functional beverage",
  "Coffee & tea",
  "Home goods",
  "Fitness coaching",
  "Beauty & personal care",
  "Supplements",
  "Apparel",
  "Consumer electronics",
  "Other",
];

export interface ClientAccount {
  id: string;
  clientName: string;
  contactPerson: string;
  website: string;
  product: string;
  subscriptionTier: SubscriptionTier;
  monthlyRetainer: number;
  subscriptionLabel: string;
  paymentStatus: PaymentStatus;
  adsOrder: AdsOrder;
  adCount: number;
  fulfilledAdCount: number;
  projectStatus: ClientProjectStatus;
  adsFolderUrl: string;
  projectDashboardPath: string;
  updatedAt: string;
}

export interface ProductReferenceImage {
  id: string;
  clientId: string;
  productName: string;
  label: string;
  type: "Hero product" | "Packaging" | "In-use" | "Texture";
  imageColor: string;
  fileName: string;
  note: string;
}

// ---------------------------------------------------------------------------

export const clientAccounts: ClientAccount[] = [
  {
    id: "client-001",
    clientName: "Acme Hydration",
    contactPerson: "Maya Flores",
    website: "https://acmehydration.example",
    product: "HydraGlow Electrolyte Drink",
    subscriptionTier: "Scale",
    monthlyRetainer: 4000,
    subscriptionLabel: "Gold / Platinum",
    paymentStatus: "On-going",
    adsOrder: "Gold",
    adCount: 96,
    fulfilledAdCount: 38,
    projectStatus: "On-going",
    adsFolderUrl: "https://drive.google.com",
    projectDashboardPath: "/clients/client-001",
    updatedAt: "2026-05-24T08:00:00Z",
  },
  {
    id: "client-002",
    clientName: "Northwind Coffee",
    contactPerson: "Jon Bell",
    website: "https://northwindcoffee.example",
    product: "Cold Brew Subscription",
    subscriptionTier: "Consistent Flow",
    monthlyRetainer: 2500,
    subscriptionLabel: "Silver / Pro",
    paymentStatus: "Paid",
    adsOrder: "Silver",
    adCount: 48,
    fulfilledAdCount: 19,
    projectStatus: "Under Review",
    adsFolderUrl: "https://drive.google.com",
    projectDashboardPath: "/clients/client-002",
    updatedAt: "2026-05-22T16:05:00Z",
  },
  {
    id: "client-003",
    clientName: "Luma Home",
    contactPerson: "Priya Shah",
    website: "https://lumahome.example",
    product: "Smart Ambient Lamp",
    subscriptionTier: "Scale+",
    monthlyRetainer: 6000,
    subscriptionLabel: "Platinum+",
    paymentStatus: "Not Paid",
    adsOrder: "Platinum",
    adCount: 160,
    fulfilledAdCount: 42,
    projectStatus: "Frozen",
    adsFolderUrl: "https://drive.google.com",
    projectDashboardPath: "/clients/client-003",
    updatedAt: "2026-05-19T14:30:00Z",
  },
  {
    id: "client-004",
    clientName: "BrightPath Fitness",
    contactPerson: "Elena Cruz",
    website: "https://brightpathfitness.example",
    product: "Hybrid Coaching Program",
    subscriptionTier: "Commission Only",
    monthlyRetainer: 0,
    subscriptionLabel: "Bronze",
    paymentStatus: "Cancelled",
    adsOrder: "Silver",
    adCount: 48,
    fulfilledAdCount: 12,
    projectStatus: "Cancelled",
    adsFolderUrl: "https://drive.google.com",
    projectDashboardPath: "/clients/client-004",
    updatedAt: "2026-05-11T09:15:00Z",
  },
];

export const productReferenceImages: ProductReferenceImage[] = [
  {
    id: "pri-001",
    clientId: "client-001",
    productName: "HydraGlow Electrolyte Drink",
    label: "Can hero front",
    type: "Hero product",
    imageColor: "from-cyan-200 via-sky-100 to-amber-100",
    fileName: "hydrglow-can-front.png",
    note: "Use as the primary packshot reference for product-visible ads.",
  },
  {
    id: "pri-002",
    clientId: "client-001",
    productName: "HydraGlow Electrolyte Drink",
    label: "Can in hand",
    type: "In-use",
    imageColor: "from-rose-200 via-orange-100 to-lime-100",
    fileName: "hydrglow-can-in-hand.jpg",
    note: "Good reference for lifestyle scenes with natural hand placement.",
  },
  {
    id: "pri-003",
    clientId: "client-002",
    productName: "Cold Brew Subscription",
    label: "Bottle lineup",
    type: "Packaging",
    imageColor: "from-stone-300 via-amber-100 to-white",
    fileName: "northwind-cold-brew-lineup.png",
    note: "Shows label hierarchy, bottle shape, and flavor set.",
  },
  {
    id: "pri-004",
    clientId: "client-003",
    productName: "Smart Ambient Lamp",
    label: "Lamp glow angle",
    type: "Hero product",
    imageColor: "from-indigo-200 via-violet-100 to-yellow-100",
    fileName: "luma-lamp-glow-angle.png",
    note: "Use for material finish, light spread, and silhouette accuracy.",
  },
];

export const currentProject: Project = {
  id: "p-001",
  name: "Spring Launch — HydraGlow",
  client: "Acme Hydration",
  objective: "Drive trial of the new HydraGlow electrolyte drink among active millennials.",
  status: "Active",
  channel: ["Meta", "TikTok", "Display"],
  progress: 64,
  updatedAt: "2026-05-22T10:00:00Z",
  owner: "Gerald K.",
};

export const projects: Project[] = [
  currentProject,
  {
    id: "p-002",
    name: "Always-On — Reorder Push",
    client: "Acme Hydration",
    objective: "Lift repeat purchase with a subscription-focused message.",
    status: "Draft",
    channel: ["Email", "Meta"],
    progress: 18,
    updatedAt: "2026-05-19T14:30:00Z",
    owner: "Gerald K.",
  },
  {
    id: "p-003",
    name: "Q1 Recap — Brand Lift",
    client: "Northwind Coffee",
    objective: "Build awareness for the cold brew line.",
    status: "Archived",
    channel: ["Display", "YouTube"],
    progress: 100,
    updatedAt: "2026-03-02T09:15:00Z",
    owner: "Gerald K.",
  },
];

export const workflowStages: WorkflowStage[] = [
  { key: "brand", label: "Brand Inputs", status: "complete" },
  { key: "messaging", label: "Messaging Map", status: "complete" },
  { key: "concepts", label: "Concepts", status: "complete" },
  { key: "inspiration", label: "Inspiration", status: "active" },
  { key: "prompts", label: "Image Prompts", status: "upcoming" },
  { key: "briefs", label: "Figma Briefs", status: "upcoming" },
  { key: "revisions", label: "Revisions", status: "upcoming" },
];

export const brandInputs: BrandInputs = {
  brandName: "HydraGlow",
  tagline: "Hydration that shows.",
  productName: "HydraGlow Electrolyte Drink",
  productDescription:
    "A sparkling electrolyte drink with skin-loving vitamins, 5g sugar, and no artificial colors. Designed for people who move.",
  category: "Functional beverage",
  pricePoint: "$2.99 / can · $29.99 / 12-pack",
  targetAudience:
    "Active millennials (26–38), urban, fitness-curious, value clean ingredients and design-forward brands.",
  toneOfVoice: "Energetic, witty, confident — never preachy.",
  brandValues: ["Clean ingredients", "Inclusive energy", "Design-led", "Sustainable cans"],
  competitors: "LMNT, Liquid I.V., Gatorade Fit, Waterloo",
  keyBenefits: [
    "5 essential electrolytes",
    "Only 5g of sugar",
    "Added biotin + vitamin C for skin",
    "Recyclable aluminum cans",
  ],
  doNotUse: "No medical/health claims. Avoid the word 'detox'. Don't show competitor logos.",
};

export const messagingMap: MessagingPillar[] = [
  {
    id: "m-1",
    pillar: "Clean energy",
    promise: "Feel energized without the sugar crash.",
    proofPoints: ["5g sugar", "5 essential electrolytes", "No artificial colors"],
    emotion: "Confidence",
  },
  {
    id: "m-2",
    pillar: "Hydration you can see",
    promise: "Glow from the inside out.",
    proofPoints: ["Added biotin", "Vitamin C", "Dermatologist-informed formula"],
    emotion: "Aspiration",
  },
  {
    id: "m-3",
    pillar: "Designed to move with you",
    promise: "A drink as active as you are.",
    proofPoints: ["Slim recyclable can", "Fits any gym bag", "Resealable on the go"],
    emotion: "Belonging",
  },
];

export const competitorInsights: CompetitorInsight[] = [
  {
    id: "comp-1",
    competitor: "Liquid I.V.",
    positioning: "Fast hydration multiplier for active, busy consumers.",
    emotionalHook: "Relief and readiness",
    observedClaim: "Electrolytes plus convenience for daily hydration.",
    opportunity: "Differentiate with lighter sugar, beauty-adjacent benefits, and a more design-led ritual.",
  },
  {
    id: "comp-2",
    competitor: "LMNT",
    positioning: "High-sodium performance hydration for serious training.",
    emotionalHook: "Competence and discipline",
    observedClaim: "No sugar, strong electrolyte replenishment.",
    opportunity: "Own a softer everyday performance lane without sounding clinical.",
  },
  {
    id: "comp-3",
    competitor: "Gatorade Fit",
    positioning: "Mainstream fitness hydration with cleaner credentials.",
    emotionalHook: "Familiar trust",
    observedClaim: "Real hydration benefits from a known sports brand.",
    opportunity: "Use sharper lifestyle language and premium visual identity to avoid commodity sports-drink cues.",
  },
  {
    id: "comp-4",
    competitor: "Recess",
    positioning: "Mood-led beverage for calm, style, and daily decompression.",
    emotionalHook: "Identity and vibe",
    observedClaim: "A drink that fits a modern wellness lifestyle.",
    opportunity: "Borrow the ritual feel while staying grounded in hydration and product facts.",
  },
];

export const audienceInsights: AudienceInsight[] = [
  {
    id: "aud-1",
    segment: "Active millennials",
    desire: "A clean daily drink that feels healthier without becoming a chore.",
    painPoint: "Skeptical of sugar-heavy sports drinks and vague wellness claims.",
    trigger: "Relief",
    voiceOfCustomer: "I want something that works, but I do not want it to feel like a gym supplement.",
  },
  {
    id: "aud-2",
    segment: "Fitness-curious professionals",
    desire: "Hydration that fits work, workouts, errands, and social routines.",
    painPoint: "Forgetfulness, afternoon crashes, and products that look too clinical.",
    trigger: "Autonomy",
    voiceOfCustomer: "I need the easy version of taking care of myself.",
  },
  {
    id: "aud-3",
    segment: "Design-led wellness shoppers",
    desire: "A functional product they are proud to carry and show.",
    painPoint: "Wellness products that feel generic, loud, or medicinal.",
    trigger: "Status",
    voiceOfCustomer: "If it is sitting on my desk, I want it to look intentional.",
  },
];

export const generatedMessagingPillars: GeneratedMessagingPillar[] = [
  {
    id: "gmp-1",
    mode: "Stable",
    pillar: "Clean Hydration, No Crash",
    sentiment: "Trust",
    summary:
      "Lead with the practical, defensible promise: hydration support without the sugar-heavy sports drink baggage. This pillar should stay close to product facts and repeatable proof points.",
    evidencePhrases: ["works without the crash", "not a sugary sports drink", "easy daily hydration"],
    headlineSeeds: ["Hydration Without The Crash", "Clean Energy, Easy Hydration"],
    callouts: ["5g sugar", "5 essential electrolytes", "No artificial colors"],
  },
  {
    id: "gmp-2",
    mode: "Stable",
    pillar: "Glow From Daily Ritual",
    sentiment: "Aspiration",
    summary:
      "Frame HydraGlow as a small daily ritual that makes wellness feel visible and repeatable. Keep claims grounded in the stated vitamin and hydration benefits.",
    evidencePhrases: ["glow from within", "a better daily habit", "hydration I can keep up with"],
    headlineSeeds: ["Your Daily Glow Ritual", "Hydration That Shows Up"],
    callouts: ["Added biotin", "Vitamin C", "Sparkling hydration"],
  },
  {
    id: "gmp-3",
    mode: "Stable",
    pillar: "Designed To Move",
    sentiment: "Autonomy",
    summary:
      "Position the product as portable hydration for people moving between workouts, commutes, and busy schedules. The creative should make the product feel effortless rather than intense.",
    evidencePhrases: ["fits my day", "grab and go", "not just for athletes"],
    headlineSeeds: ["Made For Days In Motion", "Hydration That Keeps Up"],
    callouts: ["Slim can", "Gym-bag ready", "Daily routine friendly"],
  },
  {
    id: "gmp-4",
    mode: "Stable",
    pillar: "Ingredient Confidence",
    sentiment: "Relief",
    summary:
      "Give skeptical buyers clear reasons to trust the product. This pillar is strongest when ads make the ingredient story scannable and transparent.",
    evidencePhrases: ["what is actually in it", "no weird colors", "cleaner option"],
    headlineSeeds: ["Know What You Sip", "Hydration With Receipts"],
    callouts: ["Clear formula", "Low sugar", "No artificial colors"],
  },
  {
    id: "gmp-5",
    mode: "Experimental",
    pillar: "Desk Status Hydration",
    sentiment: "Status",
    summary:
      "Explore the product as a visible identity signal for people who curate their workday and wellness routines. This can stretch the brand into style-led, office-friendly creative.",
    evidencePhrases: ["looks good on my desk", "wellness but make it normal", "intentional routine"],
    headlineSeeds: ["Your Desk Drink Upgrade", "Hydration With Taste"],
    callouts: ["Design-led can", "Workday friendly", "Clean sparkle"],
  },
  {
    id: "gmp-6",
    mode: "Experimental",
    pillar: "Soft Performance",
    sentiment: "Belonging",
    summary:
      "Challenge hardcore sports-drink language with a gentler performance identity. This pillar speaks to people who move, sweat, and recover without wanting a supplement persona.",
    evidencePhrases: ["not a gym bro drink", "for normal workouts", "still want it to work"],
    headlineSeeds: ["Performance, Softened", "For The Casual Athlete"],
    callouts: ["Workout ready", "Everyday electrolytes", "Light sugar"],
  },
  {
    id: "gmp-7",
    mode: "Experimental",
    pillar: "Anti-Boring Water",
    sentiment: "Rebellion",
    summary:
      "Use playful tension against plain water fatigue while staying credible. This angle can unlock punchier headlines without inventing product claims.",
    evidencePhrases: ["water gets boring", "need flavor to drink enough", "something I actually finish"],
    headlineSeeds: ["Bored Of Plain Water?", "Hydration You Finish"],
    callouts: ["Sparkling taste", "Electrolyte support", "Easy to drink"],
  },
  {
    id: "gmp-8",
    mode: "Experimental",
    pillar: "Beauty Meets Utility",
    sentiment: "Self-expression",
    summary:
      "Bridge beauty-coded glow language with functional beverage proof. The work should feel sensorial, but each ad needs a clear product fact to stay credible.",
    evidencePhrases: ["beauty from the inside", "actually functional", "pretty but useful"],
    headlineSeeds: ["Pretty Functional Hydration", "Glow Meets Electrolytes"],
    callouts: ["Biotin + vitamin C", "Functional sparkle", "Hydration support"],
  },
];

export const concepts: Concept[] = [
  {
    id: "c-1",
    title: "The Glow Check",
    bigIdea: "Your hydration shows up before your highlighter does.",
    headline: "Hydration that shows.",
    subhead: "5 electrolytes. 5g sugar. Skin-loving vitamins in every can.",
    cta: "Find your glow",
    pillar: "Hydration you can see",
    withProduct: true,
    format: "Static · Feed",
    tags: ["beauty", "hero-product", "close-up"],
  },
  {
    id: "c-2",
    title: "No Crash Club",
    bigIdea: "Energy without the 3pm cliff.",
    headline: "All the energy. None of the crash.",
    subhead: "Just 5g of sugar and the electrolytes your body actually wants.",
    cta: "Join the club",
    pillar: "Clean energy",
    withProduct: true,
    format: "Static · Story",
    tags: ["energy", "product-in-hand", "lifestyle"],
  },
  {
    id: "c-3",
    title: "Moves With You",
    bigIdea: "A day in motion, hydrated the whole way.",
    headline: "Made to move.",
    subhead: "Slim, resealable, and ready for wherever the day goes.",
    cta: "Grab a 12-pack",
    pillar: "Designed to move with you",
    withProduct: false,
    format: "Video · 9:16",
    tags: ["lifestyle", "motion", "no-product"],
  },
  {
    id: "c-4",
    title: "Inside Glow",
    bigIdea: "Beauty starts with hydration — abstract, sensorial.",
    headline: "Glow starts within.",
    subhead: "Skin-loving hydration, bottled.",
    cta: "Discover HydraGlow",
    pillar: "Hydration you can see",
    withProduct: false,
    format: "Static · Display",
    tags: ["abstract", "texture", "no-product"],
  },
];

export const inspiration: Inspiration[] = [
  {
    id: "i-1",
    brand: "Liquid Death",
    title: "Bold can-forward billboard",
    imageColor: "from-zinc-700 to-zinc-900",
    source: "OOH · 2025",
    format: "Static",
    tags: ["can-hero", "bold-type", "high-contrast"],
    note: "Strong single-product focus with attitude-led copy.",
  },
  {
    id: "i-2",
    brand: "Olipop",
    title: "Pastel flavor splash",
    imageColor: "from-rose-300 to-orange-200",
    source: "Meta · 2025",
    format: "Static",
    tags: ["color-pop", "flavor", "product-grid"],
    note: "Great use of color blocking to signal flavor variety.",
  },
  {
    id: "i-3",
    brand: "Alo Moves",
    title: "Movement-led lifestyle",
    imageColor: "from-emerald-300 to-teal-500",
    source: "TikTok · 2026",
    format: "Video",
    tags: ["motion", "lifestyle", "no-product"],
    note: "Hydration implied through active lifestyle, product subtle.",
  },
  {
    id: "i-4",
    brand: "Glossier",
    title: "Skin texture macro",
    imageColor: "from-pink-200 to-fuchsia-300",
    source: "Display · 2025",
    format: "Static",
    tags: ["macro", "beauty", "texture"],
    note: "Reference for the 'glow' / skin angle without product.",
  },
  {
    id: "i-5",
    brand: "Gatorade Fit",
    title: "Clean ingredient call-outs",
    imageColor: "from-sky-300 to-indigo-400",
    source: "Meta · 2026",
    format: "Static",
    tags: ["ingredient", "callout", "infographic"],
    note: "Clear way to communicate the '5g sugar' proof point.",
  },
  {
    id: "i-6",
    brand: "Recess",
    title: "Dreamy abstract gradient",
    imageColor: "from-violet-300 to-indigo-300",
    source: "OOH · 2025",
    format: "Static",
    tags: ["abstract", "calm", "no-product"],
    note: "Mood reference for the 'Inside Glow' concept.",
  },
];

export const imagePrompts: ImagePrompt[] = [
  {
    id: "ip-1",
    conceptTitle: "The Glow Check",
    model: "Midjourney v6",
    aspectRatio: "4:5",
    prompt:
      "A slim aluminum HydraGlow can held up to soft morning light, dewy condensation, glowing skin of a smiling woman in soft focus behind, peachy-gold color grade, editorial beauty photography, shallow depth of field",
    negativePrompt: "text, logos, harsh shadows, plastic bottle, cluttered background",
    styleTags: ["editorial", "warm", "dewy"],
    withProduct: true,
  },
  {
    id: "ip-2",
    conceptTitle: "Inside Glow",
    model: "DALL·E 3",
    aspectRatio: "1:1",
    prompt:
      "Abstract macro of luminous water droplets and golden light refractions on skin-like surface, sensorial and clean, premium beverage mood, no product visible, soft gradient of violet to gold",
    negativePrompt: "product, can, text, people, dark tones",
    styleTags: ["abstract", "macro", "premium"],
    withProduct: false,
  },
];

export const figmaBriefs: FigmaBrief[] = [
  {
    id: "fb-1",
    conceptTitle: "The Glow Check",
    deliverable: "Meta Feed — Static",
    dimensions: "1080 × 1350",
    copyBlocks: [
      { label: "Headline", value: "Hydration that shows." },
      { label: "Subhead", value: "5 electrolytes. 5g sugar. Skin-loving vitamins." },
      { label: "CTA", value: "Find your glow" },
    ],
    assets: ["hero-can.png", "glow-bg.jpg", "logo-white.svg"],
    layoutNotes:
      "Can centered, lower third for copy on a translucent gradient bar. Logo top-left. Keep CTA pill bottom-right.",
    status: "needs-revision",
  },
  {
    id: "fb-2",
    conceptTitle: "No Crash Club",
    deliverable: "Story — Static",
    dimensions: "1080 × 1920",
    copyBlocks: [
      { label: "Headline", value: "All the energy. None of the crash." },
      { label: "CTA", value: "Join the club" },
    ],
    assets: ["can-in-hand.png", "texture-noise.png"],
    layoutNotes: "Bold headline top, product in lower third, leave safe zone for UI.",
    status: "pending",
  },
];

export const revisions: Revision[] = [
  {
    id: "r-1",
    asset: "Glow Check — Feed v2",
    conceptTitle: "The Glow Check",
    reviewer: "Maya (Creative Director)",
    status: "needs-revision",
    feedback: "Love the direction. Push the can larger and warm up the highlight — feels slightly flat.",
    round: 2,
    updatedAt: "2026-05-23T11:20:00Z",
  },
  {
    id: "r-2",
    asset: "No Crash Club — Story v1",
    conceptTitle: "No Crash Club",
    reviewer: "Maya (Creative Director)",
    status: "approved",
    feedback: "Approved for production. Great energy and the copy lockup is clean.",
    round: 1,
    updatedAt: "2026-05-22T16:05:00Z",
  },
  {
    id: "r-3",
    asset: "Inside Glow — Display v1",
    conceptTitle: "Inside Glow",
    reviewer: "Devin (Brand Lead)",
    status: "rejected",
    feedback: "Too abstract for this placement — viewers won't connect it to the product. Revisit brief.",
    round: 1,
    updatedAt: "2026-05-21T09:40:00Z",
  },
  {
    id: "r-4",
    asset: "Moves With You — 9:16 v1",
    conceptTitle: "Moves With You",
    reviewer: "Maya (Creative Director)",
    status: "pending",
    feedback: "",
    round: 1,
    updatedAt: "2026-05-24T08:00:00Z",
  },
];
