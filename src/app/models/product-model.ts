export type Product = {
  id: number;
  name: string;
  category: string;
  iconPaths: string[];
  price: number;
  oldPrice?: number;
  badge?: string;
  rating: number;
  stock: number;
  description: string;
  specs: string[];
};

export interface Category {
  title: string;
  link: string;
  count: number;
  iconPaths: string[];
}
