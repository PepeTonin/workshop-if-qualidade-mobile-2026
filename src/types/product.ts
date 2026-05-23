export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
};

export type ProductListResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
