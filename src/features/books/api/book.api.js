import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;

class BookApi {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/public/books`;
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
}

export const bookApi = new BookApi();