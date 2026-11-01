export * from "./event";

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
