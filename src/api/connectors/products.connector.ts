import { dummyjson } from "@/api/dummyjson";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "@/global/constants";
import type { ProductListResponse } from "@/types/product";

const PRODUCT_FIELDS =
  "id,title,description,category,price,discountPercentage,rating,stock,brand,thumbnail";

type GetProductsParams = {
  limit?: number;
  query?: string;
  skip?: number;
};

export async function getProducts({
  limit = NUMBER_OF_PRODUCTS_PER_PAGE,
  query,
  skip = 0,
}: GetProductsParams = {}): Promise<ProductListResponse> {
  const normalizedQuery = query?.trim();
  const endpoint = normalizedQuery ? "/products/search" : "/products";

  const response = await dummyjson.get<ProductListResponse>(endpoint, {
    params: {
      limit,
      q: normalizedQuery,
      select: PRODUCT_FIELDS,
      skip,
    },
  });

  return response.data;
}
