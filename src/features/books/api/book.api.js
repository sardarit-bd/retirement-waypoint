import axios from "axios";
import api from '@/lib/api/axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;

class BookApi {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/public/books`;
    this.adminBaseUrl = `${API_BASE_URL}/api/books`;
  }


  // Create Book (admin)
  async createBook(formData) {
    const { data } = await api.post(API_ENDPOINTS.BOOKS.ALL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }

  // Update Book (admin)
  async updateBook(bookId, formData) {
    const { data } = await api.patch(
      `${API_ENDPOINTS.BOOKS.ALL}/${bookId}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data;
  }

  // Delete Book (soft delete)
  async deleteBook(bookId) {
    const { data } = await api.delete(`${API_ENDPOINTS.BOOKS.ALL}/${bookId}`);
    return data;
  }

  // Get Admin Book by ID
  async getAdminBook(bookId) {
    const { data } = await api.get(`${API_ENDPOINTS.BOOKS.ALL}/${bookId}`);
    return data;
  }

  /**
   * Get Public Books
   * GET /api/public/books
   */
  async getPublicBooks(params = {}) {
    const queryParams = new URLSearchParams();

    if (params.page)
      queryParams.append("page", params.page.toString());

    if (params.limit)
      queryParams.append("limit", params.limit.toString());

    if (params.search)
      queryParams.append("search", params.search);

    if (params.featured !== undefined)
      queryParams.append("featured", String(params.featured));

    if (params.sortBy)
      queryParams.append("sortBy", params.sortBy);

    if (params.sortOrder)
      queryParams.append("sortOrder", params.sortOrder);

    const url = queryParams.toString()
      ? `${this.baseUrl}?${queryParams.toString()}`
      : this.baseUrl;

    const { data } = await axios.get(url);

    return data;
  }

  /**
   * Get Featured Books
   * GET /api/public/books/featured
   */
  async getFeaturedBooks(limit = 4) {
    const { data } = await axios.get(
      `${this.baseUrl}/featured?limit=${limit}`
    );

    return data;
  }

  /**
   * Get Book Details
   * GET /api/public/books/:slug
   */
  async getPublicBookBySlug(slug) {
    const { data } = await axios.get(`${this.baseUrl}/${slug}`);

    return data;
  }

  async getAdminBooks(params = {}) {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.status) queryParams.append("status", params.status);
    if (params.featured !== undefined) queryParams.append("featured", String(params.featured));
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const url = queryParams.toString()
      ? `${this.adminBaseUrl}?${queryParams.toString()}`
      : this.adminBaseUrl;

    const { data } = await api.get(url);
    return data;
  }

  async publishBook(bookId) {
    const { data } = await api.patch(`${this.adminBaseUrl}/${bookId}/publish`);
    return data;
  }

  async archiveBook(bookId) {
    const { data } = await api.patch(`${this.adminBaseUrl}/${bookId}/archive`);
    return data;
  }
}

export const bookApi = new BookApi();