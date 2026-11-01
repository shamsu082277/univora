export interface IEvent {
  id: string;
  title: string;
  category: "Community Support" | "Environmental Care" | "Donation & Charity" | "Education & Awareness";
  location: string;
  date: string;
  thumbnail: string;
  description: string;
  organizer: string;
  attendeesCount: number;
}

export interface IStatItem {
  id: string;
  label: string;
  value: string;
  iconName: "users" | "calendar-check" | "heart" | "globe";
  highlight?: string;
}

export interface IFeatureCard {
  id: string;
  title: string;
  description: string;
  iconName: "hand-heart" | "tree-pine" | "gift" | "book-open";
  linkText: string;
  href: string;
}

export interface IBlogArticle {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  description: string;
  publishedAt: string;
  readTime: string;
  slug: string;
}

export interface IGalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  alt: string;
  aspectRatio?: "square" | "wide";
}

