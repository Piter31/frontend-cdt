export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  costPrice: number;
  stock: number;
  sold: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: "cookies & alfajores" | "tartas" | "chocolates" | "otros";
  tags: string[];
  featured?: boolean;
  active?: boolean;
  ingredients: string[];
  allergens: string[];
}