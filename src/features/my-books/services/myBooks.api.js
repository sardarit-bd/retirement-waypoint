import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const myBooksApi = {
  // Get all purchased books
  getMyBooks: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.MY_BOOKS.ALL, { params });
    return response.data;
  },

  // Get single book by ID
  getMyBook: async (bookId) => {
    const response = await api.get(API_ENDPOINTS.MY_BOOKS.SINGLE(bookId));
    return response.data.data;
  },

  // Download book
  downloadBook: async (bookId) => {
    const response = await api.get(API_ENDPOINTS.MY_BOOKS.DOWNLOAD(bookId));
    return response.data.data;
  },
};

/**
 * Get read URL for a purchased book
 */
export const getReadUrl = async (bookId) => {
  const response = await api.get(`${API_ENDPOINTS.MY_BOOKS.SINGLE(bookId)}/read`);
  return response.data;
};

/**
 * Stream PDF for reading
 */
export const getReadStream = async (bookId) => {
  const response = await api.get(`${API_ENDPOINTS.MY_BOOKS.SINGLE(bookId)}/stream`, {
    responseType: 'blob',
  });
  return response.data;
};