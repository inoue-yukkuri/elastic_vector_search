import axios from 'axios';
import { Product } from '../types/Product';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  // 全商品を取得
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },

  // 商品を検索
  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },

  // 名前で検索
  searchByName: async (name: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/search/name?name=${encodeURIComponent(name)}`);
    return response.data;
  },

  // 説明で検索
  searchByDescription: async (description: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/search/description?description=${encodeURIComponent(description)}`);
    return response.data;
  },

  // カテゴリで検索
  searchByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/search/category?category=${encodeURIComponent(category)}`);
    return response.data;
  },

  // 価格範囲で検索
  searchByPriceRange: async (minPrice: number, maxPrice: number): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/search/price?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    return response.data;
  },

  // 商品を作成
  createProduct: async (product: Product): Promise<Product> => {
    const response = await api.post<Product>('/products', product);
    return response.data;
  },

  // 商品を更新
  updateProduct: async (id: string, product: Product): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  // 商品を削除
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // CSVファイルをインポート
  importFromCsv: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<string>('/products/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 商品数を取得
  getProductCount: async (): Promise<number> => {
    const response = await api.get<number>('/products/count');
    return response.data;
  },
};
