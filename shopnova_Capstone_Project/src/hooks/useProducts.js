import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

// ─── useFetch: generic GET hook ───────────────────────────────────────────────
export function useFetch(url) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetchData = useCallback(async () => {
    if (!url) return
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get(url)
      setData(res.data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// ─── useProducts: all products with optional category filter ──────────────────
export function useProducts(category = '') {
  const url = category
    ? `${BASE_URL}/products/category/${encodeURIComponent(category)}`
    : `${BASE_URL}/products`

  return useFetch(url)
}

// ─── useProduct: single product by id ────────────────────────────────────────
export function useProduct(id) {
  return useFetch(id ? `${BASE_URL}/products/${id}` : null)
}

// ─── useCategories: list of all categories ───────────────────────────────────
export function useCategories() {
  return useFetch(`${BASE_URL}/products/categories`)
}
