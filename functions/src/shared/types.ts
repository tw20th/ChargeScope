export type Guide = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  createdAt?: string;
  content: string;
  tags?: string[];
  readingTime?: number;
  author?: string;
  reviewed?: boolean;
  status?: "draft" | "published";
};
