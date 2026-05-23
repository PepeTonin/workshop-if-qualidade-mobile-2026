import { useDeferredValue, useEffect, useState } from "react";

import { getProducts } from "@/api/connectors/products.connector";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "@/global/constants";
import type { Product } from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);

  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const totalPages = Math.max(
    1,
    Math.ceil(total / NUMBER_OF_PRODUCTS_PER_PAGE),
  );

  async function loadProducts() {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getProducts({
        limit: NUMBER_OF_PRODUCTS_PER_PAGE,
        query: normalizedQuery,
        skip: (page - 1) * NUMBER_OF_PRODUCTS_PER_PAGE,
      });

      setProducts(result.products);
      setTotal(result.total);
    } catch {
      setError("Products could not be loaded from DummyJSON.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, [page, normalizedQuery]);

  function goToNextPage() {
    setPage((currentPage) => Math.min(currentPage + 1, totalPages));
  }

  function goToPreviousPage() {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function updateQuery(nextQuery: string) {
    setPage(1);
    setQuery(nextQuery);
  }

  return {
    products,
    filteredProducts: products,
    goToNextPage,
    goToPreviousPage,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    isLoading,
    error,
    page,
    query,
    setQuery: updateQuery,
    total,
    totalPages,
    refetch: loadProducts,
  };
}
