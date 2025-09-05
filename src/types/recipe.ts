export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  createdAt?: string;
}
