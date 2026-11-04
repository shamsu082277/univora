import { IBlogArticle, IFeatureCard, IGalleryItem, IStatItem } from "@/types";

export const communityStats: IStatItem[] = [
  {
    id: "stat-1",
    label: "Active Volunteers",
    value: "12,500+",
    iconName: "users",
    highlight: "Platform Target",
  },
  {
    id: "stat-2",
    label: "Events Envisioned",
    value: "450+",
    iconName: "calendar-check",
    highlight: "Community Goal",
  },
  {
    id: "stat-3",
    label: "Lives Impacted",
    value: "85,000+",
    iconName: "heart",
    highlight: "Milestone Vision",
  },
  {
    id: "stat-4",
    label: "Grassroots Driven",
    value: "100%",
    iconName: "globe",
    highlight: "Core Principle",
  },
];

export const whatWeDoFeatures: IFeatureCard[] = [
  {
    id: "feature-1",
    title: "Community Support",
    description:
      "Mobilizing neighbor-to-neighbor aid, disaster relief logistics, and community resilience programs when it matters most.",
    iconName: "hand-heart",
    linkText: "Join Events",
    href: "/upcoming-events",
  },
  {
    id: "feature-2",
    title: "Environmental Care",
    description:
      "Reforestation drives, city canal cleanups, and waste recycling initiatives aimed at building greener, sustainable neighborhoods.",
    iconName: "tree-pine",
    linkText: "Join Events",
    href: "/upcoming-events",
  },
  {
    id: "feature-3",
    title: "Donation & Charity",
    description:
      "Transparent aid distribution including nutritious meals, emergency medical relief, and seasonal clothing supplies for families in need.",
    iconName: "gift",
    linkText: "Join Events",
    href: "/upcoming-events",
  },
  {
    id: "feature-4",
    title: "Education & Awareness",
    description:
      "Free youth coding workshops, mentorship circles, and public health awareness drives empowering underprivileged students.",
    iconName: "book-open",
    linkText: "Join Events",
    href: "/upcoming-events",
  },
];

export const mockBlogArticles: IBlogArticle[] = [
  {
    id: "blog-1",
    title: "From Seedlings to Shade: How 500 Volunteers Restored a Degraded Forest",
    category: "Environmental Action",
    coverImage: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    description:
      "A behind-the-scenes look at our 6-month continuous reforestation project that revived green cover and built community pride.",
    publishedAt: "Oct 28, 2026",
    readTime: "4 min read",
    slug: "restoring-degraded-forest-seedlings-to-shade",
  },
  {
    id: "blog-2",
    title: "The Ripple Effect of One Warm Meal: Dignity on the Streets",
    category: "Community Outreach",
    coverImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    description:
      "Why feeding people is not just about nutrition—it is about restoring dignity, building trust, and listening to unvoiced stories.",
    publishedAt: "Oct 24, 2026",
    readTime: "5 min read",
    slug: "ripple-effect-one-warm-meal",
  },
  {
    id: "blog-3",
    title: "Bridging the Digital Divide: Teaching Coding to First-Generation Learners",
    category: "Education & Growth",
    coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    description:
      "How our weekend tech circles opened up new career curiosity and self-belief for 80 young students from low-income communities.",
    publishedAt: "Oct 18, 2026",
    readTime: "6 min read",
    slug: "bridging-the-digital-divide-tech-circles",
  },
];

export const galleryItems: IGalleryItem[] = [
  {
    id: "gal-1",
    title: "Winter Clothes Distribution",
    category: "Charity & Warmth",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    alt: "Volunteers handing out warm winter blankets to local community members",
  },
  {
    id: "gal-2",
    title: "Tree Plantation",
    category: "Environment",
    imageUrl: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=800&q=80",
    alt: "Volunteer planting a sapling with soil in hands",
  },
  {
    id: "gal-3",
    title: "Food Distribution",
    category: "Nourishment",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    alt: "Community volunteers distributing fresh meals in boxes",
  },
  {
    id: "gal-4",
    title: "Community Cleanup",
    category: "Civic Action",
    imageUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
    alt: "Volunteers picking up plastic waste along a riverside",
  },
  {
    id: "gal-5",
    title: "Educational Activities",
    category: "Youth Literacy",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    alt: "Children gathered in an interactive reading and learning circle",
  },
  {
    id: "gal-6",
    title: "Volunteer Teamwork",
    category: "Community Spirit",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    alt: "A diverse group of cheerful volunteers standing together with raised hands",
  },
];

